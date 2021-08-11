export interface CarTypeApi {
  _id: string,
  type: string;
  abbreviation: string;
}

export class CarType {
  constructor(public id: string,
              public type: string,
              public abbreviation: string) {}

  public static fromApi(apiObj: CarTypeApi): CarType {
    return new CarType(apiObj._id, apiObj.type, apiObj.abbreviation);
  }

  public static fromApiList(apiObjList: CarTypeApi[]): CarType[] {
    return apiObjList.map(apiObj => CarType.fromApi(apiObj));
  }
}
