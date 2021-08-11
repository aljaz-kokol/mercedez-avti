import {Injectable} from '@angular/core';
import {CarClass, CarClassApi} from '../models/car-class.model';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarClassService {
  private carClassList: CarClass[] = [];

  constructor(private apiHttp: ApiHttpService, private apiEndPoint: ApiEndpointService) {}

  public async getCarClassList(): Promise<CarClass[]> {
    this.carClassList = await this.apiHttp
      .get<CarClassApi[]>(this.apiEndPoint.carClassListEndPoint)
      .pipe(map(CarClass.fromApiList)).toPromise();
    return [...this.carClassList];
  }

  public async getCarClassFromId(id: string): Promise<CarClass> {
    const carClass: CarClass = await this.apiHttp.get<CarClassApi>(this.apiEndPoint.getCarClassByIdEndPoint(id))
      .pipe(map(CarClass.fromApi)).toPromise()
    return carClass;
  }

}