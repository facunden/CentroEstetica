import {Component, OnInit} from '@angular/core';
import {PanelService} from "../../services/panel/panel.service";
import {Router} from "@angular/router";
import {appSettings} from "../../models/appSettings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};
  datosIncorrectos: boolean = false;

  constructor(private panelService: PanelService, private router: Router) {
    if(localStorage.getItem('usuario') && localStorage.getItem('token') && localStorage.getItem('userId')){
      this.router.navigate(['home']);
    }
  }

  loguear() {
    this.panelService.loguearUsuario(this.usuario).subscribe(res => {
      localStorage.setItem('usuario', JSON.stringify(res[0]));
      localStorage.setItem('token', res[1]);
      localStorage.setItem('userId',res[0]?.id);
      appSettings.token = localStorage.getItem('token');
      appSettings.userId = localStorage.getItem('userId');
      setTimeout(() =>{
        if (res[0] == undefined || res[1] == undefined) {
          this.router.navigate(['login']);
          this.datosIncorrectos = true;
          localStorage.clear();
        } else {
          this.panelService.isloggedIn(true);
          this.router.navigate(['home']);
        }
      },200)
    }, error => {
      if (error) {
        this.datosIncorrectos = true;
        this.router.navigate(['login']);
      }
    })
  }

  ngOnInit() {
  }


}
