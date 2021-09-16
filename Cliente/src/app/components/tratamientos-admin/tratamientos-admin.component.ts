import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {Location} from "@angular/common";
import {appSettings} from "../../models/appSettings";
import {TratamientosService} from "../../services/tratamientos/tratamientos.service";
import {Tratamiento} from '../../models/tratamiento';

@Component({
  selector: 'app-tratamientos-admin',
  templateUrl: './tratamientos-admin.component.html',
  styleUrls: ['./tratamientos-admin.component.css']
})
export class TratamientosAdminComponent implements OnInit {

  selected: number = null;
  inputs: Tratamiento[] = [
    {
      nombre_tratamiento: "",
      fk_tratamiento: null
    }
  ];
  tratamientos: any[];
  tratamientoEdit = {
    id: "",
    nombre_tratamiento:""
  };

  tratamiento = {
    id: "",
    nombre_tratamiento: ""
  }

  tratamientoDelete: any = undefined;

  nombreEditado: "";
  keyword = 'nombre_tratamiento';
  notFound = "No se han encontrado resultados";


  constructor(private router: Router, private panelService: PanelService, private tratamientoService: TratamientosService,
              public location: Location) {
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
    tratamientoService.getAllTratamientos().subscribe(res =>{
      this.tratamientos = res;
    })
  }

  ngOnInit(): void {
  }


  copiarNombre(tratamientoSelected){
    this.nombreEditado = tratamientoSelected.nombre_tratamiento;
    this.tratamientoEdit.nombre_tratamiento = tratamientoSelected;
    this.tratamientoEdit.id = tratamientoSelected.id;
  }

  crearTratamiento(){
    this.tratamiento.nombre_tratamiento = this.tratamiento.nombre_tratamiento.toUpperCase();
    if(confirm("Esta seguro de que desea crear un tratamiento?")) {
      this.inputs = this.inputs.filter(value => (value.nombre_tratamiento.trim()) != "");
      this.inputs.map(value => {
        value.fk_tratamiento = this.selected;
        value.nombre_tratamiento = value.nombre_tratamiento.toUpperCase();
      });
      this.tratamientoService.crearTratamiento(this.inputs).toPromise().then(() =>{
        this.tratamientoService.getAllTratamientos().subscribe(data =>{
          this.tratamientos = data;
        });
        this.inputs = [
          {
            nombre_tratamiento: "",
            fk_tratamiento: null
          }
        ]
      });
    }
    else{}
  }

  editarTratamiento(){
    if(confirm("Esta seguro de que desea cambiar el nombre del tratamiento seleccionado?")){
      this.tratamientoEdit.nombre_tratamiento = this.nombreEditado.toUpperCase();
      this.tratamientoService.updateTratamiento(this.tratamientoEdit.id,this.tratamientoEdit).subscribe(res =>{
        window.location.reload();
      })
    }else{}
  }

  deleteTratamiento(){
    if(confirm("Esta seguro de que desea cambiar el nombre del tratamiento seleccionado?")){
      this.tratamientoService.deleteTratamiento(this.tratamientoDelete.id).subscribe(res =>{
        window.location.reload();
      })
    }else{}
  }

  addTratamiento(){
    this.inputs.push({
      nombre_tratamiento: "",
      fk_tratamiento: null
    })
  }

  delete(input: Tratamiento){
    this.inputs = this.inputs.filter( function( e ) {
      return e !== input;
    } );
  }

  validateTratamientoCreation(){
    if (this.selected == 0 && this.inputs[0].nombre_tratamiento == '' ){
      return true;
    } else if (this.selected != 0 && this.inputs[0].nombre_tratamiento == '') {
      return true;
    } else if (this.selected == 0 && this.inputs[0].nombre_tratamiento != '') {
      return false;
    } else {
      return false;
    }
  }
}
