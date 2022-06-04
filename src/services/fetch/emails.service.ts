import Config from '../../utils/config';
import { ApiService } from './api.service';

export class EmailsService {
  public static async send(req) {
    return ApiService.post(`${this.config.service.external.email}/email/send`, req);
  }

  private static config: any = Config.get();
}
