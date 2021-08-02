import {Injectable} from '@angular/core';
import {UrlBuilder} from '../../shared/url-builder';
import {Constants} from '../../config/constants.config';

@Injectable({ providedIn: 'root' })
export class ApiEndpointService {
  constructor(private constants: Constants) {}
  // Create url for an endpoint
  private createUrl(action: string): string {
    const urlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
    return urlBuilder.toString();
  }
  // Create url for endpoint with some path variables
  private createUrlWithPathVariables(action: string, pathVariables: any[]): string {
    let pathVariablesUrl = '';
    pathVariables.forEach(pathVariable => {
      if (pathVariable !== null) {
        pathVariablesUrl += `/${pathVariable}`;
      }
    });
    const urlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, `${action}${pathVariablesUrl}`);
    return urlBuilder.toString();
  }
  // Return url of api endpoint which returns a list of news
  public getNewsListEndPoint(): string {
    return this.createUrl('news');
  }
  // Return url of api endpoint which returns one news element based on the passed id
  public getNewsByIdEndPoint(id: string): string {
    return this.createUrlWithPathVariables('news', [id]);
  }
}
