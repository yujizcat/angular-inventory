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
  currentInventories: Inventory[] = [];
  shoppingList: Inventory[] = [];
  categoryList = [''];

  currentShopping: Inventory = new Inventory("",0,0,"",false,"",false,false, 0);
  currentShoppingUnits = 0;

  isSelected = false;
  isUpdate = false;
  isShopping = false;

  sortU = 0;
  sortP = 0;
  showS = false;

  click = false;
  checked = false;

  trans = false;

  listItemDiv = document.getElementsByClassName("list-item") as HTMLCollectionOf<HTMLElement>;
  listItemIdDiv = document.getElementsByClassName("list-item-id") as HTMLCollectionOf<HTMLElement>;


  ngOnInit(): void {
    this.getInventories();


    let a = this.categoryService.fetchCategory().subscribe(res => {
      for (let key in res) {
        //console.log(res[key].name);
        this.categoryList.push(res[key].name);
      }
    })
    setTimeout(() => {
      this.categoryList = this.categoryList.filter(item => item);
      console.log(this.categoryList);
    }, 200);

    setTimeout(() => {
      this.shoppingList = this.inventories.filter((invs) => {
        return invs.shopping === true;
      });
      console.log(this.shoppingList);
    }, 200);

    setTimeout(() => {
      this.tempInventories = this.inventories;
      this.currentInventories = this.inventories;
      console.log(this.inventories);
      console.log('NgOnInit completed');
    }, 300);

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
    setTimeout(() => {
      this.transform();
    }, 10)
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

    setTimeout(() => {
      this.transform();
    }, 10)
  }

  filter(cate: string) {
    // console.log(this.inventories);
    // console.log(this.tempInventories);
    this.cancelShoppingWindow();
    if (cate == 'All') {
      this.inventories = this.tempInventories;
    } else {
      this.inventories = this.tempInventories.filter((invs) => {
        return invs.category === cate;
      });
    }
    this.currentInventories = this.inventories;

    setTimeout(() => {
      this.transform();
    }, 10)

    setTimeout(() => {
      this.checked = false;
      this.showS = false;
    }, 100);


  }

  showSale() {

    console.log(this.currentInventories);
    if (this.showS == false) {
      //this.tempInventories = this.inventories;
      this.inventories = this.currentInventories.filter((inv) => {

        return inv.sale === true;
      })
      this.showS = true;
    } else {
      this.showS = false;
      this.inventories = this.currentInventories.filter((inv) => {

        return inv.sale === false || inv.sale === true;
      })
    }
    console.log(this.inventories);


  }

  addCart(inventory: Inventory) {
    
    this.isShopping = true;
    this.currentShopping = inventory;
    //this.transformAdd(inventory);
    this.shoppingWindow(this.currentShopping);
    //inventory.shopping = true;
    //this.inventoryService.updateInventory(inventory);
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

  transform() {
    console.log(this.listItemDiv.length);
    if (this.listItemDiv.length != 0) {
      console.log('transform');
      if (this.trans === false) {
        for (let i = 0; i < this.listItemDiv.length; i++) {

          this.listItemDiv[i].style.transition = "transform 0.7s";
          this.listItemDiv[i].style.transform = "rotate(1turn)";
        }
        this.trans = true;
      } else {
        for (let i = 0; i < this.listItemDiv.length; i++) {

          this.listItemDiv[i].style.transition = "transform 0.7s";
          this.listItemDiv[i].style.transform = "rotate(0turn)";
        }
        this.trans = false;
      }
    }
  }

  transformAdd(inventory: Inventory) {

    //console.log(this.listItemDiv);
    for (let i = 0; i < this.listItemDiv.length; i++) {
      //console.log(this.listItemIdDiv[i].textContent);
      //console.log(this.listItemDiv[i]);
      if (inventory.id == this.listItemIdDiv[i].textContent) {
        console.log(inventory.item);
        console.log(this.listItemDiv[i]);
        this.listItemDiv[i].style.transition = "transform 0.9s";
        this.listItemDiv[i].style.transform = "translate(-300%)";

      }
    }
    //console.log(inventory.id);
  }

  shoppingWindow(inventory: Inventory){

    for (let i = 0; i < this.listItemDiv.length; i++) {
      this.listItemDiv[i].style.display = "none";
    }
  }

  cancelShoppingWindow(){
    this.isShopping = false;
    this.currentShopping = new Inventory("",0,0,"",false,"",false,false, 0);
    for (let i = 0; i < this.listItemDiv.length; i++) {
      this.listItemDiv[i].style.display = "flex";
    }
  }

  toCart(inv: Inventory){
    
    console.log(inv.item);
    console.log(this.currentShoppingUnits);
    if (this.currentShoppingUnits <= 0 || this.currentShoppingUnits > inv.units){
      alert('Invalid! Please try again.')
    } else {
      alert('succeed added to cart');
      inv.units -= this.currentShoppingUnits;
      inv.checkout = this.currentShoppingUnits * inv.price;
      inv.shopping = true;
      this.inventoryService.updateInventory(inv);
      this.router.navigate(['shopping']);
      
      
      
    }
  }


}
