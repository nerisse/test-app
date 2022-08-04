import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Input, UserConnectionResult} from "../lib/models/user-service-definitions";

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let mockFollowList = [
    {
      "follows": [9]
    },
    {
      "follows": [3, 7, 9, 2, 4, 0, 6]
    },
    {
      "follows": [7, 4]
    },
    {
      "follows": [8, 4]
    },
    {
      "follows": [0, 6, 2, 1
      ]
    },
    {
      "follows": [7, 6, 4]
    },
    {
      "follows": [7, 0]
    },
    {
      "follows": [6, 1, 3, 4]
    },
    {
      "follows": [4, 3, 1, 7, 6, 5]
    },
    {
      "follows": [7]
    }
  ]

  it(`should get shortest link result`, () => {
    const input: Input = {from: 1, to : 4};
    const output: UserConnectionResult = {input: 'Case ' + input.from + ' to ' + input.to, connection: '1 --> 4'}
    expect(service.getClosestUserLink(input, mockFollowList)).toEqual(output);
  });

  it(`should return Link not found when search fails`, () => {
    const input: Input = {from: 1, to : 10};
    const output: UserConnectionResult = {input: 'Case ' + input.from + ' to ' + input.to, connection: 'Link not found'};
    expect(service.getClosestUserLink(input, mockFollowList)).toEqual(output);
  });
});
