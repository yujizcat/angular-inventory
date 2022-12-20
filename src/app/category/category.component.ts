import { Component, OnInit } from '@angular/core';
import { Category } from '../category';

import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  constructor(private categoryService: CategoryService) { }

  category: Category[] = [];
  newCategory = new Category('');

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.fetchCategory().subscribe(category => this.category = category);
  }

  createCategory() {
    this.categoryService.createcategory(this.newCategory);
    this.getCategory();
    window.location.reload();
    alert('New category created');
  }

  deleteCategory(cate: Category) {
    if (confirm(`Are you sure to delete Category ${cate.category}?`)) {
      this.categoryService.deleteCategory(cate);
      this.getCategory();
      window.location.reload();
      alert('Category deleted');
    }
  }

}
