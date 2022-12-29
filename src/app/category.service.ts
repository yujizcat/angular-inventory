import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  categoryUrl = 'api/category';  
  categoryAPI = 'https://inventory-api-test-default-rtdb.firebaseio.com/category.json';
  categoryRailsAPI = "https://obscure-eyrie-90705.herokuapp.com/categories"

  fetchCategory(){
    return this.http.get<{[key: string]: Category}>(this.categoryRailsAPI)
    .pipe(map(res =>{
     
      const categoriesArray: Category[] = []
        for (const key in res){
         
          if (res.hasOwnProperty(key)){
            categoriesArray.push({...res[key]});
          }
        }

      return categoriesArray;
    }))
  }

  createcategory(cate: Category){
    return this.http.post<{name: string}>(this.categoryRailsAPI, cate)
    .subscribe()
  }

  deleteCategory(cate: Category){
    return this.http.delete(`${this.categoryRailsAPI}/${cate.id}.json`,  httpOptions)
    .subscribe(res => {
      console.log('deleted');
    })
  }

}
