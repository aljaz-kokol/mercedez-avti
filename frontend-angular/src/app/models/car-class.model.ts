import {ApiImage} from '../shared/api-image';

export interface CarClassApi {
  _id: string;
  name: string;
  subclasses: CarClassApi[];
  images: ApiImage[];
}

export class CarClass {
  constructor(public id: string,
              public name: string,
              public images: ApiImage[],
              public subclasses: CarClass[]) {}

  public static fromApi(apiObj: CarClassApi): CarClass {
    return new CarClass(apiObj._id, apiObj.name, apiObj.images, CarClass.fromApiList(apiObj.subclasses));
  }

  public static fromApiList(apiObjList: CarClassApi[]): CarClass[] {
    const carClassList: CarClass[] = [];
    apiObjList.forEach(apiObj => carClassList.push(CarClass.fromApi(apiObj)));
    return carClassList;
  }
}
