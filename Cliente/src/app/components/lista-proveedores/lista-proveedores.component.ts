import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProveedoresService} from "../../services/proveedores/proveedores.service";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {

  proveedores: any[];
  searchString: any;
  p: number = 1;
  isLoaded: boolean = false

  constructor(public router: Router, private proveedoresService: ProveedoresService, private panelService: PanelService) {
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
    proveedoresService.getProveedores().subscribe(res =>{
      this.proveedores = res;
      this.proveedores = this.proveedores.sort((a, b) => a.nombre_apellido.localeCompare(b.nombre_apellido));
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }


}
