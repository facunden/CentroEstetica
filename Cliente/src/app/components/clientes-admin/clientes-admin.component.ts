import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ClientesService} from "../../services/clientes/clientes.service";
import {Clientes} from "../../models/clientes";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import * as moment from "moment-timezone";
import {ReferidosService} from "../../services/referidos/referidos.service";

@Component({
  selector: 'app-clientes-admin',
  templateUrl: './clientes-admin.component.html',
  styleUrls: ['./clientes-admin.component.css']
})
export class ClientesAdminComponent implements OnInit {

  cliente: Clientes = {
    id: "",
    dni: undefined,
    telefono: undefined,
    direccion: "",
    nombre_cliente: "",
    email: "",
    telefono_aux: undefined,
    fecha_nacimiento: "",
    referido: "",
    fk_referido: 1
  }

  tratamiento = {
    id_cliente: undefined,
    id_tratamiento: undefined,
    fecha_inicio: "",
    fecha_fin: ""
  };

  referidos: any[];
  notFound = "No se han encontrado resultados"
  keyword = 'nombre_referido';
  hasRefer = false;

  constructor(private router: Router, private clientesService: ClientesService,
              private panelService: PanelService, private referidosService: ReferidosService) {
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
    referidosService.getAllRefers().subscribe(res => {
      this.referidos = res;
    })
  }

  ngOnInit() {
  }

  CrearCliente(){
    this.cliente.direccion = this.cliente.direccion.toUpperCase();
    this.cliente.nombre_cliente = this.cliente.nombre_cliente.toUpperCase();
    if(confirm("Desea crear un nuevo cliente?")) {
      this.clientesService.CrearCliente(this.cliente).subscribe(res => {
        if (res) {
          this.tratamiento.fecha_fin = moment().toISOString(true);
          this.tratamiento.fecha_inicio = moment().toISOString(true);
          this.tratamiento.id_cliente = res['insertId'];
          this.tratamiento.id_tratamiento = 8;
          this.clientesService.crearTratamientoCliente(this.tratamiento).toPromise().then(res =>{
            alert("Cliente creado con éxito");
          }).then(() =>{
            this.router.navigate(['tratamiento/'+this.tratamiento.id_cliente]);
          }).catch(e =>{
            alert("No se ha podido crear el cliente");
          })
        } else {
          alert("No se ha podido crear el cliente");
        }
      })
    }else{}
  }

}
