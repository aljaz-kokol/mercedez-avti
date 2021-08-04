export interface NewsApi {
  _id: string;
  title: string;
  body: string;
  summary: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
}

export class News {
  constructor(public id: string,
              public title: string,
              public body: string,
              public summary: string,
              public image: string,
              private createdAt_: string,
              private updatedAt_: string) {}

  public static fromApi(apiObj: NewsApi): News {
    return new News(apiObj._id, apiObj.title, apiObj.body, apiObj.summary, apiObj.imagePath, apiObj.createdAt, apiObj.updatedAt);
  }

  public get createdAt() {
    const date = new Date(this.createdAt_);
    return date.toLocaleDateString("en-SL");
  }

  public static fromApiList(apiObjList: NewsApi[]): News[] {
    const newsList: News[] = [];
    apiObjList.forEach(apiObj => newsList.push(News.fromApi(apiObj)));
    return newsList;
  }
}

