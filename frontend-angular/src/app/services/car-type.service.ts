import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {Injectable} from '@angular/core';
import {CarType, CarTypeApi} from '../models/car-type.model';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarTypeService {
  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService) {}

  public async gerCarTypeFromId(id: string): Promise<CarType> {
    return await this.apiHttp.get<CarTypeApi>(this.apiEndPoint.getCarTypeByIdEndPoint(id))
      .pipe(map(CarType.fromApi)).toPromise()
  }
}
