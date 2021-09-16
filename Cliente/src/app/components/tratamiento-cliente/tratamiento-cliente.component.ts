import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {ClientesService} from "../../services/clientes/clientes.service";
import {Location} from "@angular/common";
import {appSettings} from "../../models/appSettings";
import {TratamientosService} from "../../services/tratamientos/tratamientos.service";
import {Clientes} from "../../models/clientes";

@Component({
  selector: 'app-tratamiento-cliente',
  templateUrl: './tratamiento-cliente.component.html',
  styleUrls: ['./tratamiento-cliente.component.css']
})
export class TratamientoClienteComponent implements OnInit {

  idCliente: any;
  tratamientos: any[];
  cliente: Clientes;
  keyword = 'nombre_tratamiento';
  notFound = "No se han encontrado resultados";
  boxQuantity = 0;
  dataList: any[] = [];
  selected: string[] = [];
  actual = "0";
  disabled = true;

  tratamiento = {
    id_cliente: undefined,
    id_tratamiento: undefined,
    fecha_inicio: "",
    fecha_fin: ""
  };

  constructor(private router: Router, private panelService: PanelService, private tratamientoService: TratamientosService,
              public location: Location, private activatedRoute: ActivatedRoute, private clienteService: ClientesService) {
    this.idCliente = activatedRoute.snapshot.params.id;
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
    tratamientoService.getAllTratamientosFathers().subscribe(res =>{
      this.dataList.push(res)
    });
    clienteService.getClientePorID(this.idCliente).subscribe(res =>{
      this.cliente = res;
    })
  }

  setSelected(tratamiento){
    this.tratamiento.id_tratamiento = tratamiento.id;
  }

  asignarTratamiento(){
    let id = this.selected.reverse()[0];
    id = id.split("|")[1];
    this.tratamiento.id_tratamiento = id;
    this.tratamiento.id_cliente = this.idCliente;
    this.clienteService.crearTratamientoCliente(this.tratamiento).subscribe(res =>{
      this.location.back();
    })
  }

  ngOnInit(): void {
  }

  chargeChild(event){
    this.disabled = false;

    this.selected = this.selected.filter(value => {
      return value.split("|")[0] < event.split("|")[0] && value.split("|")[0] != event.split("|")[0]
    });

    this.selected.push(event);

    this.selected = [...new Set(this.selected)];

    if(event.split("|")[0] < this.boxQuantity){
      this.boxQuantity = event.split("|")[0];

      let dataListCopy = [];
      let selectedCopy = [];

      this.dataList.forEach((value, index) => {
        if(index <= this.boxQuantity){
          dataListCopy.push(value);
        }
        else{
          return;
        }
      });
      this.selected.forEach((value, index) => {
        if(index <= this.boxQuantity){
          selectedCopy.push(value);
        }
        else{
          return;
        }
      });
      this.boxQuantity = dataListCopy.length-1;

      this.dataList = dataListCopy;
      this.selected = selectedCopy;
      //this.selected.push(event);

      this.tratamientoService.getAllTratamientosChilds(event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabled = true;
          this.boxQuantity++;
          this.dataList.push(res)
        }
      });
      this.actual = event;
    }
    else{
      this.tratamientoService.getAllTratamientosChilds(event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabled = true;
          this.boxQuantity++;
          this.dataList.push(res)
        }
        else{
          this.disabled = false;
        }
      })
    }
  }

}
