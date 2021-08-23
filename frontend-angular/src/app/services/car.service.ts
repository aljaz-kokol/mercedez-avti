import {Injectable} from '@angular/core';
import {Car, CarApi, CarFull} from '../models/car.model';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {map} from 'rxjs/operators';
import {CarClassService} from './car-class.service';
import {CarTypeService} from './car-type.service';
import {FuelService} from './fuel.service';
import {DriveService} from './drive.service';
import {GearboxService} from './gearbox.service';

@Injectable({ providedIn: 'root' })
export class CarService {
  private carList: Car[] = [];

  constructor(private apiHttp: ApiHttpService,
              private apiEndPoint: ApiEndpointService,
              private carClassService: CarClassService,
              private carTypeService: CarTypeService,
              private fuelService: FuelService,
              private driveService: DriveService,
              private gearboxService: GearboxService) {}

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

  public async getCarFromId(carId: string): Promise<Car> {
    return this.apiHttp.get<CarApi>(this.apiEndPoint.getCarByIdEndPoint(carId)).pipe(map(Car.fromApi)).toPromise();
  }

  // Get car object with all reference data represented as objects
  public async getCarFullFromId(carId: string): Promise<CarFull> {
    const car: Car = await this.getCarFromId(carId);
    const carClass = await this.carClassService.getCarClassFromId(car.carClass);
    const type = await this.carTypeService.gerCarTypeFromId(car.type);
    const fuel = await this.fuelService.getFuelFromId(car.fuel);
    const drive =  await this.driveService.getDriveFromId(car.drive);
    const gearbox = await this.gearboxService.getGearboxFromId(car.gearbox);

    return car.toCarFull(carClass, type, fuel, drive, gearbox);
  }
}
