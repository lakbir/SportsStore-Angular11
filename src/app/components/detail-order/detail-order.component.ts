import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../models/Order.model';
import {OrderService} from '../../services/order.service';
import {ToastrService} from 'ngx-toastr';
import {errors} from '../../../environments/environment';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  order: Order;
  constructor(private route:ActivatedRoute,
              private toastr: ToastrService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params.id;
    this.orderService.getOrder(id).subscribe(
      data => {
        console.log(data);
        this.order = data;
      }, err => {
        console.error(err);
        this.toastr.warning(errors.error_get_orders, "Warning")
      }
    )
  }

}
