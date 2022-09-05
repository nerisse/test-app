export interface User {
  id?: number;
  follows: number[];
}

export interface Input {
  from: number;
  to: any;
}

export interface UserConnectionResult {
  input: string;
  connection: string;
}

//commit 1 test 2
