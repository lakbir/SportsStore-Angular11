import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthInterceptor} from './helpers/auth.interceptor';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import {CaddyComponent} from './components/caddy/caddy.component';
import {ClientComponent} from './components/client/client.component';
import {PaymentComponent} from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { DetailOrderComponent } from './components/detail-order/detail-order.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    UsersComponent,
    CaddyComponent,
    CategoriesComponent,
    ProductsComponent,
    HomeComponent,
    ClientComponent,
    PaymentComponent,
    OrdersComponent,
    MyOrdersComponent,
    DetailOrderComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [DatePipe, AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
