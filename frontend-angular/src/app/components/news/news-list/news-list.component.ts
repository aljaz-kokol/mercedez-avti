import {Component, OnInit} from '@angular/core';
import {News} from '../../../models/news.model';
import {NewsService} from '../../../services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList: News[];

  constructor(private newsService: NewsService) {}

  async ngOnInit(): Promise<void> {
    this.newsList = await this.newsService.getNewsList();
  }

  public get showSpinner(): boolean {
    return !this.newsList;
  }
}
