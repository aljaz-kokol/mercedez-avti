export interface UserApi {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export class User {
  constructor(public id: string,
              public username: string,
              public email: string,
              private password: string) {}

  public static fromApi(apiObj: UserApi): User {
    return new User(apiObj._id, apiObj.email, apiObj.username, apiObj.password);
  }

  public static fromApiList(apiObjList: UserApi[]): User[] {
    return apiObjList.map(apiObj => User.fromApi(apiObj));
  }
}
