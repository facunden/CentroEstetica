import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {GestionesService} from "../../services/gestiones/gestiones.service";
import {PanelService} from "../../services/panel/panel.service";
import {appSettings} from "../../models/appSettings";
import {Panel} from "../../models/panel";
import {FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  permisoCtrl = new FormControl();
  visibleP = true;
  selectableP = true;
  removableP = true;
  pendientesCtrl = new FormControl();
  usuarios: Panel[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  isLoaded: boolean = false;

  usuario: Panel = {
    nombreApellido: "",
    password: "",
    flagCrearUsuario: 0,
    flagManejoTareas: 0,
    flagManejoCaja: 0,
    flagGiftCard: 0,
    flagStock: 0,
    usuario: "",
    id: 0
  };

  permisos: any;
  pendientes: any;
  pendientesUsuario: any;
  permisosUsuario: any;
  filteredPermisos: Observable<any[]>;
  selected: boolean = false;
  filteredPendientes: Observable<any[]>;
  cambiaPW: boolean = false;
  cambiaPermiso: boolean = false;
  cambiaPendiente: boolean = false;

  @ViewChild('PermisoInput') permisoInput: ElementRef<HTMLInputElement>;
  @ViewChild('PendienteInput') pendienteInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private snackBar: MatSnackBar, private router: Router, private gestionesService: GestionesService, private panelService: PanelService) {
    panelService.verifyToken().subscribe(() => {
    }, error => {
      if (error) {
        localStorage.clear();
        this.router.navigate(['login'])
      }
    });
    panelService.getUsuarios().subscribe(res => {
        this.usuarios = res;
        this.isLoaded = true;
      }
    )
    gestionesService.getGestionesPorTipoAll().subscribe(res => {
      if (JSON.parse(localStorage.getItem('usuario')).id != appSettings.userId) {
        this.router.navigate(['login']).then(() => {
          localStorage.clear();
        })
      }
    });
  }

  ngOnInit() {
  }

  abrirUsuario(usuario) {
    this.selected = true;
    this.usuario = usuario;
    this.gestionesService.getCategoriasTiposGestion().toPromise().then(res => {
      this.permisos = res;
    }).then(() =>{
      this.gestionesService.getGestionesPorTipoAll().subscribe(res => {
        this.pendientes = res;
        this.pendientes = this.pendientes.filter(pend => pend.realizado_automatico == 0);
      });
    }).then(() =>{
      this.panelService.getTareasPendientes(usuario.id).subscribe(res => {
        this.pendientesUsuario = res;
        this.filteredPendientes = this.pendientesCtrl.valueChanges.pipe(
          startWith(null),
          map(pendiente => pendiente ? this._filter(pendiente) : this.pendientes.slice()));
      })
    }).then(() =>{
      this.panelService.getPermisoCategoria(usuario.id).subscribe(res => {
        this.permisosUsuario = res;
        this.filteredPermisos = this.permisoCtrl.valueChanges.pipe(
          startWith(null),
          map(permiso => permiso ? this._filter(permiso) : this.permisos.slice()));
        this.isLoaded = true;
      });
      }
    );
  }

  checkPermiso(e, permiso) {
    if (e.target.checked) {
      this.permisosUsuario.push(permiso)
    } else {
      this.permisosUsuario = this.permisosUsuario.filter(perm => perm.id !== permiso.id);
    }
  }

  checkPendiente(e, pendiente) {
    if (e.target.checked) {
      this.pendientesUsuario.push(pendiente)
    } else {
      this.pendientesUsuario = this.pendientesUsuario.filter(pend => pend.id !== pendiente.id);
    }
  }

  getPermiso(permiso) {
    let aux = false;
    this.permisosUsuario.map(pu => {
      if (permiso.id == pu.id) {
        aux = true;
        return;
      }
    })
    return aux;
  }

  getPendientes(pendiente) {
    let aux = false;
    this.pendientesUsuario.map(pu => {
      if (pendiente.id == pu.id) {
        aux = true;
        return;
      }
    })
    return aux;
  }


  updateUsuario(usuario, id) {
    if (!this.cambiaPW) {
      delete this.usuario.password;
    }
    if (confirm("Desea guardar los cambios?")) {
      if (this.cambiaPermiso) {
        this.panelService.setPermisoCategoria({permisos: this.permisosUsuario, idUsuario: this.usuario.id}).subscribe();
      }
      if (this.cambiaPendiente) {
        this.panelService.setPendientes({pendientes: this.pendientesUsuario, idUsuario: this.usuario.id}).subscribe();
      }
      this.panelService.updateUsuario(usuario, id).subscribe(res => {
        if (res == true) {
          alert("Usuario Modificado con éxito");
          this.router.navigate(['home']);
        } else {
          alert("No se ha podido crear el usuario");
        }
      })
    } else {
    }
  }

  remove(permiso: any): void {
    const index = this.permisosUsuario.indexOf(permiso);
    this.cambiaPermiso = true;
    if (index >= 0) {
      this.permisosUsuario.splice(index, 1);
    }
  }

  removeP(pendiente: any): void {
    this.cambiaPendiente = true;
    const index = this.pendientesUsuario.indexOf(pendiente);
    if (index >= 0) {
      this.pendientesUsuario.splice(index, 1);
    }
  }

  onSelected(event: MatAutocompleteSelectedEvent): void {
    this.cambiaPermiso = true;
    this.permisoInput.nativeElement.value = '';
    this.permisoCtrl.setValue(null);
    let newArray = this.permisosUsuario.filter(value => {
      return value.descripcion == event.option.viewValue
    })
    if (newArray.length == 0) {
      this.permisosUsuario.push(event.option.value);
    } else {
      this.snackBar.open('El permiso ya se encuentra en la lista!', 'Cerrar',{duration: 3000});
    }
  }

  onSelectedP(event: MatAutocompleteSelectedEvent): void {
    this.cambiaPendiente = true;
    this.pendienteInput.nativeElement.value = '';
    this.pendientesCtrl.setValue(null);
    let newArray = this.pendientesUsuario.filter(value => {
      return value.nombre_gestion == event.option.viewValue
    })
    if (newArray.length == 0) {
      this.pendientesUsuario.push(event.option.value);
    } else {
      this.snackBar.open('La gestion pendiente ya se encuentra en la lista!', 'Cerrar', {duration: 3000});
    }
  }


  private _filter(value: string): string[] {
    //const filterValue = value.toLowerCase();
    return this.permisosUsuario.filter(permiso => permiso.descripcion.toLowerCase().indexOf(value) === 0);
  }


}
