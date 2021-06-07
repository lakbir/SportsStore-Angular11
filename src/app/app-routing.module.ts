import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {UsersComponent} from './components/users/users.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {ProductsComponent} from './components/products/products.component';
import {HomeComponent} from './components/home/home.component';
import {CaddyComponent} from './components/caddy/caddy.component';
import {ClientComponent} from './components/client/client.component';
import {PaymentComponent} from './components/payment/payment.component';
import {OrdersComponent} from './components/orders/orders.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {DetailOrderComponent} from './components/detail-order/detail-order.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {LoggedGuardGuard} from './guards/logged-guard.guard';
import {IsAdminGuardGuard} from './guards/is-admin-guard.guard';

const routes: Routes = [
  {path : "auth/signup", component: SignupComponent},
  {path : "auth/login", component: LoginComponent},
  {path : "my-profile", component: LoginComponent, canActivate:[LoggedGuardGuard]},
  {path : "admin/users", component: UsersComponent, canActivate: [LoggedGuardGuard, IsAdminGuardGuard]},
  {path : "admin/categories", component: CategoriesComponent, canActivate: [LoggedGuardGuard, IsAdminGuardGuard] },
  {path : "admin/products", component: ProductsComponent, canActivate: [LoggedGuardGuard, IsAdminGuardGuard] },
  {path : "admin/orders", component: OrdersComponent, canActivate: [LoggedGuardGuard, IsAdminGuardGuard] },
  {path : "my-orders", component: MyOrdersComponent, canActivate:[LoggedGuardGuard] },
  {path : "orders/:id", component: DetailOrderComponent, canActivate:[LoggedGuardGuard] },
  {path : "", component: HomeComponent},
  {path:'caddy', component:CaddyComponent, canActivate:[LoggedGuardGuard]},
  {path:'client', component:ClientComponent, canActivate:[LoggedGuardGuard]},
  {path:'product/:id', component:ProductsComponent, canActivate: [LoggedGuardGuard, IsAdminGuardGuard]},
  {path:'payment/:orderID', component:PaymentComponent, canActivate:[LoggedGuardGuard]},
  {path:'profile', component:MyProfileComponent, canActivate:[LoggedGuardGuard]},
  {path:'**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
