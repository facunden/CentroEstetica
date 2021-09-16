import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";

@Component({
  selector: 'app-tipo-gestion-categorias-admin',
  templateUrl: './tipo-gestion-categorias-admin.component.html',
  styleUrls: ['./tipo-gestion-categorias-admin.component.css']
})
export class TipoGestionCategoriasAdminComponent implements OnInit {

  categoriasGestiones: [] = [];

  categoriaGestion = {
    descripcion: ""
  }

  catTipoDeGestionEditSelected: any;
  nombreEditado: any;

  constructor(private router: Router, private gestionesService: GestionesService, private panelService: PanelService) {
    panelService.verifyToken().subscribe(() => {
    },error => {
      if(error){
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    this.gestionesService.getCategoriasTiposGestion().subscribe(res =>{
      this.categoriasGestiones = <any>res;
    })
    if(JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId){
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
  }

  crearCatTipoGestion(){
    this.categoriaGestion.descripcion = this.categoriaGestion.descripcion.toUpperCase();
    if(confirm("Esta seguro de que desea crear la tarea seleccionada?")) {
      this.gestionesService.crearCatTipoGestion(this.categoriaGestion);
      this.router.navigate(['panel'])
    }
    else{}
  }

  editarCatTipoGestion(){
    if(confirm("Esta seguro de que desea cambiar el nombre la tarea seleccionada?")){
      this.catTipoDeGestionEditSelected.descripcion = this.nombreEditado;
      this.catTipoDeGestionEditSelected.descripcion = this.catTipoDeGestionEditSelected.descripcion.toUpperCase();
      this.gestionesService.updateCatTipoGestion(this.catTipoDeGestionEditSelected,this.catTipoDeGestionEditSelected.id);
      this.router.navigate(['home']);
    }else{}
  }

  ngOnInit() {
  }

  copiarNombre(nombre){
    this.nombreEditado = nombre
  }

}
