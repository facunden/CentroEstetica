import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {TiposGestiones} from "../../models/tiposGestiones";

@Component({
  selector: 'app-observaciones-tabuladas-admin',
  templateUrl: './observaciones-tabuladas-admin.component.html',
  styleUrls: ['./observaciones-tabuladas-admin.component.css']
})
export class ObservacionesTabuladasAdminComponent implements OnInit {

  tiposDeGestion: TiposGestiones[];
  listaObsTab: any = undefined;
  tipoGestionSelected: any;
  obsTabSelected: any = undefined;
  nombreTabulacion: any;
  tipoGestionSelectedParaObs: any;
  nombreTabulacionEdit: any;

  notFound = "No se han encontrado resultados";
  keyword = 'nombre_gestion'

  constructor(private router: Router, private gestionesService: GestionesService, private panelService: PanelService) {
    panelService.verifyToken().subscribe(res=>{
    },error => {
      if(error){
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    if(JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId){
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
    gestionesService.getGestionesPorTipoAll().subscribe(res => {
      this.tiposDeGestion = res;
      this.tiposDeGestion = this.tiposDeGestion.filter(gestion => gestion.es_tabulada)
    });
  }

  ngOnInit() {
  }

  agregarObservacionTab(){
    let obsTab = {
      tabulacion: this.nombreTabulacion,
      id_tipo_gestion: this.tipoGestionSelected.id
    }
    obsTab.tabulacion = obsTab.tabulacion.toUpperCase();
    this.gestionesService.crearObservacionTabulada(obsTab).then(res =>{
      if (res){
        window.location.reload();
      }
    })
  }

  getObservacionesTabPorIdGestion(id){
    this.gestionesService.getObservacionesTabPorIdGestion(id).toPromise().then(res =>{
      this.listaObsTab = res;
    });
  }

  editarObservacionTabulada(id){
    let tabulacion = this.nombreTabulacionEdit;
    tabulacion = tabulacion.toUpperCase();
    this.gestionesService.updateObservacionTabulada(tabulacion,id).subscribe(res =>{
      if (res){
        window.location.reload();
      }
    });
  }

  copiarNombre(nombre){
    this.nombreTabulacionEdit = nombre
  }

}
