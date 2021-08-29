import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NewsImage} from '../../../models/news.model';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from '../../../animations/image-carousel.animations';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
  animations: [
    trigger('carousel', [
      transition('void => *', [useAnimation(fadeIn)]),
      transition('* => void', [useAnimation(fadeOut)])
    ])
  ]
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  @Input() images: NewsImage[];
  private autoLoopTimer: any;
  detailView = false;
  currentIndex = 0;

  ngOnInit(): void {
    this.autoLoopTimer = setTimeout(() => {
      this.onNext()
    }, 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.autoLoopTimer);
  }

  onNext() {
    const next = this.currentIndex + 1;
    this.currentIndex = next === this.images.length ? 0 : next;
    this.resetLoopTimer();
  }

  onPrevious() {
    const previous = this.currentIndex - 1;
    this.currentIndex = previous < 0 ? this.images.length - 1 : previous;
    if (!this.detailView) {
      this.resetLoopTimer();
    }
  }

  onSelectImg(index: number){
    this.currentIndex = index;
    this.resetLoopTimer();
  }

  toggleDetailView() {
    this.detailView = !this.detailView;
    if (this.detailView) {
      this.stopLoopTimer();
    } else {
      this.resetLoopTimer();
    }
  }

  // true --> show next, previous buttons and circle indicators, false --> don't show buttons
  get showInteractions(): boolean {
    return this.images.length > 1;
  }

  private stopLoopTimer() {
    clearTimeout(this.autoLoopTimer);
  }

  private resetLoopTimer() {
    if (!this.detailView) {
      clearTimeout(this.autoLoopTimer);
      this.autoLoopTimer = setTimeout(() => {
        this.onNext();
      }, 5000);
    }
  }}

