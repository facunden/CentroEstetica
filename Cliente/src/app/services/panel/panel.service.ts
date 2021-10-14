import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { Panel } from '../../models/panel'
import {appSettings} from "../../models/appSettings";

@Injectable({
  providedIn: 'root'
})

export class PanelService {

  logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getCode(){
    let oauth2Endpoint = `${appSettings.API_URI}/panel/calendar/token`;
    let form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
    document.body.appendChild(form);
    form.submit();
  }

  isloggedIn(value) {
    this.logged.next(value);
  }

  getUsuarios(): Observable<Panel[]>{
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.get<Panel[]>(`${appSettings.API_URI}/panel`,{headers});
  }

  getPermisoCategoria(id){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.get(`${appSettings.API_URI}/panel/permisoUsuarioCat/`+id,{headers});
  }

  getTareasPendientes(id){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.get(`${appSettings.API_URI}/panel/pendientes/`+id,{headers});
  }

  setPermisoCategoria(permisos){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.post(`${appSettings.API_URI}/panel/permisoUsuarioCat/`,permisos,{headers});
  }

  setPendientes(pendientes){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.post(`${appSettings.API_URI}/panel/pendientes/`,pendientes,{headers});
  }

  getUsuario(id): Observable<Panel>{
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.get<Panel>(`${appSettings.API_URI}/panel/`+ id,{headers});
  }

  loguearUsuario(usuario){
    return this.http.post<Panel>(`${appSettings.API_URI}/panel`,usuario);
  }

  CrearUsuario(usuario){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.post(`${appSettings.API_URI}/panel/crearUsuario`,usuario,{headers});
  }

  updateUsuario(usuario,id){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.put(`${appSettings.API_URI}/panel/updateUsuario/`+id,usuario,{headers});
  }

  verifyToken(){
    const headers = ({'authorization': "Bearer " + appSettings.token})
    return this.http.get(`${appSettings.API_URI}/panel/verificarToken`,{headers});
  }

}
