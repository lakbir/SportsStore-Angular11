import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  tagApiUrl: string = environment.host_url+"categories";

  constructor(private http: HttpClient) { }

  getCategoryById(id:number): Observable<any>{
    return this.http.get(`${this.tagApiUrl}/${id}`)
  }

  addCategory(category): Observable<any>{
  return this.http.post(`${this.tagApiUrl}/add`, category);
  }

  updateCategory(category): Observable<any>{
    return this.http.put(`${this.tagApiUrl}/update/${category.id}`, category);
  }

  deleteCategory(id): Observable<any>{
    return this.http.delete(`${this.tagApiUrl}/delete/${id}`);
  }

  searchCategory(name: string, page: number, size: number): Observable<any>{
    return this.http.get(`${this.tagApiUrl}/search?name=${name}&page=${page}&size=${size}`)
  }

  getAllCategories(): Observable<any>{
    return this.http.get(`${this.tagApiUrl}/getAllCategories`);
  }

}
