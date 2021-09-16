import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProveedoresService} from "../../services/proveedores/proveedores.service";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {Location} from "@angular/common";

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

  proveedor = {
    condicion_iva: "",
    cuit: "",
    direccion: "",
    email: "",
    id: 0,
    nombre_apellido: "",
    telefono: ""
  }

  constructor(private router: Router, private proveedoresService: ProveedoresService, private panelService: PanelService,
              private activatedRoute: ActivatedRoute, public location: Location) {
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
    proveedoresService.getProveedorPorID(activatedRoute.snapshot.params.id).subscribe(res =>{
      this.proveedor = <any>res;
    })
  }

  ngOnInit(): void {
  }

  guardarProveedor(proveedor){
    proveedor.nombre_apellido = proveedor.nombre_apellido.toUpperCase();
    this.proveedoresService.updateProveedor(proveedor,this.activatedRoute.snapshot.params.id).subscribe(res =>{
      if (res == true) {
        alert("Proveedor actualizado con éxito");
        this.router.navigate(['listaProveedores']);
      } else {
        alert("No se ha podido actualizar el proveedor");
      }
    })
  }

}
