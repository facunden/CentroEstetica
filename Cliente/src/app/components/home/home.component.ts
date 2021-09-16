import { Component, OnInit } from '@angular/core';
import {PanelService} from "../../services/panel/panel.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: any;

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
    }
    panelService.getUsuario(this.usuario.id).subscribe(res =>{
      this.usuario = res;
      localStorage.setItem('usuario',JSON.stringify(res));
    })
  }

  ngOnInit(): void {
  }

}
