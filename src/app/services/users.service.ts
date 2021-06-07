import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getTagById(id:number){
    this.http.get(`${environment.host}/users/${id}`)
  }

  getAllUsers(username: string, page:number, size: number): Observable<any>{
    return this.http.get(`${environment.host_url}users?username=${username}&page=${page}&size=${size}`)
  }

  deleteUser(idUser: number): Observable<any>{
    return this.http.delete(`${environment.host_url}users/${idUser}`);
  }

  addRoleToUser(idUser: number, role: string): Observable<any>{
    return this.http.put(`${environment.host_url}users/addRoleToUser?id=${idUser}&role=${role}`,null);
  }

  deleteRoleToUser(idUser: number, role: string): Observable<any>{
    return this.http.put(`${environment.host_url}users/deleteRoleFromUser?id=${idUser}&role=${role}`,null);
  }

  updateProfile(username: string, email: string, password: string, id: number): Observable<any> {
    return this.http.put(`${environment.host_url}users/updateProfile/${id}`, {
      username,
      email,
      password
    });
  }
}
