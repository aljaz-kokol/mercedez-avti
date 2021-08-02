import {Injectable} from '@angular/core';

export class UrlBuilder {
  private readonly url: string;

  constructor(private baseUrl: string, private action: string) {
    this.url = [baseUrl, action].join('/');
  }

  public toString = (): string => this.url;
}
