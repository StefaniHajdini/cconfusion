import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    @Inject('BaseURL') private BaseURL) { }

    getDishes(): Observable<Dish[]> {
      return this.http.get<Dish[]>(baseURL + 'dishes');
    }
  
    getDish(id: number): Observable<Dish> {
      return this.http.get<Dish>(baseURL + 'dishes/' + id);
    }
  
    getFeaturedDish(): Observable<Dish> {
      return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
    }
  
    getDishIds(): Observable<number[] | any> {
      return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    }
}
