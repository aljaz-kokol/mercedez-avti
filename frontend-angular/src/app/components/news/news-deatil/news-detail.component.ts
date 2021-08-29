import {Component, OnInit} from '@angular/core';
import {News} from '../../../models/news.model';
import {NewsService} from '../../../services/news.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls:['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  private newsId: string;
  news: News;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async map => {
      this.newsId = map.get('newsId');
      this.news = await this.newsService.getNewsFromId(this.newsId);
    });
  }

  get showSpinner(): boolean {
    return !this.news;
  }

}
