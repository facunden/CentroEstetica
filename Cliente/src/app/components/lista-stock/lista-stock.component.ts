import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {Location} from "@angular/common";
import {appSettings} from "../../models/appSettings";
import {StockService} from "../../services/stock/stock.service";
import {Stock} from "../../models/stock";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment-timezone";
import {CrearStockComponent} from "../crear-stock/crear-stock.component";

@Component({
  selector: 'app-lista-stock',
  templateUrl: './lista-stock.component.html',
  styleUrls: ['./lista-stock.component.css']
})
export class ListaStockComponent implements OnInit {

  stock: Stock[];
  isLoaded: boolean = false;
  p: number = 0;
  searchString: any;

  constructor(private router: Router, private panelService: PanelService, private stockService: StockService,
              public location: Location,public dialog: MatDialog) {
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
    stockService.getAllProducts().subscribe(res =>{
      this.stock = res;
      this.stock.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      this.isLoaded = true;
    })
  }

  ngOnInit(): void {
  }

  updateProduct(id, product:Stock){
    product.updated_by = JSON.parse(localStorage.getItem('usuario')).usuario;
    product.last_update = <any> moment().format();
    this.stockService.updateStock(id,product).subscribe();
  }

  openDialog(product) {
    const dialogRef = this.dialog.open(CrearStockComponent, {
      width: '95%',
      maxWidth: '500px',
      height: '80%',
      maxHeight: '600px',
      position: {top: '95px'},
      data: {data: product}
    }).afterClosed().subscribe(() =>{
      this.isLoaded = false;
      this.stockService.getAllProducts().subscribe(res =>{
        this.stock = res;
        this.stock.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        this.isLoaded = true;
      })
    })
  }

  getDifference(amount,minAmount) {
    let total = Math.abs(amount) - Math.abs(minAmount);
    if( total <= minAmount*0.10){
      return true;
    }
    else {
      return false;
    }
  }

}
