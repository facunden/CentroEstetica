import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Clientes} from "../../models/clientes";
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getProveedores(){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/proveedores/getAll`,{headers});
  }


  getProveedorPorNombre(nombre){
    const headers = ({'authorization': "Bearer " + this.token})
    let objNombre = JSON.parse('{"nombre_cliente":"'+nombre+'"}');
    return this.http.post<Clientes[]>(`${appSettings.API_URI}/proveedores/BuscarPorNombre`,objNombre,{headers});
  }

  getProveedorPorID(id){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get(`${appSettings.API_URI}/proveedores/get/porID/`+id,{headers});
  }

  crearProveedor(proveedor){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/proveedores/crearProveedor`,proveedor,{headers});
  }

  updateProveedor(proveedor,id){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/proveedores/update/porID/`+id,proveedor,{headers});
  }
}
