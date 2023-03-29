// import npm packages.
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// import file modules.
import staticData from "../constants/staticData";
import { IUserAuth } from '../interfaces/userInterface';

export interface CustomRequest extends Response {
  user: IUserAuth;
}

// This function use to create user Authorization.
export const Auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {

    // This code is use to create token
    const token = await req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    // This code is use to token decode
    const decoded = await jwt.verify(token, staticData.secretKey) as JwtPayload;
    (res as CustomRequest).user = decoded as IUserAuth;
    next();

  } catch (err) {
    res.status(401).send('Invalid authentication token');
  }

};
