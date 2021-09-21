import {Injectable} from '@angular/core';
import {ApiHttpService} from '../core/api-http.service';
import {ApiEndpointService} from '../core/api-endpoint.service';
import {Drive, DriveApi} from '../models/drive.model';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DriveService {
  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService) {}

  public async getDriveList(): Promise<Drive[]> {
    return this.apiHttp.get<DriveApi[]>(this.apiEndPoint.driveListEndPoint)
      .pipe(map(Drive.fromApiList)).toPromise();
  }

  public async getDriveFromId(id: string): Promise<Drive> {
    return this.apiHttp.get<DriveApi>(this.apiEndPoint.getDriveByIdEndPoint(id))
      .pipe(map(Drive.fromApi)).toPromise();
  }
}
