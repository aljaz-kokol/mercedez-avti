import {Injectable} from '@angular/core';
import {ApiHttpService} from '../core/api-http.service';
import {ApiEndpointService} from '../core/api-endpoint.service';
import {map} from 'rxjs/operators';
import {Gearbox, GearboxApi} from '../models/gearbox.model';

@Injectable({ providedIn: 'root' })
export class GearboxService {
  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService) {}

  public async getGearboxList(): Promise<Gearbox[]> {
    return this.apiHttp.get<GearboxApi[]>(this.apiEndPoint.gearboxListEndPoint)
      .pipe(map(Gearbox.fromApiList)).toPromise();
  }

  public async getGearboxFromId(id: string): Promise<Gearbox> {
    return this.apiHttp.get<GearboxApi>(this.apiEndPoint.getGearboxByIdEndPoint(id))
      .pipe(map(Gearbox.fromApi)).toPromise();
  }
}
