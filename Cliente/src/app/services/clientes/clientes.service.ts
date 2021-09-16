import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clientes} from "../../models/clientes";
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getClientePorNombre(nombre):Observable<Clientes[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    let objNombre = JSON.parse('{"nombre_cliente":"'+nombre+'"}');
    return this.http.post<Clientes[]>(`${appSettings.API_URI}/clientes/BuscarPorNombre`,objNombre,{headers});
  }

  getAllClientes():Observable<Clientes[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<Clientes[]>(`${appSettings.API_URI}/clientes`,{headers});
  }

  getClientePorID(id_cliente):Observable<Clientes>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<Clientes>(`${appSettings.API_URI}/clientes/BuscarPorId/`+id_cliente,{headers});
  }

  getTratamientoClientePorID(id_cliente):Observable<any[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/clientes/tratamientos/porid/`+id_cliente,{headers});
  }

  crearTratamientoCliente(tratamiento){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/clientes/tratamientos/`,tratamiento,{headers});
  }

  updateTratamientoCliente(id,tratamiento){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/clientes/actualizarTratamientoCliente/`+id,tratamiento,{headers});
  }

  getObservacionesCliente(id){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get(`${appSettings.API_URI}/clientes/observaciones/`+id,{headers});
  }

  deleteObservacionesCliente(id){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete(`${appSettings.API_URI}/clientes/observaciones/`+id,{headers});
  }

  createObservacionesCliente(observacion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/clientes/observaciones/`,observacion,{headers});
  }

  CrearCliente(cliente){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/clientes/CrearCliente`,cliente,{headers});
  }

  UpdateCliente(cliente,id_cliente){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/clientes/actualizarCliente/`+id_cliente,cliente,{headers});
  }
}
