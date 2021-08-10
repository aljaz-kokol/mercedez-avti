import {Injectable} from '@angular/core';
import {Car, CarApi} from '../models/car.model';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarService {
  private carList: Car[] = [];

  constructor(private apiHttp: ApiHttpService, private apiEndPoint: ApiEndpointService) {}

  public async getCarList(): Promise<Car[]> {
    this.carList = await this.apiHttp.get<CarApi[]>(this.apiEndPoint.carListEndPoint)
      .pipe(map(Car.fromApiList)).toPromise();
    return [...this.carList];
  }

  // Returns a list of cars based on the give car-class id
  public async getCarListFromClass(classId: string): Promise<Car[]> {
    this.carList = await this.apiHttp.get<CarApi[]>(this.apiEndPoint.getCarListByClassEndPoint(classId))
      .pipe(map(Car.fromApiList)).toPromise();
    return [...this.carList];
  }
}
