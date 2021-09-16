import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {Location} from "@angular/common";
import {appSettings} from "../../models/appSettings";
import {ProveedoresService} from "../../services/proveedores/proveedores.service";
import * as moment from "moment-timezone";
import {CajaDiariaService} from "../../services/caja-diaria/caja-diaria.service";

@Component({
  selector: 'app-caja-diaria',
  templateUrl: './caja-diaria.component.html',
  styleUrls: ['./caja-diaria.component.css']
})
export class CajaDiariaComponent implements OnInit {

  proveedores: any[];
  keyword = 'nombre_apellido';
  notFound = "No se han encontrado resultados";
  caja = {
    descripcion: "",
    monto: 0.0,
    fecha: "",
    tipo: "",
    id_proveedor: ""
  }


  constructor(private router: Router, private panelService: PanelService, private proveedorService : ProveedoresService,
              public location: Location, private cajaService: CajaDiariaService) {
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
    proveedorService.getProveedores().subscribe(res =>{
      this.proveedores = res;
    })
  }

  ingresoCaja(){
    this.caja.fecha = moment().toISOString();
    this.cajaService.insertarCaja(this.caja).subscribe(res =>{
      if(res==true){
        alert('Se ha registrado la operación');
        this.location.back();
      }
      else{
        alert('Error al registrar operación');
      }
    })
  }

  ngOnInit(): void {
  }

}
