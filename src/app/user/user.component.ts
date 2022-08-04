import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { User, Input, UserConnectionResult } from "../../lib/models/user-service-definitions";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  inputs: Input[] = []
  outputs: UserConnectionResult[] = [];

  //outputs: MatTableDataSource<UserConnectionResult[]> = new MatTableDataSource<UserConnectionResult[]>();

  dataSource = new MatTableDataSource<UserConnectionResult>();

  displayedColumns: string[] = ['input', 'connection'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getInput().subscribe((inputs) => {

      this.inputs = inputs;
    })

    this.userService.getData().subscribe((users) => {

      this.users = users;

      for(let i=0; i < this.inputs.length; i++){
        this.outputs.push(this.userService.getClosestUserLink(this.inputs[i], this.users));
      }

      this.dataSource.data = this.outputs;
    });

  }

}
