import {ApiHttpService} from '../core/api-http.service';
import {ApiEndpointService} from '../core/api-endpoint.service';
import {Injectable} from '@angular/core';
import {CarType, CarTypeApi} from '../models/car-type.model';
import {map} from 'rxjs/operators';
import {Car} from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarTypeService {
  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService) {}

  public async getCarTypeList(): Promise<CarType[]> {
    return await this.apiHttp.get<CarTypeApi[]>(this.apiEndPoint.carTypeListEndPoint)
      .pipe(map(CarType.fromApiList)).toPromise();
  }

  public async gerCarTypeFromId(id: string): Promise<CarType> {
    return await this.apiHttp.get<CarTypeApi>(this.apiEndPoint.getCarTypeByIdEndPoint(id))
      .pipe(map(CarType.fromApi)).toPromise()
  }
}
