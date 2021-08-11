export interface DriveApi {
  _id: string;
  type: string;
}

export class Drive {
  constructor(public id: string,
              public type: string) {}

  public static fromApi(apiObj: DriveApi): Drive {
    return new Drive(apiObj._id, apiObj.type);
  }

  public static fromApiList(apiObjList: DriveApi[]): Drive[] {
    return apiObjList.map(apiObj => Drive.fromApi(apiObj));
  }
}
