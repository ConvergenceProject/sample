// This code is use to create a user.
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
}

// This code is use to user authentication.
export interface IUserAuth extends Document {
  _id: string,
  firstName:  string,
  lastName:  string,
  iat: number,
  exp: number,
}