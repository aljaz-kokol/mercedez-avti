import {Injectable} from '@angular/core';
import {CarClass} from '../models/car-class.model';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {map} from 'rxjs/operators';

interface FetchedListData {
  _id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CarClassService {
  private carClassList: CarClass[] = [];

  constructor(private apiHttp: ApiHttpService, private apiEndPoint: ApiEndpointService) {}

  public async getCarClassList() {
    // CarClass List from api
    this.carClassList = await this.apiHttp
      .get<FetchedListData[]>(this.apiEndPoint.getCarClassListEndPoint())
      .pipe(map(CarClassService.transformFetchedListData)).toPromise();
    return [...this.carClassList];
  }

  // Returns a CarClass array from the data that has been fetched from the api
  private static transformFetchedListData(data: FetchedListData[]): CarClass[] {
    return data.map(el => {
      return {
        id: el._id,
        name: el.name
      };
    })
  }

}
