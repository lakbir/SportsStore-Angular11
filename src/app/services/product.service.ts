import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  tagApiUrl: string = environment.host_url+"products";
  constructor(private http: HttpClient) { }

  getProductById(id:number): Observable<any>{
    return this.http.get(`${this.tagApiUrl}/${id}`)
  }

  addProduct(product): Observable<any>{
    product.image = product.image.substring(12);
  return this.http.post(`${this.tagApiUrl}/add/${product.idCategory}`, product);
  }

  updateProduct(product): Observable<any>{
    return this.http.put(`${this.tagApiUrl}/update/${product.id}`, product);
  }

  deleteProduct(id): Observable<any>{
    return this.http.delete(`${this.tagApiUrl}/delete/${id}`);
  }

  searchProduct(name: string, page: number, size: number): Observable<any>{
    return this.http.get(`${this.tagApiUrl}/search?name=${name}&page=${page}&size=${size}`)
  }

  searchProductByCategory(idCategory: number): Observable<any>{
    return this.http.get(`${this.tagApiUrl}/searchByCategory?idCategory=${idCategory}`);
  }

}
