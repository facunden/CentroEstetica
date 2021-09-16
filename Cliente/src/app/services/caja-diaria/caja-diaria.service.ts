import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})
export class CajaDiariaService {

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getCaja(){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get(`${appSettings.API_URI}/caja-diaria/`,{headers});
  }

  insertarCaja(caja){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/caja-diaria/`,caja,{headers});
  }

  deleteCaja(id){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete(`${appSettings.API_URI}/caja-diaria/`+id,{headers});
  }

}
