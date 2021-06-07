import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {AuthService} from '../../services/auth.service';
import {CaddyService} from '../../services/caddy.service';
import {Client} from '../../models/client.model';
import {TokenStorageService} from '../../services/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public mode:number=0;
  panelStyle:string= "bg-primary";
  constructor(public orderService:OrderService,
              private authService:AuthService,
              private tokenService: TokenStorageService,
              public caddyService:CaddyService,
              private toastr: ToastrService,
              private router:Router) { }

  ngOnInit() {
  }

  onSaveClient(client:Client) {
    client.username=this.tokenService.getUser().username;
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode=1;
    this.toastr.success("Client informations added successfully", "Success");
  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle="bg-success";
      this.toastr.success("Confirmation successfully", "Success");
    },err=>{
      console.log(err);
    });
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }
}
