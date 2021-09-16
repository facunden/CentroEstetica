import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {Gestiones} from "../../models/gestiones";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientesService} from "../../services/clientes/clientes.service";
import {Clientes} from "../../models/clientes";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {TratamientosService} from "../../services/tratamientos/tratamientos.service";
import {MatDialog} from "@angular/material/dialog";
import {DetalleGestionComponent} from "../detalle-gestion/detalle-gestion.component";


@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})
export class GestionesComponent implements OnInit {

  gestiones: Gestiones[];

  @ViewChild('closeModal') private closeModal: ElementRef;

  cliente: Clientes;
  editCliente: Clientes;
  isLoaded: boolean = false;
  idCliente: number;
  tratamiento: any;
  permiso: any = {};

  constructor(private gestionesService: GestionesService, private router: Router, private activatedRoute: ActivatedRoute,
              private clientesService: ClientesService,private panelService: PanelService, private tratamientoService: TratamientosService,
              public dialog: MatDialog) {
    panelService.verifyToken().subscribe(() => {
    },error => {
      if(error){
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    this.idCliente = <any>activatedRoute.snapshot.url[1].path
    this.permiso.idCliente = activatedRoute.snapshot.url[1].path;
    this.permiso.idUsuario = localStorage.getItem('userId');
    this.permiso.id_tratamiento = activatedRoute.snapshot.url[2].path;
    this.getData();
    if(JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId){
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
  }

  getData(){
    this.gestionesService.getGestionesPorIDCliente(this.permiso).toPromise().then(res => {
      this.gestiones = res;
      // this.gestiones.sort((a, b) => {return a.fecha_programada < b.fecha_programada ? 1 : -1})
      this.gestiones.sort(function (a: any, b: any) {
        let c: any;
        let d: any;
        (a.flag_realizado) ? c = new Date(a.fecha_realizado).getTime() : c = new Date(a.fecha_programada).getTime();
        (b.flag_realizado) ? d = new Date(b.fecha_realizado).getTime() : d = new Date(b.fecha_programada).getTime();
        return d - c;
      });
    }).then(() =>{
      this.clientesService.getClientePorID(this.idCliente).toPromise().then(res => {
        this.cliente = res;
      }).then(() =>{
        this.tratamientoService.getTratamientoById(this.permiso.id_tratamiento).subscribe(res =>{
          this.tratamiento = res;
          this.isLoaded = true;
        })
      })
    });
  }

  openDialog(gestion) {
    const dialogRef = this.dialog.open(DetalleGestionComponent, {
      width: '95%',
      maxWidth: '500px',
      height: '80%',
      maxHeight: 'auto',
      position: {top: '95px'},
      data: {id: gestion.id}
    }).afterClosed().subscribe(() =>{
      this.getData();
    })
  }


  eliminarGestion(id_gestion) {
    if (confirm("Está seguro de que quiere eliminar la gestion seleccionada?")) {
      this.gestionesService.deleteGestionPorID(id_gestion).toPromise().then(() => {
        this.gestionesService.getGestionesPorIDCliente(this.permiso).subscribe(res => {
          this.gestiones = res;
          this.gestiones.sort((a, b) => {
            return a.fecha_programada < b.fecha_programada ? 1 : -1
          })
        });
      });
    } else {
    }
  }

  estadoGestion(gestion){
    if(gestion.flag_realizado == 1 ){
      return 'realizado'
    }
    if(gestion.flag_realizado == 0 ){
      return 'programado'
    }
  }

  nuevaGestion() {
    this.router.navigate(['crearGestion'], <any>[this.idCliente,this.permiso.id_tratamiento]);
  }


  ngOnInit() {
  }

}
