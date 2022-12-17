import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';


import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.css']
})

export class NewInventoryComponent {
  constructor(private inventoryService: InventoryService,
    private router: Router){}

  submitted = false;

  model = new Inventory('',0);

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
