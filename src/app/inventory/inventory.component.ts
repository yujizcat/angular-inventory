import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  inventories: Inventory[] = [];

  tempInventories: Inventory[] = [];

  categoryList = [''];

  isSelected = false;
  isUpdate = false;

  sortU = 0;
  sortP = 0;
  showS = false;

  click = false;


  ngOnInit(): void {
    this.getInventories();
    let a = this.categoryService.fetchCategory().subscribe(res => {
      for (let key in res) {
        console.log(res[key].category);
        this.categoryList.push(res[key].category);
      }
    })
    setTimeout(() => {
      this.categoryList = this.categoryList.filter(item => item);
      console.log(this.categoryList);
    }, 400);
    setTimeout(() => {
      this.tempInventories = this.inventories;
      console.log('NgOnInit completed');
    }, 400);

  }

  selectedInv?: Inventory;
  onSelect(inventory: Inventory, update: boolean): void {
    console.log('selected');
    this.isSelected = true;
    this.selectedInv = inventory;
    if (update) {
      this.router.navigate([`inventories/${inventory.id}/edit`], { state: { params: inventory } });
    } else {
      this.router.navigate([`inventories/${this.selectedInv.id}`], { state: { params: this.selectedInv } });
    }


  }

  getInventories(): void {
    this.inventoryService.fetchInventory().subscribe(inventories => this.inventories = inventories);

  }

  unitsControl(inventory: Inventory, c: boolean): void {
    if (c == true) {
      inventory.units += 1;
    } else {
      inventory.units -= 1;
      if (inventory.units <= 0) {
        inventory.units = 0;
      }
    }
    this.inventoryService.updateInventory(inventory);
  }

  clickItem(inventory: Inventory): void {
    this.click = true;
    console.log(`click ${inventory.item}`);
  }

  sortByUnits() {
    console.log('sort by units');
    if (this.sortU == 0) {
      this.inventories.sort((a, b) => (a.units < b.units) ? 1 : -1);
      this.sortU += 1;
    } else {
      this.inventories.sort((a, b) => (a.units > b.units) ? 1 : -1);
      this.sortU -= 1;
    }

  }

  sortByPrice() {
    console.log('sort by price');
    if (this.sortP == 0) {
      this.inventories.sort((a, b) => (a.price < b.price) ? 1 : -1);
      this.sortP += 1;
    } else {
      this.inventories.sort((a, b) => (a.price > b.price) ? 1 : -1);
      this.sortP -= 1;
    }
  }

  filter(cate: string) {
    console.log(this.inventories);
    console.log(this.tempInventories);
    if (cate == 'All') {
      this.inventories = this.tempInventories;
    } else {
      this.inventories = this.tempInventories.filter((invs) => {
        return invs.category === cate;
      });
    }
    
  }

  showSale() {
    if (this.showS == false) {
      this.inventories = this.inventories.filter((inv) => {
        return inv.sale === true;
      })
      this.showS = true;
    } else {
      this.showS = false;
      this.inventories = this.tempInventories;
    }
    
  }

  deleteAll() {
    if (confirm(`Are you sure to delete all inventories?`)) {
      this.inventoryService.deleteAllInventory();
      alert('Deleted all inventories');
      this.router.navigate(['dashboard']);
    }
  }

  deleteOne(inv: Inventory) {
    if (confirm(`Are you sure to delete ${inv.item}?`)) {
      this.inventoryService.deleteInventory(inv);
      //this.router.navigate([`dashboard`]);
      this.getInventories();
      window.location.reload();
      alert("Item deleted");
    }
  }


}
