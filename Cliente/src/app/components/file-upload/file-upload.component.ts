import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PanelService} from "../../services/panel/panel.service";

import {appSettings} from "../../models/appSettings";
import {FilesService} from "../../services/files/files.service";
import {ClientesService} from "../../services/clientes/clientes.service";
import {Clientes} from "../../models/clientes";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileToUpload: File = null;
  carpetas: any;
  nombreArchivo: any = "";
  p: number = 1;

  tipos = ['ESTETICA','ODONTOLOGIA','NUTRICION'];

  cliente: Clientes;

  idCliente: number;
  selectedCarpeta: any = 0;
  carpetaCliente: any;
  archivosCarpeta: any;
  archivosCarpetaCopy: any;
  selectedFilter: any = 0;

  constructor(private router: Router, private panelService: PanelService, private activatedRoute: ActivatedRoute, private fileService: FilesService, private clienteService: ClientesService) {
    this.idCliente = activatedRoute.snapshot.params.id;
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
    if(!localStorage.getItem('apiToken') || localStorage.getItem('apiToken')==null){
      panelService.getCode();
    }
    clienteService.getClientePorID(this.idCliente).subscribe(res =>{
      this.cliente = res;
      fileService.findClientFolder(this.cliente.id+' - '+this.cliente.nombre_cliente).subscribe(res =>{
        if(res['files'].length == 0){
          this.createFolder();
          alert('La carpeta del cliente no existe... Se creará automáticamente');
          window.location.reload();
        }else{
          this.carpetaCliente = res['files'][0].id;
        }
        fileService.findItemsInFolder(this.carpetaCliente).subscribe(res =>{
          this.archivosCarpeta = res['files'];
          this.archivosCarpeta = this.archivosCarpeta.filter(value => !value.trashed);
          this.archivosCarpetaCopy = this.archivosCarpeta;
        })
      })
    });
  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  filtradoLista(tipo) {
    this.archivosCarpeta = this.archivosCarpetaCopy;
    if(tipo == 'SF'){
      return
    }
    else{
      this.archivosCarpeta = this.archivosCarpeta.filter(value => value.name.split('-')[0].trim() == tipo);
    }
  }

  getFile(id){
    this.fileService.getFile(id).subscribe(res =>{
      window.open(res['webViewLink'],'_blank');
    })
  }


  uploadACliente(){
    if(this.nombreArchivo == ""){
      this.nombreArchivo = this.fileToUpload.name;
    }
    let objData = {
      name: this.selectedCarpeta+' - '+this.nombreArchivo,
      parents: [this.carpetaCliente]
    }
    this.fileService.postFile(this.fileToUpload,objData).subscribe(res =>{
      if(res.status == 200){
        alert('Archivo subido con éxito');
        window.location.reload();
      }
    },error => {
      alert('Error al subir el archivo');
      window.location.reload();
    })
  }

  createFolder(){
    this.fileService.createFolder(this.idCliente + ' - ' + this.cliente.nombre_cliente).toPromise().then(res =>{
    });
  }

}
