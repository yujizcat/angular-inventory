import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

import { Category } from '../category';
import { CategoryService } from '../category.service';


import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.css']
})

export class NewInventoryComponent {
  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private router: Router) { }

  submitted = false;

  model = new Inventory('', 0, 0, "Food", false, '');

  //category = ['Food', 'Electronic', 'Book', 'Fashion', 'Other'];
  categoryList = [''];
  forSale = ["Yes", "No"];

  ngOnInit() {
    let a = this.categoryService.fetchCategory().subscribe(res => {
      for (let key in res) {
        console.log(res[key].name);
        this.categoryList.push(res[key].name);
      }
    })
    setTimeout(() => {
      this.categoryList = this.categoryList.filter(item => item);
      console.log(this.categoryList);
    }, 400);


  }

  onSubmit() {

    this.submitted = true;
    console.log("submit create");
    alert('Created a new inventory');
    this.inventoryService.createInventory(this.model);

    this.router.navigate(['dashboard']);

  }

  goBack() {
    this.router.navigate(['inventories']);
  }
}
