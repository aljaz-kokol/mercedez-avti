import {Injectable} from '@angular/core';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {Drive, DriveApi} from '../models/drive.model';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DriveService {
  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService) {}

  public async getDriveFromId(id: string): Promise<Drive> {
    return this.apiHttp.get<DriveApi>(this.apiEndPoint.getDriveByIdEndPoint(id))
      .pipe(map(Drive.fromApi)).toPromise();
  }
}
