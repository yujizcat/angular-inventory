import { Component, OnInit } from '@angular/core';
import { Category } from '../category';

import { CategoryService } from '../category.service';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(
    private categoryService: CategoryService,
    private inventoryService: InventoryService) { }

  category: Category[] = [];
  newCategory = new Category('');
  inventory: Inventory[] = [];
  cleanCategory = false;

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.fetchCategory().subscribe(category => this.category = category);
  }

  createCategory() {
    console.log(this.newCategory);
    this.categoryService.createcategory(this.newCategory);
    this.getCategory();
    window.location.reload();
    alert('New category created');
  }

  deleteCategory(cate: Category) {
    this.checkInventories(cate.name);
    setTimeout(() => {
      console.log(this.cleanCategory);
      if (confirm(`Are you sure to delete Category ${cate.name}?`)) {
        if (this.cleanCategory === true) {
          this.categoryService.deleteCategory(cate);
          this.getCategory();
          window.location.reload();
          alert('Category deleted');
        } else {
          alert('You cannot delete! because there are some inventories in this category!');
        }
      }
    }, 300)


  }

  checkInventories(cate: any) {
    this.inventoryService.fetchInventory().subscribe(res => {
      this.inventory = res;
    });
    setTimeout(() => {
      let found = false;
      console.log(cate);
      for (let key in this.inventory) {
        if (cate === this.inventory[key].category) {
          found = true;
        }
      }
      if (found === true) {
        console.log('found!');
        this.cleanCategory = false;
      } else {
        console.log('Not found!');
        this.cleanCategory = true;
      }
    }, 300);
  }




}
