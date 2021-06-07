import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../models/Category.model';
import {errors} from '../../../environments/environment';
import {Product} from '../../models/Product.model';
import {ProductService} from '../../services/product.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {CaddyService} from '../../services/caddy.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  products: Product[];
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number[] = [];
  keyWord: string = "";
  sizeShower: number = 6;
  idCurrentCategory = null;
  isLoggedIn = false;
  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              public caddyService: CaddyService,
              private authService: AuthService,
              private router: Router,
              private  tokenStorageService: TokenStorageService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getAllCategories();
    this.getAllProducts();
    this.idCurrentCategory = null;
  }

  getAllCategories(){
    this.categoryService.getAllCategories()
      .subscribe( data => {
        this.categories = data;
      }, error => {
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
        console.error(error.message);
        this.toastr.warning(errors.error_get_products, "Warning")
      })
  }

  onSearchProducts() {
    this.totalPages = [];
    this.getAllProducts();
  }

  onRefreshProducts() {
    this.idCurrentCategory = null;
    this.keyWord = "";
    this.currentPage = 0;
    this.getAllProducts();
  }

  goToPage(p: number) {
    this.currentPage = p;
    this.getAllProducts();
  }

  searchByCategory(id: number) {
    this.idCurrentCategory = id;
    this.keyWord = "";
    this.currentPage = 0;
    this.totalItems = 0;
    this.totalPages = [];
    this.productService.searchProductByCategory(id)
      .subscribe( data => {
        this.products = data.products;
      }, error => {
        console.error(error.message);
        this.toastr.warning(errors.error_get_products, "Warning")
      })
  }

  onAddProductToCaddy(p:Product) {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
    }
    else{
      this.caddyService.addProduct(p);
      this.toastr.success("Product added successfully", "Success");
    }
  }
}
