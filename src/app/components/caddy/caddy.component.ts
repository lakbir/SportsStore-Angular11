import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Caddy} from '../../models/caddy.model';
import {CaddyService} from '../../services/caddy.service';
import {AuthService} from '../../services/auth.service';
import {ItemProduct} from '../../models/item-product.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {

  public caddy:Caddy;

  constructor(private router:Router,
              private toastr: ToastrService,
              private caddyService:CaddyService,
              private authService:AuthService) {
  }

  ngOnInit() {
    if(!this.authService.isAuthenticated())
      this.router.navigateByUrl('/login');
    this.caddy=this.caddyService.getCaddy();
    console.log(this.caddy);
  }



  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
    this.toastr.success("Product deleted successfully", "Success");
  }

  getTotal() {
      return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }

  onAddCaddy() {
    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCaddy();
  }
}
