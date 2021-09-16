import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {appSettings} from "../../models/appSettings";
import {ReferidosService} from "../../services/referidos/referidos.service";

@Component({
  selector: 'app-referidos-admin',
  templateUrl: './referidos-admin.component.html',
  styleUrls: ['./referidos-admin.component.css']
})
export class ReferidosAdminComponent implements OnInit {

  nombre_referido = "";
  nombre_editado = "";
  referidoSelected: any;
  deleteId: number = 0;

  referidos: any[];
  notFound = "No se han encontrado resultados"
  keyword = 'nombre_referido';


  constructor(private router: Router, private panelService: PanelService, private referidosService: ReferidosService,
              public location: Location,public dialog: MatDialog) {
    panelService.verifyToken().subscribe(res => {
    }, error => {
      if (error) {
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    if (JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId) {
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
    referidosService.getAllRefers().subscribe(res => {
      referidosService.getAllRefers().subscribe(res => {
        this.referidos = res;
      })
    })
  }

  ngOnInit(): void {
  }

  copiarNombre(nombre){
    this.nombre_editado = nombre
  }

  crearReferido(){
    this.nombre_referido = this.nombre_referido.toUpperCase();
    this.referidosService.createRefer({nombre_referido: this.nombre_referido}).subscribe(res => {
      if(res) {
        alert('Referido creado con éxito');
        location.reload();
      } else {
        alert('Error al crear referido');
        location.reload();
      }
    })
  }

  updateReferido() {
    this.referidoSelected.nombre_referido = this.nombre_editado.toUpperCase();
    this.referidosService.updateRefer(this.referidoSelected.id,{nombre_referido: this.referidoSelected.nombre_referido}).subscribe(res => {
      if(res) {
        alert('Referido actualizado con éxito');
        location.reload();
      } else {
        alert('Error al actualizar referido');
        location.reload();
      }
    })
  }

  deleteReferido(id) {
    this.referidosService.deleteRefer(id).subscribe(res => {
      if(res) {
        alert('Referido eliminado con éxito');
        location.reload();
      } else {
        alert('Error al eliminar referido');
        location.reload();
      }
    })
  }

}
