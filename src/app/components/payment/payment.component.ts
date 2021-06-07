import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../models/Order.model';
import {OrderService} from '../../services/order.service';
import {CaddyService} from '../../services/caddy.service';
import {ToastrService} from 'ngx-toastr';
import {errors} from '../../../environments/environment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  currentOrder:Order;
  mode: number = 0;
  payement: any;
  constructor(private router:Router, private route:ActivatedRoute,
              private caddyService: CaddyService,
              private toastr: ToastrService,
              private orderService:OrderService) { }

  ngOnInit() {
    let id=this.route.snapshot.params.orderID;
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onParOrder(data) {
    this.mode=1;
    this.payement=data;
    this.toastr.success("Paymnet informations added successfully", "Success");
  }

  onAddPayment() {
    console.log(this.payement);
    let id=this.route.snapshot.params.orderID;
    console.log(id);
    this.orderService.addPayment(this.payement, id).subscribe(
      data => {
        this.toastr.success("Your payment has added successfully", "Success")
        this.mode = 2;
        this.caddyService.removeCaddyFromLocalStorage();
      }, err => {
        console.error(err);
        this.toastr.warning("Error to finalise your payment, try again", "Warning")
      }
    )
  }
}
