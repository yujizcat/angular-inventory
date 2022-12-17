import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent {
  @Input() inv?: Inventory;

  constructor(private inventoryService: InventoryService,
    private router: Router) {
    //this.router.getCurrentNavigation().extras.state.params;
    //const a = window.history.state;
  }

  openDetails = false;
  state = history.state;
  selectedInv = this.state.params;
  updateForm = false;

  //selectedInv?: Inventory;
  //onSelect(inv: Inventory){
  //  this.selectedInv = this.state;
  //}

  ngOnInit(): void {
    if (this.state) {
      this.getInventory();
      this.openDetails = true;
    }
  }

  getInventory() {
    console.log(this.selectedInv);
    this.inventoryService.detailedInventory(this.selectedInv).subscribe();

  }

  updateInventory(inv: Inventory) {
    //this.inventoryService.updateInventory(inv);
    this.router.navigate([`inventories/${inv.id}/edit`], { state: { params: inv } });
  }

  deleteInventory(inv: Inventory) {
    if (confirm(`Are you sure to delete ${inv.item}?`)) {
      this.inventoryService.deleteInventory(inv);
      this.router.navigate([`dashboard`]);
      alert("Item deleted");
    }
  }

  goBack() {
    this.router.navigate(['inventories']);
  }

}
