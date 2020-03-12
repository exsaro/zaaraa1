import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpService} from '../../shared/services/http.service';
import { Urls } from '../../shared/models/url.model';
import { Projects } from '../../shared/models/projects.model';


@Injectable({
  providedIn: 'root'
})
export class MainSearchService {

  constructor(private httpService: HttpService) { }

  search(queryString: String) : Observable<Projects.SearchModel>{
    return this.httpService.get(Urls.SEARCH_URL+queryString);
  }

  clients(){
    return this.httpService.get(Urls.CLIENT_URL);
  }


}
