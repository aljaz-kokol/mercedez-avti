export interface FuelApi {
  _id: string;
  type: string;
}

export class Fuel {
  constructor(public id: string,
              public type: string) {}

  public static fromApi(apiObj: FuelApi): Fuel {
    return new Fuel(apiObj._id, apiObj.type);
  }

  public static fromApiList(apiObjList: FuelApi[]): Fuel[] {
    return apiObjList.map(apiObj => Fuel.fromApi(apiObj));
  }
}
