import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent {
  @Input() inv?: Inventory;
  
  constructor(private inventoryService: InventoryService,
    private router: Router){}

  submitted = false;

  openUpdateForm=false;

  state = history.state;
  selectedInv = this.state.params;

  model = new Inventory(this.selectedInv.item, this.selectedInv.units, this.selectedInv.price, this.selectedInv.category, this.selectedInv.sale, this.selectedInv.description, this.selectedInv.shopping, this.selectedInv.bought, this.selectedInv.checkout);

  ngOnInit(){

    this.openUpdateForm=true;
  }

  onSubmit(){
    this.submitted = true;
    this.model.id = this.selectedInv.id;
    alert('Item updated');
    this.inventoryService.updateInventory(this.model);
    this.router.navigate([`dashboard`]);
  }

}
