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

  fetchCategory(){
    return this.http.get<{[key: string]: Category}>(this.categoryAPI)
    .pipe(map(res =>{
      console.log(res);
      const inventoriesArray: Category[] = []
        for (const key in res){
          console.log(key);
          if (res.hasOwnProperty(key)){
            inventoriesArray.push({id: key, ...res[key]});
          }
        }
      // console.log(inventoriesArray);
      return inventoriesArray;
    }))
  }

  createcategory(cate: Category){
    return this.http.post<{name: string}>(this.categoryAPI, cate)
    .subscribe()
  }

  deleteCategory(cate: Category){
    return this.http.delete(`https://inventory-api-test-default-rtdb.firebaseio.com/category/${cate.id}.json`,  httpOptions)
    .subscribe(res => {
      console.log('deleted');
    })
  }
}
