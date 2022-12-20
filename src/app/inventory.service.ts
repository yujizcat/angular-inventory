import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';

import { Inventory } from './inventory';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  inventoryUrl = 'api/inventory';  
  inventoryAPI = 'https://inventory-api-test-default-rtdb.firebaseio.com/inventory.json';
  lastId = 0;

  invSubject = new Subject();
  sub$ = this.invSubject.asObservable();

  getInventory(){
    
  }

  fetchInventory(){
    console.log("Fetching inventory");
    return this.http.get<{[key: string]: Inventory}>(this.inventoryAPI)
    .pipe(map(res =>{
      console.log(res);
      const inventoriesArray: Inventory[] = []
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

  detailedInventory(inv: Inventory){
    console.log('view detail');
    console.log(inv);
    return this.http.get<{[key: string]: Inventory}>(this.inventoryAPI)
    .pipe(map(res =>{

      console.log(res);
      for (let key in res){
        
        if (inv.item == res[key].item){
          //console.log(res[key]);
          //console.log(key);
          console.log('match');
        }
      }
    }))
  }

  createInventory(inv: Inventory){
 
    return this.http.post<{name: string}>(this.inventoryAPI, inv)
    .subscribe()
  }

  updateInventory(inv: Inventory){
    let body = {"units": inv.units, "price":inv.price, "sale":inv.sale, "description":inv.description}
    return this.http.patch(`https://inventory-api-test-default-rtdb.firebaseio.com/inventory/${inv.id}.json`, body,  httpOptions)
    .subscribe(res => {
      console.log('updated');
    })
  }

  deleteInventory(inv: Inventory){
    return this.http.delete(`https://inventory-api-test-default-rtdb.firebaseio.com/inventory/${inv.id}.json`,  httpOptions)
    .subscribe(res => {
      console.log('deleted');
    })
  }

  deleteAllInventory(){
    return this.http.delete(`https://inventory-api-test-default-rtdb.firebaseio.com/inventory.json`,  httpOptions)
    .subscribe(res => {
      console.log('deleted all');
    })
  }
  
}
