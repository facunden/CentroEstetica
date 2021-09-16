import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";
import {StockService} from "../../services/stock/stock.service";
import {Location} from "@angular/common";
import {appSettings} from "../../models/appSettings";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Stock} from "../../models/stock";
import * as moment from "moment-timezone";

@Component({
  selector: 'app-crear-stock',
  templateUrl: './crear-stock.component.html',
  styleUrls: ['./crear-stock.component.css']
})
export class CrearStockComponent implements OnInit {

  stock: Stock = {
    id: 0,
    category: "0",
    description: "",
    expiration_date: "",
  };

  isNewProduct: boolean = true;

  constructor(private router: Router, private panelService: PanelService, private stockService: StockService,
              public location: Location,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA)
              public data) {
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
    if (data.data != null){
      this.stock = data.data;
      this.stock.expiration_date = this.stock.expiration_date.split('T')[0];
      this.isNewProduct = false;
    }
  }

  ngOnInit(): void {
  }

  updateProduct(id,product){
    product.updated_by = JSON.parse(localStorage.getItem('usuario')).usuario;
    product.last_update = <any> moment().format();
    this.stockService.updateStock(id,product).subscribe(() =>{
      alert('Producto Actualizado');
      this.dialogRef.close();
    });
  }

  newProduct(){
    this.stock.updated_by = JSON.parse(localStorage.getItem('usuario')).usuario;
    this.stock.last_update = <any> moment().format();
    this.stock.date = <any> moment().format();
    this.stockService.createProduct(this.stock).subscribe(res => {
      alert('Producto Creado');
      this.dialogRef.close();
    })
  }

  deleteProduct(id){
    this.stockService.deleteProduct(id).subscribe(res =>{
      if(res){
        alert('Producto eliminado con éxito');
        this.dialogRef.close();
      }
      else {
        alert('Se produjo un error al eliminar el producto')
        this.dialogRef.close();
      }
    })
  }

}
