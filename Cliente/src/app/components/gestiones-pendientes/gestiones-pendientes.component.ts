import { Component, OnInit } from '@angular/core';
import {PanelService} from "../../services/panel/panel.service";
import {Router} from "@angular/router";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {DetalleGestionComponent} from "../detalle-gestion/detalle-gestion.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-gestiones-pendientes',
  templateUrl: './gestiones-pendientes.component.html',
  styleUrls: ['./gestiones-pendientes.component.css']
})
export class GestionesPendientesComponent implements OnInit {

  gestionesPendientes: any;
  isLoaded: boolean = false;
  sinPendientes: boolean = false;

  constructor(private panelService: PanelService,private router: Router,private gestionesService: GestionesService,
              public dialog: MatDialog) {
    panelService.verifyToken().subscribe(() => {
    },error => {
      if(error){
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    gestionesService.getGestionesPendientes().subscribe(res =>{
      this.gestionesPendientes = res;
      this.isLoaded = true;
      if(this.gestionesPendientes.length==0){
        this.sinPendientes = true;
      }
    })
  }

  openDialog(gestion) {
    const dialogRef = this.dialog.open(DetalleGestionComponent, {
      width: '95%',
      maxWidth: '500px',
      height: '80%',
      maxHeight: '600px',
      position: {top: '95px'},
      data: {id: gestion.id}
    })
  }


  ngOnInit() {
  }

}
