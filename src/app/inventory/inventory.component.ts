import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  inventories: Inventory[] = [];

  isSelected = false;

  click = false;

  ngOnInit(): void {
    this.getInventories();
  }

  selectedInv?: Inventory;
  onSelect(inventory: Inventory): void {
    console.log('selected');
    this.isSelected = true;
    this.selectedInv = inventory;
    this.router.navigate([`inventories/${this.selectedInv.id}`], { state: { params: this.selectedInv } });
    
  }

  getInventories(): void {
    this.inventoryService.fetchInventory().subscribe(inventories => this.inventories = inventories);
    //this.inventoryService.detailedInventory().subscribe();
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

  clickItem(inventory: Inventory):void{
    this.click=true;
    console.log(`click ${inventory.item}`);
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
