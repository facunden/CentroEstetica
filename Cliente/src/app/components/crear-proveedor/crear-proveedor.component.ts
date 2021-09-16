import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {ProveedoresService} from "../../services/proveedores/proveedores.service";

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {

  proveedor = {
    id: undefined,
    nombre_apellido: "",
    direccion: "",
    cuit: "",
    condicion_iva: "",
    telefono: "",
    email: ""
  }

  constructor(private router: Router, private proveedoresService: ProveedoresService, private panelService: PanelService) {
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
  }

  ngOnInit() {
  }

  crearProveedor(proveedor){
    this.proveedoresService.crearProveedor(proveedor).subscribe(res =>{
      if (res == true) {
        alert("Proveedor creado con éxito");
        this.router.navigate(['home']);
      } else {
        alert("No se ha podido crear el proveedor");
      }
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
