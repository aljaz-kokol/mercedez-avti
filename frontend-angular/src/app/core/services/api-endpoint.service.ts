import {Injectable} from '@angular/core';
import {UrlBuilder} from '../../shared/url-builder';
import {Constants} from '../../config/constants.config';

@Injectable({ providedIn: 'root' })
export class ApiEndpointService {
  constructor(private constants: Constants) {}
  // Create url for an endpoint
  private createUrl(action: string): string {
    const urlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
    return urlBuilder.toString();
  }
  // Create url for endpoint with some path variables
  private createUrlWithPathVariables(action: string, pathVariables: any[]): string {
    let pathVariablesUrl = '';
    pathVariables.forEach(pathVariable => {
      if (pathVariable !== null) {
        pathVariablesUrl += `/${pathVariable}`;
      }
    });
    const urlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, `${action}${pathVariablesUrl}`);
    return urlBuilder.toString();
  }

  // === NEWS ENDPOINTS ==
  // Return url of api endpoint which returns a list of news
  public get newsListEndPoint(): string {
    return this.createUrl('news');
  }
  // Return url of api endpoint which returns one news element based on the passed id
  public getNewsByIdEndPoint(id: string): string {
    return this.createUrlWithPathVariables('news', [id]);
  }

  // === CAR-CLASS ENDPOINTS ==
  // Return url of api endpoint which returns a list of car classes
  public get carClassListEndPoint(): string {
    return this.createUrl('car-class');
  }
  // Return url of api endpoint which return a single CarClass based on the passed id
  public getCarClassByIdEndPoint(id: string): string {
    return this.createUrlWithPathVariables('car-class', [id]);
  }

  // === CAR ENDPOINTS ==
  // Return url of api endpoint which returns a list of cars
  public get carListEndPoint(): string {
    return this.createUrl('car');
  }
  // Return url of api endpoint which returns a list of cars based on the give car-class id
  public getCarListByClassEndPoint(classId: string): string {
    return this.createUrlWithPathVariables('car/class',[classId])
  }
  // Return url of api endpoint which returns a car based on the given car id
  public getCarByIdEndPoint(carId: string): string {
    return this.createUrlWithPathVariables('car', [carId]);
  }

  // === CAR-TYPE ENDPOINTS ==
  // Return url of api endpoint which returns a car-type based on the given id
  public getCarTypeByIdEndPoint(typeId: string): string {
    return this.createUrlWithPathVariables('car-type', [typeId]);
  }

  // === FUEL ENDPOINTS ==
  // Return url of api endpoint which returns fuel based on the given id
  public getFuelByIdEndpoint(fuelId: string): string {
    return this.createUrlWithPathVariables('fuel', [fuelId]);
  }

  // === DRIVE ENDPOINTS ==
  // Return url of api endpoint which returns the drive mode based on the given id
  public getDriveByIdEndPoint(driveId: string): string {
    return this.createUrlWithPathVariables('drive', [driveId]);
  }

  // === GEARBOX ENDPOINTS ==
  // Return url of api endpoint which returns a gearbox based on the given id
  public getGearboxByIdEndPoint(gearboxId: string): string {
    return this.createUrlWithPathVariables('gearbox', [gearboxId]);
  }
}
