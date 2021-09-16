import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {TiposGestiones} from "../../models/tiposGestiones";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {Panel} from "../../models/panel";
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-crear-tipo-gestion',
  templateUrl: './tipo-gestion-admin.component.html',
  styleUrls: ['./tipo-gestion-admin.component.css']
})
export class TipoGestionAdminComponent implements OnInit {

  tiposDeGestion: any;

  inputs: TiposGestiones[] = [
    {
      id: 0,
      nombre_gestion: "",
      id_categoria_gestion: 0,
      realizado_automatico: 0,
      es_numerica: 0,
      es_tabulada: 0,
      crea_evento_calendar: 0,
      crea_movimiento_caja: 0,
      tiene_nota: 0
    }
  ];

  inputsDel: TiposGestiones[] = [
    {
      id: 0,
      nombre_gestion: "",
      id_categoria_gestion: 0,
      realizado_automatico: 0,
      es_numerica: 0,
      es_tabulada: 0,
      crea_evento_calendar: 0,
      crea_movimiento_caja: 0,
      tiene_nota: 0
    }
  ];

  selected: number = 0;

  editor = ClassicEditor;
  editorGestionSelected = ClassicEditor;

  tipoDeGestionDelSelected: any;

  tipoDeGestionEditSelected = {
    id: 0,
    nombre_gestion: "",
    id_categoria_gestion: 0,
    realizado_automatico: 0,
    es_numerica: 0,
    es_tabulada: 0,
    crea_evento_calendar: 0,
    crea_movimiento_caja: 0,
    notas: "",
    tiene_nota: 0,
    deshabilitada: 0
  };

  gestionBase = {
    id: 0,
    nombre_gestion: "",
    id_categoria_gestion: 0,
    realizado_automatico: 0,
    es_numerica: 0,
    es_tabulada: 0,
    crea_evento_calendar: 0,
    crea_movimiento_caja: 0,
    notas: "",
    tiene_nota: 0,
    deshabilitada: 0
  };

  notFound = "No se han encontrado resultados";
  keyword = 'nombre_gestion'

  tipoDeGestion = {
    nombre_gestion: "",
    id_categoria_gestion: 0,
    realizado_automatico: 0,
    es_numerica: 0,
    es_tabulada: 0,
    crea_evento_calendar: 0,
    crea_movimiento_caja: 0,
    fk_tipo_gestion: 0,
    tiene_nota: 0,
    notas: '',
    deshabilitada: 0
  };

  tipoDeGestionSelected = {
    nombre_gestion: "",
    id_categoria_gestion: 0,
    realizado_automatico: 0,
    es_numerica: 0,
    es_tabulada: 0,
    crea_evento_calendar: 0,
    crea_movimiento_caja: 0,
    fk_tipo_gestion: 0,
    tiene_nota: 0,
    notas: ' '
  };

  categoriasGestiones: [] = [];

  categoriaSelected = {
    id: 0
  };
  categoriaEditSelected = {
    id: 0
  };

  nombreEditado;
  usuario: Panel;

  boxQuantity = 0;
  boxQuantityDel = 0;
  boxQuantityEdit = 0;
  dataList: any[] = [];
  selectedG: string[] = [];
  dataListDel: any[] = [];
  selectedGDel: string[] = [];
  dataListEdit: any[] = [];
  selectedGEdit: string[] = [];
  actual = "0";
  actualDel = "0";
  actualEdit = "0";
  disabled = true;
  disabledDel = true;
  disabledEdit = true;
  staticCategory: boolean = false;


