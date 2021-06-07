import {CaddyService} from './caddy.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../models/Order.model';
import {Client} from '../models/client.model';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn:'root'
})
export class OrderService {
  public order:Order=new Order();

  constructor(private caddyService:CaddyService,
              private httpClient:HttpClient){}

  public setClient(client:Client){
    this.order.client=client;
  }
  public loadProductsFromCaddy(){
    this.order.products=[];
   for(let key in this.caddyService.getCaddy().items){
     this.order.products.push(this.caddyService.getCaddy().items[key]);
   }
  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  submitOrder() {
    return this.httpClient.post(environment.host+"/orders",this.order);
  }

  public getOrder(id:number):Observable<Order>{
    return this.httpClient.get<Order>(environment.host+"/orders/"+id);
  }

  public addPayment(payment: any, id: number):Observable<any>{
    return this.httpClient.post<any>(environment.host_url+"payment/"+id, payment);
  }

  peagbleOrders(username: string, page: number, size: number): Observable<any>{
    return this.httpClient.get(`${environment.host}/orders/pageable?username=${username}&page=${page}&size=${size}`)
  }
}
