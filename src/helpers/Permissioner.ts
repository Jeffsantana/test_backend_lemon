import { Request, Response, NextFunction } from 'express';

import CognitoService from '../services/CognitoService';

const Permissioner = (allowedGroups: string[]) => async (
  req: Request, res: Response, next: NextFunction,
): Promise<any> => {
  try {
    const token = (req.headers.authorization) as string;

    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const payload = await CognitoService.validateToken(token);

    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!allowedGroups.includes('client')) {
      if (!payload['cognito:groups'].some((group) => allowedGroups.includes(group))) {
        return res.status(401).json({ message: 'Invalid group' });
      }
    }

    res.locals.userPayload = payload;

    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export default Permissioner;
