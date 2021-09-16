import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})
export class TratamientosService {

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getAllTratamientos():Observable<any[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/tratamientos/getAll`,{headers});
  }

  getAllTratamientosFathers():Observable<any[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/tratamientos/getAllFathers`,{headers});
  }

  getAllTratamientosChilds(id: number):Observable<any[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/tratamientos/getAllChilds/`+id,{headers});
  }

  getTratamientoById(id):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any>(`${appSettings.API_URI}/tratamientos/getById/`+id,{headers});
  }

  crearTratamiento(tratamiento):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post<any>(`${appSettings.API_URI}/tratamientos/`,tratamiento,{headers});
  }

  updateTratamiento(id,tratamiento):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put<any>(`${appSettings.API_URI}/tratamientos/`+id,tratamiento,{headers});
  }

  deleteTratamiento(id):Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete<any>(`${appSettings.API_URI}/tratamientos/`+id,{headers});
  }

}
