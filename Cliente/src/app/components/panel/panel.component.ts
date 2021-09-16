import {Component, OnInit} from '@angular/core';
import {PanelService} from "../../services/panel/panel.service";
import {Panel} from "../../models/panel";
import {ActivatedRoute, Router} from "@angular/router";
import {appSettings} from "../../models/appSettings";
import {PanelView} from "../../models/panelView";


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  usuario: Panel;
  isLoaded: boolean = false;

  panelView: PanelView[] = []

  constructor(private panelService: PanelService, private activatedRoute: ActivatedRoute, private router: Router) {
    if(activatedRoute.snapshot.queryParams.access_token){
      localStorage.setItem('apiToken',activatedRoute.snapshot.queryParams.access_token);
      localStorage.setItem('refresh_token',activatedRoute.snapshot.queryParams.refresh_token);
    }
    if(!localStorage.getItem('usuario') || !localStorage.getItem('token') || !localStorage.getItem('userId') || localStorage.getItem('usuario') == undefined || localStorage.getItem('token') == undefined){
      this.router.navigate(['login']);
      localStorage.clear();
    } else {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loadPanel();
      this.isLoaded = true;
      if(this.usuario.flagCrearUsuario == 0){
        alert("Usted no posee permisos para acceder a esta sección");
        this.router.navigate(['home']);
      }
    }
  }

  ngOnInit() {
  }

  loadPanel(){
    this.panelView = [
      {
        name: "Administrar Tipos de Gestiones",
        condition: this.usuario.flagManejoTareas,
        category: "Administrativa",
        route: "tipoGestionAdmin"
      },
      {
        name: "Administrar Categorías Tipos de Gestiones",
        condition: this.usuario.flagManejoTareas,
        category: "Administrativa",
        route: "tipoGestionCatAdmin"
      },
      {
        name: "Administrar Tratamientos",
        condition: 1,
        category: "Administrativa",
        route: "tratamientos-admin"
      },
      {
        name: "Administrar referidos",
        condition: this.usuario.flagCrearUsuario,
        category: "Administrativa",
        route: "referidos-admin"
      },
      {
        name: "Crear Usuario",
        condition: this.usuario.flagCrearUsuario,
        category: "Administrativa",
        route: "crearUsuario"
      },
      {
        name: "Gestion de Usuario",
        condition: this.usuario.flagCrearUsuario,
        category: "Administrativa",
        route: "usuariosAdmin"
      },
      {
        name: "Caja Diaria",
        condition: this.usuario.flagManejoCaja,
        category: "Administrativa",
        route: "caja-diaria"
      },
      {
        name: "Historial Caja",
        condition: this.usuario.flagManejoCaja,
        category: "Administrativa",
        route: "lista-caja-diaria"
      },
      {
        name: "Crear Cliente",
        condition: 1,
        category: "Administrativa",
        route: "administrarClientes"
      },
      {
        name: "Lista Clientes",
        condition: 1,
        category: "Administrativa",
        route: "lista-clientes"
      },
      {
        name: "Crear Proveedor",
        condition: 1,
        category: "Administrativa",
        route: "crearProveedor"
      },
      {
        name: "Lista Proveedores",
        condition: 1,
        category: "Administrativa",
        route: "listaProveedores"
      }
      ,
      {
        name: "Gift Card",
        condition: this.usuario.flagGiftCard,
        category: "Administrativa",
        route: "gift-card"
      }
      ,
      {
        name: "Lista Gift Cards",
        condition: 1,
        category: "Administrativa",
        route: "lista-gift-card"
      },
      {
        name: "Lista Stock",
        condition: this.usuario.flagStock,
        category: "Administrativa",
        route: "lista-stock"
      }
    ]
  }



}
