import {ApiImage} from '../shared/api-image';

export interface NewsApi {
  _id: string;
  title: string;
  body: string;
  summary: string;
  images: ApiImage[];
  createdAt: string;
  updatedAt: string;
}

export class News {
  constructor(public id: string,
              public title: string,
              public body: string,
              public summary: string,
              public images: ApiImage[],
              private createdAt_: string,
              private updatedAt_: string) {}

  public static fromApi(apiObj: NewsApi): News {
    return new News(apiObj._id, apiObj.title, apiObj.body, apiObj.summary, apiObj.images, apiObj.createdAt, apiObj.updatedAt);
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

