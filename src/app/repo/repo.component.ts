import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { CategoryService } from '../category.service';

import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent {
  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private router: Router) { }

  categoryList = [''];

  ngOnInit() {
    let a = this.categoryService.fetchCategory().subscribe(res => {
      for (let key in res) {
        //console.log(res[key].name);
        this.categoryList.push(res[key].name);
      }
    })
    setTimeout(() => {
      this.categoryList = this.categoryList.filter(item => item);
      console.log(this.categoryList);
    }, 400);
  }

  generate() {

    for (let i = 0; i < 100; i++) {
      let name = `${faker.name.firstName()}'s ${faker.word.adjective()} ${faker.commerce.product()}`;
      let units = Math.floor(Math.random() * 10) + 1;
      let price = Math.floor(Math.random() * 1000) + 10;
      let description = faker.lorem.paragraph();
      let category = this.categoryList[Math.floor(Math.random() * this.categoryList.length)];
      let sale = Math.random() < 0.8;


      let model = new Inventory(name, units, price, category, sale, description, false, false, 0);
      this.inventoryService.createInventory(model);
    }
    alert('More items came from repo!')
    this.router.navigate(['dashboard']);
  }
}
