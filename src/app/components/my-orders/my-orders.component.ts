import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/Order.model';
import {errors} from '../../../environments/environment';
import {OrderService} from '../../services/order.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number[] = [];
  keyWord: string = "";
  sizeShower: number = 10;
  hasError: string = errors.error_no_orders;

  constructor(private orderService: OrderService, private toastr: ToastrService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.keyWord = this.tokenService.getUser().username;
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.peagbleOrders(this.keyWord, this.currentPage, this.sizeShower)
      .subscribe( data => {
        this.orders = data.orders;
        this.totalItems = data.totalItems;
        for(let i=0;i<data.totalPages;i++){
          this.totalPages[i] = i;
        }
      }, error => {
        this.hasError = errors.error_get_orders;
        console.error(error.message);
        this.toastr.warning(errors.error_get_orders, "Warning")
      })
  }

  onSearchOrders() {
    this.totalPages = [];
    this.getAllOrders();
  }

  onRefreshOrders() {
    this.keyWord = "";
    this.currentPage = 0;
    this.getAllOrders();
  }

  goToPage(p: number) {
    this.currentPage = p;
    this.getAllOrders();
  }

}
