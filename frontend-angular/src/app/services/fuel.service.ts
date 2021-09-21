import {Injectable} from '@angular/core';
import {ApiHttpService} from '../core/api-http.service';
import {ApiEndpointService} from '../core/api-endpoint.service';
import {Fuel, FuelApi} from '../models/fuel.model';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FuelService {
  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService) {}

  public async getFuelList(): Promise<Fuel[]> {
    return this.apiHttp.get<FuelApi[]>(this.apiEndPoint.fuelListEndPoint)
      .pipe(map(Fuel.fromApiList)).toPromise();
  }

  public async getFuelFromId(id: string): Promise<Fuel> {
    return await this.apiHttp.get<FuelApi>(this.apiEndPoint.getFuelByIdEndpoint(id))
      .pipe(map(Fuel.fromApi)).toPromise();
  }
}
