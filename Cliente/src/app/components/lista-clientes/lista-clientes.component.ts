import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {ClientesService} from "../../services/clientes/clientes.service";

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: any[];
  searchString: any;
  p: number = 1;
  isLoaded: boolean = false;

  constructor(public router: Router, private clienteService: ClientesService, private panelService: PanelService) {
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
    clienteService.getAllClientes().subscribe(res =>{
      this.clientes = res;
      this.clientes = this.clientes.sort((a, b) => a.nombre_cliente.localeCompare(b.nombre_cliente));
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }

}
