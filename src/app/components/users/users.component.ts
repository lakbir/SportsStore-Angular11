import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {ToastrService} from 'ngx-toastr';
import {errors} from '../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number[] = [];
  keyWord: string = "";
  sizeShower: number = 10;
  hasError: string = errors.error_no_users;
  idUserToAction: number = null;

  constructor(private usersService: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.usersService.getAllUsers(this.keyWord, this.currentPage, this.sizeShower)
      .subscribe( data => {
        this.users = data.users;
        this.totalItems = data.totalItems;
        for(let i=0;i<data.totalPages;i++){
          this.totalPages[i] = i;
        }
      }, error => {
        this.hasError = errors.error_get_users;
        console.error(error.message);
        this.toastr.warning(errors.error_get_users, "Warning")
      })
  }

  onSearchUsers() {
    this.totalPages = [];
    this.getAllUsers();

  }

  onRefreshUsers() {
    this.keyWord = "";
    this.currentPage = 0;
    this.getAllUsers();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getAllUsers();
  }

  manageRoleUser(user: any) {
    if(this.hasRoleUser(user)){
      this.usersService.deleteRoleToUser(user.id, "user").subscribe(
        data => {
          this.toastr.success(data.message, "Success");
          this.getAllUsers();
        }, err => {
          console.error(err);
          this.toastr.warning(err.message, "Warning");
        }
      )
    }else{
      this.usersService.addRoleToUser(user.id, "user").subscribe(
        data => {
          this.toastr.success(data.message, "Success");
          this.getAllUsers();
        }, err => {
          console.error(err);
          this.toastr.warning(err.message, "Warning");
        }
      )
    }
    this.getAllUsers();
  }

  manageRoleAdmin(user: any) {
    if(this.hasRoleAdmin(user)){
      this.usersService.deleteRoleToUser(user.id, "admin").subscribe(
        data => {
          this.toastr.success(data.message, "Success");
          this.getAllUsers();
        }, err => {
          console.error(err);
          this.toastr.warning(err.message, "Warning");
        }
      )
    }else{
      this.usersService.addRoleToUser(user.id, "admin").subscribe(
        data => {
          this.toastr.success(data.message, "Success");
          this.getAllUsers();
        }, err => {
          console.error(err);
          this.toastr.warning(err.message, "Warning");
        }
      )
    }
  }

  setUserToAction(id: any) {
    this.idUserToAction = id;
  }

  hasRoleAdmin(user: any){
    let test = false;
    user.roles.forEach(r => {
      if(r.name == "ROLE_ADMIN") test = true;
    });
    return test;
  }

  hasRoleUser(user: any){
    let test = false;
    user.roles.forEach(r => {
      if(r.name == "ROLE_USER") test = true;
    });
    return test;
  }

  deleteUser() {
      this.usersService.deleteUser(this.idUserToAction).subscribe(
        data => {
          this.toastr.success(data.message, "Success");
          this.getAllUsers();
        }, error => {
          this.toastr.warning(errors.error_delete_user, "Warning");
          console.error(error)
        }
      )
  }
}
