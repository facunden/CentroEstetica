import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})
export class ReferidosService {

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getAllRefers():Observable<any[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/referidos/`,{headers});
  }

  getReferById(id):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any>(`${appSettings.API_URI}/referidos/`+id,{headers});
  }

  createRefer(refer):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post<any>(`${appSettings.API_URI}/referidos/`,refer,{headers});
  }

  updateRefer(id,refer):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put<any>(`${appSettings.API_URI}/referidos/`+id,refer,{headers});
  }

  deleteRefer(id):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete<any>(`${appSettings.API_URI}/referidos/`+id,{headers});
  }
}
