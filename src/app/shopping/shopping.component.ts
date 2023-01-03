import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  inventories: Inventory[] = [];
  shoppingList: Inventory[] = [];
  reloaded = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.getInventories();
    }, 10)

    setTimeout(() => {
      this.shoppingList = this.inventories.filter((invs) => {
        return invs.shopping === true;
      });
      // console.log(this.inventories);
      // console.log(this.shoppingList);
    
    }, 400);


  }

  getInventories(): void {
    this.inventoryService.fetchInventory().subscribe(inventories =>
      this.inventories = inventories
    );

  }

  cancel(inv: Inventory) {
    alert('canceled');
    inv.units += (inv.checkout/inv.price);
    inv.checkout = 0;
    inv.shopping = false;
    this.inventoryService.updateInventory(inv);
    setTimeout(()=>{
      window.location.reload();
    },200)
    
  }

}
