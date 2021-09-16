import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Panel} from "../../models/panel";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuario: Panel = {
    id: 0,
    flagCrearUsuario: 0,
    flagManejoTareas: 0,
    flagManejoCaja: 0,
    flagGiftCard: 0,
    flagStock: 0,
    password: "",
    usuario: "",
    nombreApellido: ""
  }

  constructor(private router: Router, private panelService: PanelService) {
    panelService.verifyToken().subscribe(res => {
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
  }

  ngOnInit() {
  }

  CrearUsuario(usuario){
    if(confirm("Desea crear un nuevo usuario?")) {
      this.panelService.CrearUsuario(usuario).subscribe(res => {
        if (res == true) {
          alert("Usuario creado con éxito");
          this.router.navigate(['home']);
        } else {
          alert("No se ha podido crear el usuario");
        }
      })
    }else{}
  }

}
