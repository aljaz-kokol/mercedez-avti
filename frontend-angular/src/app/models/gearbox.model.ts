export interface GearboxApi {
  _id: string;
  type: string;
}

export class Gearbox {
  constructor(public id: string,
              public type: string) {}

  public static fromApi(apiObj: GearboxApi): Gearbox {
    return new Gearbox(apiObj._id, apiObj.type);
  }

  public static fromApiList(apiObjList: GearboxApi[]): Gearbox[] {
    return apiObjList.map(apiObj => Gearbox.fromApi(apiObj));
  }
}
