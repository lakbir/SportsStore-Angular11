import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/Category.model';
import {errors} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../../models/Product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categories: Category[];
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number[] = [];
  keyWord: string = "";
  sizeShower: number = 5;
  hasError: string = errors.error_no_categories;
  idProductToAction: number = null;
  productFormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(10)]),
    image: new FormControl(),
    price: new FormControl(0.0, Validators.required),
    idCategory: new FormControl(0.0, Validators.required),
  });

  constructor(private categoryService: CategoryService, private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.searchCategory(this.keyWord, this.currentPage, this.sizeShower)
      .subscribe( data => {
        this.categories = data.categories;
      }, error => {
        this.hasError = errors.error_get_categories;
        console.error(error.message);
        this.toastr.warning(errors.error_get_categories, "Warning")
      })
  }

  getAllProducts(){
    this.productService.searchProduct(this.keyWord, this.currentPage, this.sizeShower)
      .subscribe( data => {
        this.products = data.products;
        this.totalItems = data.totalItems;
        for(let i=0;i<data.totalPages;i++){
          this.totalPages[i] = i;
        }
      }, error => {
        this.hasError = errors.error_get_products;
        console.error(error.message);
        this.toastr.warning(errors.error_get_products, "Warning")
      })
  }

  onSearchProducts() {
    this.totalPages = [];
    this.getAllProducts();
  }

  onRefreshProducts() {
    this.keyWord = "";
    this.currentPage = 0;
    this.getAllProducts();
  }

  setProductToAction(id: number) {
    this.idProductToAction = id;
  }

  goToPage(p: number) {
    this.currentPage = p;
    this.getAllProducts();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.idProductToAction).subscribe(
      data => {
        this.toastr.success(data.message, "Success");
        this.getAllProducts();
      }, error => {
        this.toastr.warning(errors.error_delete_product, "Warning");
        console.error(error)
      }
    )
  }

  onAddNewProduct() {
    console.log(this.productFormGroup.value);
    this.productService.addProduct(this.productFormGroup.value).subscribe(
      data => {
        this.toastr.success(errors.succes_add_product, 'Success !');
        this.getAllProducts();

      }, err => {
        console.log(err);
        this.toastr.warning(errors.error_add_product, 'Warning !');
      }
    );
  }

  onUpdateProduct() {
    this.productService.updateProduct(this.productFormGroup.value).subscribe(
      data => {
        this.toastr.success(errors.succes_update_product, 'Success !');
        this.getAllProducts();
      }, err => {
        console.log(err);
        this.toastr.warning(errors.error_update_product, 'Warning !');
      }
    )
  }

  setProductToUpdate(product: Product) {
    console.log(product)
    this.productFormGroup = new FormGroup({
      id: new FormControl(product.id),
      name: new FormControl(product.name, [Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
      description: new FormControl(product.description, [Validators.required, Validators.maxLength(200),Validators.minLength(10)]),
      price: new FormControl(product.price, [Validators.required])
    });
  }

  setAddProduct() {
    this.productFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(200),Validators.minLength(10)]),
      price: new FormControl(0.0, [Validators.required]),
      idCategory: new FormControl(null, [Validators.required]),
      image: new FormControl(),
    });
  }

}
