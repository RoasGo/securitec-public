import { NextFunction, Request, Response } from 'express';

export const catchError = (ftn: (rq: Request, rs: Response) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return ftn(req, res).catch((err: any) => {
      next(err);
    });
  };
};
