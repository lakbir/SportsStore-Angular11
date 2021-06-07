import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/Category.model';
import {errors} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number[] = [];
  keyWord: string = "";
  sizeShower: number = 5;
  hasError: string = errors.error_no_categories;
  idCategoryToAction: number = null;
  categoryFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(10)]),

  });

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.searchCategory(this.keyWord, this.currentPage, this.sizeShower)
      .subscribe( data => {
        this.categories = data.categories;
        this.totalItems = data.totalItems;
        for(let i=0;i<data.totalPages;i++){
          this.totalPages[i] = i;
        }
      }, error => {
        this.hasError = errors.error_get_categories;
        console.error(error.message);
        this.toastr.warning(errors.error_get_categories, "Warning")
      })
  }

  onSearchCategories() {
    this.totalPages = [];
    this.getAllCategories();
  }

  onRefreshCategories() {
    this.keyWord = "";
    this.currentPage = 0;
    this.getAllCategories();
  }

  setCategoryToAction(id: number) {
    this.idCategoryToAction = id;
  }

  goToPage(p: number) {
    this.currentPage = p;
    this.getAllCategories();
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.idCategoryToAction).subscribe(
      data => {
        this.toastr.success(data.message, "Success");
        this.getAllCategories();
      }, error => {
        this.toastr.warning(errors.error_delete_category, "Warning");
        console.error(error)
      }
    )
  }

  onAddNewCategory() {
    this.categoryService.addCategory(this.categoryFormGroup.value).subscribe(
      data => {
        this.toastr.success(errors.succes_add_category, 'Success !');
        this.getAllCategories();

      }, err => {
        console.log(err);
        this.toastr.warning(errors.error_add_category, 'Warning !');
      }
    );
  }

  onUpdateCategory() {
    this.categoryService.updateCategory(this.categoryFormGroup.value).subscribe(
      data => {
        this.toastr.success(errors.succes_update_category, 'Success !');
        this.getAllCategories();
      }, err => {
        console.log(err);
        this.toastr.warning(errors.error_update_category, 'Warning !');
      }
    )
  }

  setCategoryToUpdate(category: Category) {
    this.categoryFormGroup = new FormGroup({
      id: new FormControl(category.id),
      name: new FormControl(category.name, [Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
      description: new FormControl(category.description, [Validators.required, Validators.maxLength(200),Validators.minLength(10)])
    });
  }

  setAddCategory() {
    this.categoryFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(10)]),
    });
  }
}
