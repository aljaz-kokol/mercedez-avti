import {NgModule} from '@angular/core';
import {NewsListComponent} from '../components/news/news-list/news-list.component';
import {NewsCardComponent} from '../components/news/news-card/news-card.component';
import {NewsRoutingModule} from './routes/news-routing.module';
import {SharedModule} from './shared.module';
import {NewsDetailComponent} from '../components/news/news-deatil/news-detail.component';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsCardComponent,
    NewsDetailComponent
  ],
  imports: [
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule {}
