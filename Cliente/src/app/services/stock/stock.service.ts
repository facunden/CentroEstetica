import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/stock/getAll`,{headers});
  }

  getProductById(id):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any>(`${appSettings.API_URI}/stock/`+id,{headers});
  }

  createProduct(product):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post<any>(`${appSettings.API_URI}/stock/`,product,{headers});
  }

  updateStock(id,product):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put<any>(`${appSettings.API_URI}/stock/`+id,product,{headers});
  }

  deleteProduct(id):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete<any>(`${appSettings.API_URI}/stock/`+id,{headers});
  }
}
