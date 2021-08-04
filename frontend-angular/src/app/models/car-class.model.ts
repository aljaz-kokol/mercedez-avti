export interface CarClassApi {
  _id: string;
  name: string;
}

export class CarClass {
  constructor(public id: string, public name: string) {}

  public static fromApi(apiObj: CarClassApi): CarClass {
    return new CarClass(apiObj._id, apiObj.name);
  }

  public static fromApiList(apiObjList: CarClassApi[]): CarClass[] {
    const carClassList: CarClass[] = [];
    apiObjList.forEach(apiObj => carClassList.push(CarClass.fromApi(apiObj)));
    return carClassList;
  }
}
