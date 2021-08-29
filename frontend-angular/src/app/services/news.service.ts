import {Injectable} from '@angular/core';
import {News, NewsApi} from '../models/news.model';
import {ApiHttpService} from '../core/services/api-http.service';
import {ApiEndpointService} from '../core/services/api-endpoint.service';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private newsList: News[] = [];

  constructor(private apiHttp: ApiHttpService, private apiEndPoint: ApiEndpointService) {}

  public async getNewsList(): Promise<News[]> {
    this.newsList = await this.apiHttp.get<NewsApi[]>(this.apiEndPoint.newsListEndPoint)
      .pipe(map(News.fromApiList)).toPromise();
    return [...this.newsList];
  }

  public async getNewsFromId(newsId: string): Promise<News> {
    return await this.apiHttp.get<NewsApi>(this.apiEndPoint.getNewsByIdEndPoint(newsId))
      .pipe(map(News.fromApi)).toPromise();
  }
}