  constructor(private router: Router, private gestionesService: GestionesService, private panelService: PanelService) {
    panelService.verifyToken().subscribe(() => {
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
    this.loadData();
  }

  ngOnInit() {
  }

  loadData(){
    this.gestionesService.getGestionesPorTipoAll().subscribe(res => {
      this.tiposDeGestion = res;
    });
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.gestionesService.getGestionesPorTipoAllFathers(this.usuario.id).subscribe(res =>{
      this.dataList.push(res)
      this.dataListDel.push(res)
      this.dataListEdit.push(res)
    });
    this.gestionesService.getCategoriasTiposGestion().subscribe(res =>{
      this.categoriasGestiones = <any>res;
    })
  }

  crearTipoGestion(){
    this.tipoDeGestion.nombre_gestion = this.tipoDeGestion.nombre_gestion.toUpperCase();
    this.tipoDeGestion['id'] = 0;
    this.tipoDeGestion.id_categoria_gestion = this.categoriaSelected.id;
    this.tipoDeGestion.fk_tipo_gestion = this.tipoDeGestionSelected['id'];
    if(confirm("Esta seguro de que desea crear la tarea seleccionada?")) {
      this.gestionesService.crearTipoGestion(this.tipoDeGestion).then(() =>{
        location.reload();
      });
    }
    else{}
  }


  editarTipoGestion(){
    if(confirm("Esta seguro de que desea cambiar el nombre la tarea seleccionada?")){
      this.tipoDeGestionEditSelected.nombre_gestion = this.nombreEditado;
      delete this.tipoDeGestionEditSelected['id_usuario'];
      this.tipoDeGestionEditSelected.nombre_gestion = this.tipoDeGestionEditSelected.nombre_gestion.toUpperCase();
      this.gestionesService.updateTipoGestion(this.tipoDeGestionEditSelected,this.tipoDeGestionEditSelected.id).subscribe(res =>{
        location.reload();
      });
    }else{}
  }

  borrarTipoGestion(){
    if(confirm("Esta seguro de que desea eliminar la tarea seleccionada?")){
      this.gestionesService.deleteTipoGestion(this.tipoDeGestionDelSelected.id).toPromise().catch(error=>{
        if(error.status == 500){
          alert(error.error);
        }
      }).finally(()=>{
        location.reload();
      })
    }else{}
  }

  copiarNombre(gestionSelected){
    this.nombreEditado = gestionSelected.nombre_gestion;
    this.tipoDeGestionEditSelected = gestionSelected;
  }

  addTipoGestion(){
    this.inputs.push({
      id: 0,
      nombre_gestion: "",
      id_categoria_gestion: 0,
      realizado_automatico: 0,
      es_numerica: 0,
      es_tabulada: 0,
      crea_evento_calendar: 0,
      crea_movimiento_caja: 0,
      tiene_nota: 0,
    })
  }

  deleteTipoGestion(input){
    this.inputs = this.inputs.filter( function( e ) {
      return e !== input;
    } );
  }

  setTipoGestionSelected(gestion){
    this.tipoDeGestionSelected = this.tiposDeGestion.find(value => value.id == gestion);
    if(this.boxQuantity==0) {
      this.categoriaSelected.id = this.tipoDeGestionSelected.id_categoria_gestion;
      this.tipoDeGestion.realizado_automatico = this.tipoDeGestionSelected.realizado_automatico;
      this.tipoDeGestion.crea_evento_calendar = this.tipoDeGestionSelected.crea_evento_calendar;
      this.tipoDeGestion.es_numerica = this.tipoDeGestionSelected.es_numerica;
      this.tipoDeGestion.crea_movimiento_caja = this.tipoDeGestionSelected.crea_movimiento_caja;
      this.tipoDeGestion.crea_movimiento_caja = this.tipoDeGestionSelected.crea_movimiento_caja;
      this.staticCategory = true;
    }
  }

  chargeChild(event){
    this.disabled = false;
    this.selectedG = this.selectedG.filter(value => {
      return value.split("|")[0] < event.split("|")[0] && value.split("|")[0] != event.split("|")[0]
    });

    this.selectedG.push(event);

    this.selectedG = [...new Set(this.selectedG)];

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
      this.selectedG.forEach((value, index) => {
        if(index <= this.boxQuantity){
          selectedCopy.push(value);
        }
        else{
          return;
        }
      });
      this.boxQuantity = dataListCopy.length-1;

      this.dataList = dataListCopy;
      this.selectedG = selectedCopy;
      //this.selected.push(event);

      this.gestionesService.getGestionesPorTipoAllChilds(this.usuario.id, event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabled = true;
          this.boxQuantity++;
          this.dataList.push(res)
        }
        else{
          let newArray = this.dataList[this.dataList.length-1].filter(value => {
            return value.id == event.split("|")[1]
          })
        }
      });
      this.actual = event;
    }
    else{
      this.gestionesService.getGestionesPorTipoAllChilds(this.usuario.id, event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabled = true;
          this.boxQuantity++;
          this.dataList.push(res)
        }
      })
    }
  }

  chargeChildDel(event){
    this.disabled = false;
    this.selectedGDel = this.selectedGDel.filter(value => {
      return value.split("|")[0] < event.split("|")[0] && value.split("|")[0] != event.split("|")[0]
    });

    this.selectedGDel.push(event);

    this.selectedGDel = [...new Set(this.selectedGDel)];

    if(event.split("|")[0] < this.boxQuantityDel){
      this.boxQuantityDel = event.split("|")[0];

      let dataListCopy = [];
      let selectedCopy = [];

      this.dataListDel.forEach((value, index) => {
        if(index <= this.boxQuantityDel){
          dataListCopy.push(value);
        }
        else{
          return;
        }
      });
      this.selectedGDel.forEach((value, index) => {
        if(index <= this.boxQuantityDel){
          selectedCopy.push(value);
        }
        else{
          return;
        }
      });
      this.boxQuantityDel = dataListCopy.length-1;

      this.dataListDel = dataListCopy;
      this.selectedGDel = selectedCopy;
      //this.selected.push(event);

      this.gestionesService.getGestionesPorTipoAllChilds(this.usuario.id, event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabledDel = true;
          this.boxQuantityDel++;
          this.dataListDel.push(res)
        }
        else{
          let newArray = this.dataListDel[this.dataListDel.length-1].filter(value => {
            return value.id == event.split("|")[1]
          })
        }
      });
      this.actualDel = event;
    }
    else{
      this.gestionesService.getGestionesPorTipoAllChilds(this.usuario.id, event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabledDel = true;
          this.boxQuantityDel++;
          this.dataListDel.push(res)
        }
      })
    }
  }

  chargeChildEdit(event,gestion){
    console.log(gestion)
    this.tipoDeGestionEditSelected = gestion
    this.disabled = false;
    if(event.split("|")[0] == 0){
     this.tipoDeGestionEditSelected.id_categoria_gestion = gestion.id_categoria_gestion;
    }
    this.selectedGEdit = this.selectedGEdit.filter(value => {
      return value.split("|")[0] < event.split("|")[0] && value.split("|")[0] != event.split("|")[0]
    });

    this.selectedGEdit.push(event);

    this.selectedGEdit = [...new Set(this.selectedGEdit)];

    if(event.split("|")[0] < this.boxQuantityEdit){
      this.boxQuantityEdit = event.split("|")[0];

      let dataListCopy = [];
      let selectedCopy = [];

      this.dataListEdit.forEach((value, index) => {
        if(index <= this.boxQuantityEdit){
          dataListCopy.push(value);
        }
        else{
          return;
        }
      });
      this.selectedGEdit.forEach((value, index) => {
        if(index <= this.boxQuantityEdit){
          selectedCopy.push(value);
        }
        else{
          return;
        }
      });
      this.boxQuantityEdit = dataListCopy.length-1;

      this.dataListEdit = dataListCopy;
      this.selectedGEdit = selectedCopy;
      //this.selected.push(event);

      this.gestionesService.getGestionesPorTipoAllChilds(this.usuario.id, event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabledEdit = true;
          this.boxQuantityEdit++;
          this.dataListEdit.push(res)
        }
        else{
          let newArray = this.dataListEdit[this.dataListEdit.length-1].filter(value => {
            return value.id == event.split("|")[1]
          })
        }
      });
      this.actualEdit = event;
    }
    else{
      this.gestionesService.getGestionesPorTipoAllChilds(this.usuario.id, event.split("|")[1]).subscribe((res)=>{
        if(res.length != 0){
          this.disabledEdit = true;
          this.boxQuantityEdit++;
          this.dataListEdit.push(res)
        }
      })
    }
  }

}
