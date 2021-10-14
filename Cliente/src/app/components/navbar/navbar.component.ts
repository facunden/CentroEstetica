import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  text: string = "";
  isLogged: boolean = false;
  usuario: any;
  showPanel: boolean = false;

  @ViewChild('navbarToggler') navbarToggler:ElementRef;

  constructor(private router: Router, private panelService: PanelService) {
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.isLogged = true;
      if(this.usuario?.flagCrearUsuario == 1){
        this.showPanel = true;
      }
      else{
        this.showPanel = false;
      }
    } else {
      this.checkLoggedIn();
    }
  }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.panelService.isloggedIn(false);
    this.checkLoggedIn();
    this.router.navigate(['login']);
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  onChange(){
    if(this.text.trim().length >= 3){
      this.router.navigate(['buscarCliente/'+this.text]);
    }
  }

  search(){
    this.router.navigate(['buscarCliente/'+this.text]);
  }

  checkLoggedIn() {
    this.panelService.logged.subscribe(res =>{
      this.isLogged = res;
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      if(this.usuario?.flagCrearUsuario == 1){
        this.showPanel = true;
      }
      else{
        this.showPanel = false;
      }
    })
  }

}
