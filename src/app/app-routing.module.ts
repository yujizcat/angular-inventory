import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NewInventoryComponent } from './new-inventory/new-inventory.component';
import { CategoryComponent } from './category/category.component';
import { RepoComponent } from './repo/repo.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventories', component: InventoryComponent },
  { path: 'inventories/:id', component: InventoryDetailsComponent},
  { path: 'create', component: NewInventoryComponent},
  { path: 'inventories/:id/edit', component: EditInventoryComponent},
  { path: 'category', component: CategoryComponent },
  { path: 'repo', component: RepoComponent },
  { path: 'shopping', component: ShoppingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
