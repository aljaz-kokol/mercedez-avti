import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from '../../../animations/image-carousel.animations';
import {ApiImage} from '../../../shared/api-image';

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
  @Input() images: ApiImage[];
  @Input() width?: string;
  @Input() height?: string;
  @Input() bRadius?: string; //  Border radius
  @Input() isExpandable = true; // Determines if the image can be expanded into detail view

  private autoLoopTimer: any;
  private loopDuration = 3000;
  detailView = false;
  currentIndex = 0;

  ngOnInit(): void {
    this.autoLoopTimer = setTimeout(() => {
      this.onNext()
    }, this.loopDuration);
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
    if (this.isExpandable) {
      this.detailView = !this.detailView;
      if (this.detailView) {
        this.stopLoopTimer();
      } else {
        this.resetLoopTimer();
      }
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
      }, this.loopDuration);
    }
  }}

