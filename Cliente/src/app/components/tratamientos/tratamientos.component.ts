import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {Location} from "@angular/common";
import {appSettings} from "../../models/appSettings";
import {ClientesService} from "../../services/clientes/clientes.service";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {ReferidosService} from "../../services/referidos/referidos.service";

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css']
})
export class TratamientosComponent implements OnInit {

  @ViewChild('closeModal') private closeModal: any;

  idCliente: any;
  tratamientos: any[];
  cliente: any;
  editCliente: any;
  isLoaded: boolean = false;
  observaciones: any;
  nuevaObservacion: any = {
    observacion: "",
    id_cliente: ""
  };
  cantidadObservaciones: number = 0;

  referidos: any[];
  notFound = "No se han encontrado resultados"
  keyword = 'nombre_referido';
  referidoSelected: any;

  constructor(private router: Router, private panelService: PanelService, private clientesServices: ClientesService,
              private location: Location, private activatedRoute: ActivatedRoute, private gestionesServices: GestionesService,
              private referidosService: ReferidosService) {
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
    clientesServices.getClientePorID(this.idCliente).toPromise().then(res => {
      this.cliente = res;
      this.editCliente = Object.create(res);
      if (this.editCliente.fecha_nacimiento) {
        this.editCliente.fecha_nacimiento = this.editCliente.fecha_nacimiento.split("T")[0];
      }
    }).then(() => {
      clientesServices.getTratamientoClientePorID(this.idCliente).toPromise().then(res => {
        this.tratamientos = res;
      }).then(() => {
        clientesServices.getObservacionesCliente(this.idCliente).toPromise().then(res => {
          this.observaciones = res;
          this.observaciones.map(() => {
            this.cantidadObservaciones++;
          })
        }).then(() => {
          this.tratamientos.map(tratamiento => {
            let permiso: any = {}
            permiso.idCliente = this.cliente.id;
            permiso.idUsuario = localStorage.getItem('userId');
            permiso.id_tratamiento = tratamiento.id_tratamiento;
            this.gestionesServices.getGestionesPorIDCliente(permiso).subscribe(res => {
              tratamiento.cantidad = res.length
            })
          })
        }).then(() => {
          this.isLoaded = true;
        })
      });
    })
    referidosService.getAllRefers().subscribe(res =>{
      this.referidos = res;
      this.referidoSelected = this.referidos.find(ref => ref.id == this.cliente.fk_referido);
    })
  }

  ngOnInit(): void {
  }

  cambiarEstadoTratamiento(id, event) {
    let tratamientoSelected = {
      id_estado_tratamiento: event.value
    }
    this.clientesServices.updateTratamientoCliente(id, tratamientoSelected).subscribe(res => {
      this.clientesServices.getTratamientoClientePorID(this.idCliente).subscribe(res => {
        this.tratamientos = res;
      });
    })
  }

  abrirGestiones(id_tratamiento) {
    this.router.navigate(['/gestiones/' + this.idCliente + '/' + id_tratamiento])
  }

  updateCliente(cliente) {
    cliente.nombre_cliente = cliente.nombre_cliente.toUpperCase();
    console.log(cliente)
    this.clientesServices.UpdateCliente(cliente, this.cliente.id).subscribe(res => {
      if (confirm("Desea guardar los cambios?")) {
        if (res == true) {
          alert("Cliente actualizado");
          this.closeModal._elementRef.nativeElement.click();
          this.clientesServices.getClientePorID(this.idCliente).subscribe(res => {
            this.cliente = res;
            this.editCliente = Object.create(res);
            if (this.editCliente.fecha_nacimiento) {
              this.editCliente.fecha_nacimiento = this.editCliente.fecha_nacimiento.split("T")[0];
            }
            this.isLoaded = true;
          });
        } else {
          alert("Error al actualizar cliente");
        }
      } else {
      }
    });
  }

  deleteObservacion(id) {
    if (confirm("Esta seguro que desea eliminar la observacion?")) {
      this.clientesServices.deleteObservacionesCliente(id).subscribe(res => {
        if (res) {
          this.clientesServices.getObservacionesCliente(this.idCliente).subscribe(res => {
            this.observaciones = res;
          })
        }
      })
    }
  }

  createObservacion() {
    this.nuevaObservacion.id_cliente = this.idCliente;
    this.clientesServices.createObservacionesCliente(this.nuevaObservacion).subscribe(res => {
      this.nuevaObservacion.observacion = ""
      this.clientesServices.getObservacionesCliente(this.idCliente).subscribe(res => {
        this.observaciones = res;
        this.cantidadObservaciones++;
      })
    })
  }

}
