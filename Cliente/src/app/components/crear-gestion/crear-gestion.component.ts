import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {TiposGestiones} from "../../models/tiposGestiones";
import {Panel} from "../../models/panel";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import * as moment from "moment-timezone";
import {CalendarioService} from "../../services/calendario/calendario.service";
import {ClientesService} from "../../services/clientes/clientes.service";
import {Clientes} from "../../models/clientes";
import {CajaDiariaService} from "../../services/caja-diaria/caja-diaria.service";


@Component({
  selector: 'app-crear-gestion',
  templateUrl: './crear-gestion.component.html',
  styleUrls: ['./crear-gestion.component.css']
})
export class CrearGestionComponent implements OnInit {

  tiposDeGestion: TiposGestiones[] = [];
  usuario: Panel;
  keyword = 'nombre_gestion';
  gestionSelected: TiposGestiones = {
    realizado_automatico: undefined,
    nombre_gestion: "",
    id_categoria_gestion: undefined,
    es_numerica: undefined,
    es_tabulada: undefined,
    tiene_nota: 0,
    crea_movimiento_caja: 0,
    crea_evento_calendar:0,
    id: 0
  };
  boxQuantity = 0;
  dataList: any[] = [];
  selected: string[] = [];
  actual = "0";
  disabled = true;

  observacionNum: boolean = false;
  tareaProgramada: boolean = false;

  gestionBase: TiposGestiones = {
    realizado_automatico: undefined,
    nombre_gestion: "",
    id_categoria_gestion: undefined,
    es_numerica: undefined,
    es_tabulada: undefined,
    tiene_nota: 0,
    crea_evento_calendar:0,
    crea_movimiento_caja: 0,
    id: 0
  };

  notFound = "No se han encontrado resultados"

  gestion: any = {
    id_tipo_de_gestion: undefined,
    id_usuario: undefined,
    fecha_carga: "",
    fecha_programada: "",
    fecha_realizado: null,
    observacion: "",
    obs_numerica: undefined,
    id_cliente: undefined,
    flag_realizado: undefined,
    id_tratamiento: undefined,
    gestion_concat: undefined
  };

  duracionEvento: number = 1;

  event = {
    start:{
      dateTime:"",
      timeZone: "America/Argentina/Mendoza"
    },
    end:{
      dateTime:"",
      timeZone: "America/Argentina/Mendoza"
    },
    sendUpdates: true,
    summary: "",
    description: "",
    attendees:[{
      email: ""
    }],
    reminders:{
      useDefault: 'false',
      overrides: [
        { method: 'email', minutes: 24 * 60},
        { method: 'popup', minutes: 10},
      ]
    }
  };

  observacionesTabuladas: any;
  observacionTabuladaSelected: any;
  cliente: Clientes;
  idTratamiento: any;

