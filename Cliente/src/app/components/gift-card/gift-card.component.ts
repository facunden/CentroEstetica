import {Component, OnInit} from '@angular/core';
import * as moment from "moment-timezone";
import {GiftCardsService} from "../../services/gift-cards/gift-cards.service";
import {appSettings} from "../../models/appSettings";
import {PanelService} from "../../services/panel/panel.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {

  giftCard = {
    nombre: "",
    dni: "",
    tipo: "",
    numero: "",
    identificador: "",
    fecha_vencimiento: "",
    activo: 1
  }

  hoy: any;

  constructor(private giftCardService: GiftCardsService, private panelService: PanelService, private router: Router,private snackBar: MatSnackBar) {
    panelService.verifyToken().subscribe(res=>{
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
    this.hoy = moment().format('yyyy-MM-DD');
  }

  ngOnInit(): void {
  }

  coupongenerator(type: string) {
    const stringArr = [];
    for(let i = 0; i< 5; i++){
      const S4 = (((1 + Math.random()) * 0x100000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    let securityCode = this.giftCard.nombre.trim().charAt(0)+this.giftCard.dni.trim().charAt(this.giftCard.dni.length-1)+this.giftCard.nombre.trim().charAt(this.giftCard.nombre.length-1)
    return securityCode+type.toUpperCase()+"-"+stringArr.join('-').toUpperCase();
  }

  crear() {
    this.giftCard.nombre = this.giftCard.nombre.toUpperCase();
    this.giftCard.identificador = this.coupongenerator(this.giftCard.tipo);
    this.giftCardService.crearGiftCard(this.giftCard).subscribe(res =>{
      if(res.status == 'OK'){
        this.router.navigate(['/home']).then(() =>{
          this.snackBar.open('GiftCard/Descuento creado con éxito','Cerrar',{duration:3000})
        });
      }
      else{
        this.snackBar.open('Se ha producido un error','Cerrar',{duration:3000}).afterDismissed().subscribe(() =>{
          window.location.reload();
        })
      }
    })
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
