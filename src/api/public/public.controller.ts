import { Request, Response } from 'express';
import { to } from '../../helpers/fetch.helper';
import { BadRequest, InternalError, Ok } from '../../helpers/http.helper';
import { EmailsService } from '../../services/fetch/emails.service';
import { IEmailSendReq } from './public.interface';

export default class EmailsController {
  public async send(req: Request, res: Response): Promise<any> {
    const body = (Array.isArray(req.body) ? req.body : req.body ? [req.body] : []) as IEmailSendReq[];

    if (!body.length) {
      return BadRequest(res, { message: 'You must provide a body' });
    }

    const [err] = await to(EmailsService.send(body));
    if (err) {
      return InternalError(res, err);
    }

    return Ok(res, { message: 'Emails will be send!' });
  }
}
