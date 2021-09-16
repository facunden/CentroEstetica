import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Gestiones} from "../../models/gestiones";
import {TiposGestiones} from "../../models/tiposGestiones";
import {appSettings} from "../../models/appSettings";


@Injectable({
  providedIn: 'root'
})
export class GestionesService {
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getGestionesPorIDCliente(gestion): Observable<Gestiones[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post<Gestiones[]>(`${appSettings.API_URI}/gestiones/PorCliente`,gestion,{headers});
  }

  getGestionPorID(id_gestion): Observable<Gestiones>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<Gestiones>(`${appSettings.API_URI}/gestiones/PorIdGestion/`+id_gestion,{headers});
  }

  getGestionesPorTipo(idUsuario): Observable<TiposGestiones[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<TiposGestiones[]>(`${appSettings.API_URI}/gestiones/PorTipos/permisos/`+idUsuario,{headers});
  }

  getGestionesPorTipoAll(): Observable<TiposGestiones[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<TiposGestiones[]>(`${appSettings.API_URI}/gestiones/PorTipos`,{headers});
  }

  getGestionesPorTipoAllFathers(id: number): Observable<TiposGestiones[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<TiposGestiones[]>(`${appSettings.API_URI}/gestiones/PorTiposFathers/${id}`,{headers});
  }

  getGestionesPorTipoAllChilds(id: number, idGestion: number): Observable<TiposGestiones[]>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<TiposGestiones[]>(`${appSettings.API_URI}/gestiones/PorTiposChilds/${id}?tipo=${idGestion}`,{headers});
  }

  getCategoriasTiposGestion(){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<any[]>(`${appSettings.API_URI}/gestiones/CategoriasGestiones`,{headers});
  }

  getGestionesPendientes(){
    const headers = ({'authorization': "Bearer " + this.token})
    const id = appSettings.userId;
    return this.http.get(`${appSettings.API_URI}/gestiones/GestionesPendientes/`+id,{headers});
  }

  getObservacionesTabPorIdGestion(id){
    const headers = ({'authorization': "Bearer " + this.token});
    return this.http.get(`${appSettings.API_URI}/gestiones/observacionesTab/porIdTipoGestion/`+id,{headers});
  }

  crearGestion(gestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/gestiones`,gestion,{headers});
  }

  crearTipoGestion(gestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/gestiones/TipoGestion`,gestion,{headers}).toPromise();
  }

  crearObservacionTabulada(obsTab){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/gestiones/observacionesTab/`,obsTab,{headers}).toPromise();
  }

  deleteTipoGestion(id_gestion: number){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete(`${appSettings.API_URI}/gestiones/TipoGestion/`+id_gestion,{headers});
  }

  deleteGestionPorID(id_gestion: number){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.delete(`${appSettings.API_URI}/gestiones/Gestion/`+id_gestion,{headers});
  }

  updateTipoGestion(gestion,id_gestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/gestiones/TipoGestion/`+id_gestion,gestion,{headers});
  }

  updateObservacionTabulada(obsTab,id): Observable<any>{
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/gestiones/observacionesTab/`+id,{tabulacion: obsTab},{headers});
  }

  crearCatTipoGestion(CatGestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/gestiones/CatTipoGestion`,CatGestion,{headers}).subscribe();
  }

  updateCatTipoGestion(CatGestion,id_gestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/gestiones/CatTipoGestion/`+id_gestion,CatGestion,{headers}).subscribe();
  }

  updateGestion(gestion,id_gestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/gestiones/PorIdGestion/`+id_gestion,{gestion},{headers});
  }

  realizarGestion(gestion,id_gestion){
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/gestiones/Gestion/`+id_gestion,gestion,{headers});
  }

}
