import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {ProveedoresService} from "../../services/proveedores/proveedores.service";
import {Location} from "@angular/common";
import {CajaDiariaService} from "../../services/caja-diaria/caja-diaria.service";
import {appSettings} from "../../models/appSettings";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-lista-caja-diaria',
  templateUrl: './lista-caja-diaria.component.html',
  styleUrls: ['./lista-caja-diaria.component.css']
})
export class ListaCajaDiariaComponent implements OnInit {

  cajas: any;
  total = 0;
  p=1;
  fDesde: undefined;
  fHasta: undefined;
  usuario: any;
  cajasCopy: any;
  sorting: boolean = false;
  proveedores: any;
  isLoaded: boolean = false;
  filtProv: string = "";
  filtImp: string = "";
  filtOpt: string = "";

  @ViewChild('filtroImputacion') filtroImputacion: MatSelect;
  @ViewChild('filtroProveedor') filtroProveedor: MatSelect;
  @ViewChild('filtroMedioPago') filtroMedioPago: MatSelect;


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
    if (JSON.parse(localStorage.getItem('usuario')).flagManejoCaja!=1){
      alert('No tienes permiso para ingresar a esta sección');
      this.router.navigate(['panel'])
    }
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    cajaService.getCaja().toPromise().then(res =>{
      this.cajas = res;
      this.cajasCopy = res;
      this.montoTotal();
    }).then(() =>{
      proveedorService.getProveedores().subscribe(res =>{
        this.proveedores = res;
        this.isLoaded = true;
      })
    })
  }

  ngOnInit(): void {
  }

  montoTotal(){
    this.total = 0;
    this.cajas.map(caja =>{
      if(caja.tipo=='I'){
        this.total+=caja.monto;
      }else{
        this.total-=caja.monto;
      }
    })
  }

  filtrarEntreFechas(){
    this.cajas = this.cajasCopy;
    this.cajas = this.cajas.filter(caja => new Date(caja.fecha.toString().slice(0, -1)) >= new Date(this.fDesde) && new Date(caja.fecha.toString().slice(0, -1)) <= new Date(this.fHasta));
    this.montoTotal();
  }


  filtrar(){
    this.cajas = this.cajasCopy;
    if(this.fDesde != undefined && this.fHasta != undefined){
      this.filtrarEntreFechas();
    }
    if(this.filtProv != "") {
      this.cajas = this.cajas.filter(caja => caja.nombre_apellido == this.filtProv)
    }
    if(this.filtImp != "") {
      this.cajas = this.cajas.filter(caja => caja.tipo == this.filtImp)
    }
    if(this.filtImp != "" && this.filtProv != ""){
      this.cajas = this.cajas.filter(caja => caja.nombre_apellido == this.filtProv && caja.tipo == this.filtImp)
    }
    if(this.filtImp == "E" || this.filtImp == "") {
      this.filtroMedioPago.value= '';
    }
    this.montoTotal();
  }

  getAll(){
    this.cajaService.getCaja().subscribe( res =>{
      this.cajas = res;
      this.fHasta = undefined;
      this.fDesde = undefined;
      this.filtroImputacion.value = "";
      this.filtroProveedor.value = "";
      this.filtOpt = "";
      this.filtImp = "";
      this.filtProv = "";
      this.filtroMedioPago.value = "";
      this.montoTotal();
    })
  }

  deleteMovimiento(id){
    if(this.usuario.id!=2){
      alert('Usted no tiene permisos para realizar esta operacion')
    }else{
      if(confirm('Esta seguro que desea eliminar este gasto?')){
        this.cajaService.deleteCaja(id).subscribe(res =>{
          if(res){
            alert('Gasto eliminado con éxito');
            this.cajaService.getCaja().subscribe(res =>{
              this.cajas = res;
              this.montoTotal();
            })
          }
          else{
            alert('Error al eliminar el gasto')
          }
        })
      }
    }
  }

  sortBy(sorter: string){
    if(sorter == 'MONTO'){
      if(this.sorting){
        this.cajas = this.cajas.sort((a,b) => a.monto - b.monto);
        this.sorting = !this.sorting;
      } else {
        this.cajas = this.cajas.sort((a,b) => b.monto - a.monto);
        this.sorting = !this.sorting;
      }
    }
    if(sorter == 'FECHA'){
      if(this.sorting){
        this.cajas = this.cajas.sort((a,b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
        this.sorting = !this.sorting;
      } else {
        this.cajas = this.cajas.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.sorting = !this.sorting;
      }
    }
    if(sorter == 'PROVEEDOR'){
      if(this.sorting){
        this.cajas = this.cajas.sort((a,b) => {
          if(a.nombre_apellido < b.nombre_apellido) { return -1; }
          if(a.nombre_apellido > b.nombre_apellido) { return 1; }
          return 0;
        });
        this.sorting = !this.sorting;
      } else {
        this.cajas = this.cajas.sort((a,b) => {
          if(a.nombre_apellido > b.nombre_apellido) { return -1; }
          if(a.nombre_apellido < b.nombre_apellido) { return 1; }
          return 0;
        });
        this.sorting = !this.sorting;
      }
    }
    this.montoTotal();
  }

  findByOption(option, fromUI?: boolean) {
    if(option == "" && this.fDesde != undefined && this.fHasta != undefined){
      this.filtrarEntreFechas();
    }
    if(option == "" && this.fDesde == undefined && this.fHasta == undefined){
      this.getAll();
      return;
    }
    if(fromUI){
      if(this.fDesde != undefined && this.fHasta != undefined){
        this.filtrarEntreFechas();
      }
      else {
        this.cajas = this.cajasCopy;
      }
    }
    this.filtImp = 'I';
    this.filtOpt = option;
    let arr = [];
    this.cajas.map((c,index) => {
      if(c.descripcion.split('-')[0].trim() == 'COBRO'){
        if(c.descripcion.split('-')[1].trim() === option){
          arr.push(this.cajas[index])
        }
      }
    })
    this.cajas = arr;
    this.montoTotal();
  }

}
