import { Response } from 'express';

export const Ok = (res: Response, data: any) => {
  return res.status(200).send(data);
};

export const InternalError = (res: Response, data: any = { message: 'Internal server error' }) => {
  return res.status(500).send(data);
};
