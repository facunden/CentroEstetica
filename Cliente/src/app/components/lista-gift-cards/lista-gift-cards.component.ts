import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {GiftCardsService} from "../../services/gift-cards/gift-cards.service";
import {GiftCard} from "../../models/giftCard";
import {Panel} from "../../models/panel";

@Component({
  selector: 'app-lista-gift-cards',
  templateUrl: './lista-gift-cards.component.html',
  styleUrls: ['./lista-gift-cards.component.css']
})
export class ListaGiftCardsComponent implements OnInit {

  giftCards: GiftCard[];
  searchString: any;
  p: number = 1;
  usuario: Panel;
  isLoaded: boolean = false;

  constructor(public router: Router, private panelService: PanelService, private giftCardService: GiftCardsService) {
    panelService.verifyToken().subscribe(res=>{
    },error => {
      if(error){
        this.router.navigate(['login']).then(() =>{
          localStorage.clear();
        })
      }
    });
    if(JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId){
      this.router.navigate(['login']).then(() => {
        localStorage.clear();
      })
    }
    this.usuario = (JSON).parse(localStorage.getItem('usuario'));
    giftCardService.getAllGiftCards().subscribe(res =>{
      this.giftCards = res;
      this.giftCards.map(gc =>{
        if(new Date(gc.fecha_vencimiento)<= new Date()){
          gc.activo = 0;
        }
      })
      this.isLoaded = true;
    })
  }

  update(id,state){
    let card ={
      id: id,
      activo: state
    }
    if(confirm('Estás seguro que deseas cambiar el estado?')) {
      this.giftCardService.changeState(card).subscribe(res => {
        if (res.status == 'OK') {
          this.giftCardService.getAllGiftCards().subscribe(res => {
            this.giftCards = res;
            this.giftCards.map(gc => {
              if (new Date(gc.fecha_vencimiento) <= new Date()) {
                gc.activo = 0;
              }
            })
          });
        }
      })
    }
  }

  verifyDate(gc){
    if(new Date(gc.fecha_vencimiento)<= new Date()){
      return true;
    } else{
      return false;
    }
  }

  ngOnInit(): void {
  }

}
