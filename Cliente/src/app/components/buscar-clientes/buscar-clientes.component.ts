import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ClientesService} from "../../services/clientes/clientes.service";
import {Clientes} from "../../models/clientes";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";

@Component({
  selector: 'app-buscar-clientes',
  templateUrl: './buscar-clientes.component.html',
  styleUrls: ['./buscar-clientes.component.css']
})
export class BuscarClientesComponent implements OnInit {

  clientes: Clientes[] = [];
  searchString: string;
  clienteBuscado: boolean = false;

  constructor(private router: Router, private clientesService: ClientesService, private panelService: PanelService, private activatedRoute: ActivatedRoute) {
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
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.clientes = [];
        if (this.activatedRoute.snapshot.params) {
          this.buscarClientePorNombre(this.activatedRoute.snapshot.params.name);
        }
      }
    })
  }

  ngOnInit() {
  }

  buscarClientePorNombre(nombre) {
    this.clienteBuscado = true;
    this.clientesService.getClientePorNombre(nombre).toPromise().then(res => {
      this.clientes = res;
      this.clienteBuscado = false;
    });
  }

  abrirTratamientos(idCliente) {
    this.router.navigate(['tratamiento/' + idCliente], idCliente)
  }

}
