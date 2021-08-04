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
      .get<CarClassApi[]>(this.apiEndPoint.getCarClassListEndPoint())
      .pipe(map(CarClass.fromApiList)).toPromise();
    return [...this.carClassList];
  }

}
