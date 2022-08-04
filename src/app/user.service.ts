import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, Input, UserConnectionResult} from "../lib/models/user-service-definitions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getData() : Observable<any>{
    return this.http.get('../assets/data.json');
  }

  getInput() : Observable<any>{
    return this.http.get('../assets/input.json');
  }

  /**
   * Runs search on input from & to values, then formats output path to be presented
   * @param input - Input containing 'from' (source) to 'to' (target) from input.json
   * @param followList - list of users and followers from data.json
   */
  getClosestUserLink(input: Input, followList: User[]) : UserConnectionResult {
    let searchResult = this.runBreadthFirstSearch(input, followList);
    return this.getOutputPath(searchResult, input);
  }

  /**
   * Runs BFS to get shortestPath and map of connected node predecessors/followers
   * @param input - Input containing 'from' (source) to 'to' (target) from input.json
   * @param followList - list of users and followers from data.json
   * @returns object with the shortest link distance and map of connected predecessors
   */
  runBreadthFirstSearch(input: Input, followList: User[]): any {

    let visitedUsers = [];
    let queue = [];
    let followers = [];
    let predecessors = new Map();

    queue.push({ node: input.from, distanceToNode: 0 });

    visitedUsers.push(input.from);

    while (queue.length > 0) {
      let shift = queue.shift();
      let node: any = shift?.node;
      let distanceToNode: any = shift?.distanceToNode;


      // if target is reached, return distance (edges) as shortestLink and map of followers (follower => user)
      if (node === input.to){
        return { shortestLink: distanceToNode, predecessors };
      }

      // sort to retrieve the smallest user IDs first
      followers = followList[node]?.follows.sort();

      for (let follower of followers) {
          if (!visitedUsers.includes(follower)) {
            predecessors.set(follower, node);
            queue.push({node: follower, distanceToNode: distanceToNode + 1});
            visitedUsers.push(follower);
            }
          }
    }

    return { shortestLink: -1, predecessors };
  }

  /**
   * Formats and provides complete UserConnectionResult to represent the shortest link between from & to inputs
   * @param searchResult
   * @param input
   * @returns UserConnectionResult containing input values/scenario and corresponding the shortest link
   */
  getOutputPath(searchResult: any, input: Input): UserConnectionResult {
    let inputString =  "Case " + input.from + " to " + input.to;
    let outputString;

    if(searchResult.shortestLink > -1) {
      let currentNode = input.to;
      let arr = [currentNode];
      while (currentNode !== input.from) {
        currentNode = searchResult.predecessors.get(currentNode);
        arr.push(currentNode);
      }
      outputString = arr.reverse().join(' --> ');
    }else{
      outputString = "Link not found";
    }

    let userConnectionResult: UserConnectionResult = {input: inputString, connection: outputString};

    console.log(userConnectionResult.input + ":  " + userConnectionResult.connection);
    return userConnectionResult;
  }
}
