import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Gestiones} from "../../models/gestiones";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import * as moment from "moment-timezone";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {Location} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-detalle-gestion',
  templateUrl: './detalle-gestion.component.html',
  styleUrls: ['./detalle-gestion.component.css']
})
export class DetalleGestionComponent implements OnInit {

  gestion: Gestiones;
  idCliente: number;
  isLoaded: boolean = false;
  idTratamiento: any;
  vuelvePendiente: boolean = false;
  editGestion: boolean = false;

  constructor(private router: Router, private gestionesService: GestionesService, private activatedRoute: ActivatedRoute,
              private panelService: PanelService, private location: Location,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA)
              public data) {
    panelService.verifyToken().subscribe(() => {
    },error => {
      if(error){
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    this.gestionesService.getGestionPorID(data.id).toPromise().then(res => {
      this.gestion = res;
    }).then(() =>{
      this.isLoaded = true;
    });
    if(JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId){
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
  }

  ngOnInit() {
  }

  volver(){
    if(this.vuelvePendiente){
      this.location.back();
    }else{
      this.dialogRef.close();
    }
  }

  arreglarFecha() {
    this.gestion.fecha_realizado = this.gestion.fecha_realizado.slice(0,-1);
  }


  editarGestion() {
    this.gestion.observacion = this.gestion.observacion.trim();
    this.gestionesService.updateGestion(this.gestion,this.gestion.id).subscribe(res =>{
      if(res['text'] == "Gestion updated"){
        alert('Cambio guardado con éxito')
        this.dialogRef.close();
      }
    });
  }

  realizarGestion(gestion) {
    if (confirm("Esta seguro que desea dar por realizada la gestion?")) {
      if (gestion.flag_realizado == 1) {
        gestion.flag_realizado = 0;
        gestion.id_usuario_realizado = null;
        gestion.fecha_realizado = null;
        this.gestionesService.realizarGestion(gestion, gestion.id).toPromise().then(()=>{
          this.volver();
        });
      } else if (gestion.flag_realizado == 0) {
        gestion.flag_realizado = 1;
        gestion.fecha_realizado = moment().format()
        gestion.id_usuario_realizado = appSettings.userId;
        this.gestionesService.realizarGestion(gestion, gestion.id).toPromise().then(()=>{
          this.volver();
        });
      }
    }else {}
  }
}