  constructor(private router: Router, private gestionesService: GestionesService, private panelService: PanelService,
              private calendarService: CalendarioService, private clientesService: ClientesService, private cajaService: CajaDiariaService) {
    panelService.verifyToken().subscribe(() => {
    },error => {
      if(error){
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    this.gestion.id_cliente = router.getCurrentNavigation().extras[0];
    this.idTratamiento = router.getCurrentNavigation().extras[1];
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    gestionesService.getGestionesPorTipo(this.usuario.id).subscribe(res => {
      this.tiposDeGestion = res;
    });
    clientesService.getClientePorID(this.gestion.id_cliente).subscribe(res =>{
      this.cliente = res;
    });
    if(JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId){
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
    gestionesService.getGestionesPorTipoAllFathers(this.usuario.id).subscribe(res =>{
      this.dataList.push(res)
    });
  }

  ngOnInit() {

  }

  volver(){
    this.router.navigate(['gestiones/'+this.gestion.id_cliente+'/'+this.idTratamiento])
  }

  setTipoGestionSelected(gestion){
    this.gestionSelected = this.tiposDeGestion.find(value => value.id == gestion);
  }

  crearGestion() {
    if(this.gestion.fecha_realizado != null) {
      this.gestion.id_usuario_realizado = this.gestion.id_usuario
    }
    if(this.gestionSelected.es_numerica == 0 ){
      this.gestion.obs_numerica = null;
    }
    this.gestion.id_usuario = this.usuario.id;
    if(this.gestionSelected.realizado_automatico){
      this.gestion.flag_realizado=1;
      this.gestion.fecha_carga = moment().format()
      this.gestion.fecha_programada = moment().format()
      if(this.gestion.fecha_realizado == null){
        this.gestion.fecha_realizado = moment().format()
      }
      this.gestion.id_usuario_realizado = this.gestion.id_usuario;
    }else {
      this.gestion.flag_realizado=0;
      this.gestion.fecha_carga = moment().format();
    }

    let data: string[] = [];
    this.dataList.forEach((value, index) => {
      data.push(value.find((valueInt)=>{
        return valueInt.id == this.selected[index].split("|")[1]
      }).nombre_gestion)
    });

    let id = this.selected.reverse()[0];
    id = id.split("|")[1];

    this.gestion.id_tipo_de_gestion = id;
    this.gestion.obs_tabulada = this.observacionTabuladaSelected;
    this.gestion.id_tratamiento = this.idTratamiento;

    this.gestion.gestion_concat = data.join(" - ");
    this.gestionesService.crearGestion(this.gestion).toPromise().then(res =>{
      if(this.gestionSelected.crea_evento_calendar){
      this.event.summary = this.gestionSelected.nombre_gestion+ ' - ' + this.cliente.nombre_cliente.toUpperCase()+ ' - ID: ' + this.cliente.id;
      this.event.start.dateTime = moment(this.gestion.fecha_programada).toISOString(true);
      this.event.end.dateTime = moment(this.event.start.dateTime).add(this.duracionEvento,"hour").toISOString(true);
      this.event.attendees[0].email=this.cliente.email;
      this.calendarService.insertEvent(this.event).toPromise().then(() =>{
        this.router.navigate(['gestiones/'+this.gestion.id_cliente+'/'+this.idTratamiento]);
      }).catch(e => {
        if (e.status == 401) {
          let data: any = {access_token:""}
          this.calendarService.refreshToken().toPromise().then(res =>{
            data = res;
            localStorage.setItem('apiToken',data.access_token);
          }).then(() =>{
            this.calendarService.insertEvent(this.event).toPromise().then(()=>{
              this.router.navigate(['gestiones/'+this.gestion.id_cliente+'/'+this.idTratamiento]);
            });
          })
        }
      });
      }
      if(this.gestionSelected.crea_movimiento_caja==1){
        let caja = {
          descripcion: (this.gestion.gestion_concat + ' - ' + this.cliente.nombre_cliente).toUpperCase(),
          monto: this.gestion.obs_numerica,
          fecha: moment().toISOString(true),
          tipo: "I",
          id_proveedor: "3"
        }
        this.cajaService.insertarCaja(caja).subscribe(res =>{
        })
      }
    }).then(() =>{
      this.router.navigate(['gestiones/'+this.gestion.id_cliente+'/'+this.idTratamiento]);
    });
  }

  chargeChild(event){
    this.disabled = false;
    this.observacionNum = false;
    this.tareaProgramada = false;
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
          if(newArray[0].es_numerica == 1){
            this.observacionNum = true;
          }
          else {
            this.observacionNum = false;
          }
          if(newArray[0].realizado_automatico == 0){
            this.tareaProgramada = true;
          }
          else {
            this.tareaProgramada = false;
          }
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
        else{
          this.disabled = false;
          let newArray = this.dataList[this.dataList.length-1].filter(value => {
            return value.id == event.split("|")[1]
          })
          if(newArray[0].es_numerica == 1){
            this.observacionNum = true;
          }
          else {
            this.observacionNum = false;
          }
          if(newArray[0].realizado_automatico == 0){
            this.tareaProgramada = true;
          }
          else {
            this.tareaProgramada = false;
          }
        }
      })
    }
  }


}
