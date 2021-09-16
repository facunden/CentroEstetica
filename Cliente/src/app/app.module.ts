import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy, registerLocaleData} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {GestionesService} from "./services/gestiones/gestiones.service";
import {GestionesComponent} from './components/gestiones/gestiones.component';
import {HttpClientModule} from "@angular/common/http";
import {PanelComponent} from './components/panel/panel.component';
import {PanelService} from "./services/panel/panel.service";
import {DetalleGestionComponent} from './components/detalle-gestion/detalle-gestion.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CrearGestionComponent} from './components/crear-gestion/crear-gestion.component';
import {TipoGestionAdminComponent} from './components/tipo-gestion-admin/tipo-gestion-admin.component';
import {ClientesService} from "./services/clientes/clientes.service";
import {BuscarClientesComponent} from './components/buscar-clientes/buscar-clientes.component';
import {ClientesAdminComponent} from './components/clientes-admin/clientes-admin.component';
import {CrearUsuarioComponent} from './components/crear-usuario/crear-usuario.component';
import {TipoGestionCategoriasAdminComponent} from './components/tipo-gestion-categorias-admin/tipo-gestion-categorias-admin.component';
import {UsuariosAdminComponent} from './components/usuarios-admin/usuarios-admin.component';
import {CalendarioComponent} from './components/calendario/calendario.component';
import {GestionesPendientesComponent} from './components/gestiones-pendientes/gestiones-pendientes.component';
import {CrearProveedorComponent} from './components/crear-proveedor/crear-proveedor.component';
import {ListaProveedoresComponent} from './components/lista-proveedores/lista-proveedores.component';
import {FilterPipePipe} from './pipes/filter-pipe.pipe';
import {NgxPaginationModule} from "ngx-pagination";
import {ObservacionesTabuladasAdminComponent} from './components/observaciones-tabuladas-admin/observaciones-tabuladas-admin.component';
import {EditarProveedorComponent} from './components/editar-proveedor/editar-proveedor.component';
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {TratamientosComponent} from './components/tratamientos/tratamientos.component';
import {TratamientoClienteComponent} from './components/tratamiento-cliente/tratamiento-cliente.component';
import {CajaDiariaComponent} from "./components/caja-diaria/caja-diaria.component";
import {ListaCajaDiariaComponent} from './components/lista-caja-diaria/lista-caja-diaria.component';
import {TratamientosAdminComponent} from './components/tratamientos-admin/tratamientos-admin.component';
import {AutoFocusDirectiveDirective} from './directives/auto-focus-directive.directive';
import {GiftCardComponent} from './components/gift-card/gift-card.component';
import localeAr from '@angular/common/locales/es-AR';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {ListaGiftCardsComponent} from './components/lista-gift-cards/lista-gift-cards.component';
import {ReplaceCharactersPipe} from './pipes/replace-characters.pipe';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {FlexModule} from "@angular/flex-layout";
import {ListaClientesComponent} from './components/lista-clientes/lista-clientes.component';
import {MatSelectModule} from "@angular/material/select";
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatExpansionModule} from '@angular/material/expansion';
import {HomeComponent} from './components/home/home.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {CrearStockComponent} from './components/crear-stock/crear-stock.component';
import {ListaStockComponent} from './components/lista-stock/lista-stock.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { ReferidosAdminComponent } from './components/referidos-admin/referidos-admin.component';


registerLocaleData(localeAr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GestionesComponent,
    PanelComponent,
    DetalleGestionComponent,
    LoginComponent,
    CrearGestionComponent,
    TipoGestionAdminComponent,
    BuscarClientesComponent,
    ClientesAdminComponent,
    CrearUsuarioComponent,
    TipoGestionCategoriasAdminComponent,
    UsuariosAdminComponent,
    CalendarioComponent,
    GestionesPendientesComponent,
    CrearProveedorComponent,
    ListaProveedoresComponent,
    FilterPipePipe,
    ObservacionesTabuladasAdminComponent,
    EditarProveedorComponent,
    TratamientosComponent,
    TratamientoClienteComponent,
    CajaDiariaComponent,
    ListaCajaDiariaComponent,
    TratamientosAdminComponent,
    AutoFocusDirectiveDirective,
    GiftCardComponent,
    ListaGiftCardsComponent,
    ReplaceCharactersPipe,
    ListaClientesComponent,
    FileUploadComponent,
    HomeComponent,
    CrearStockComponent,
    ListaStockComponent,
    ReferidosAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    FlexModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    CKEditorModule
  ],
  providers: [GestionesService, PanelService, ClientesService, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    {provide: localeAr, useValue: 'es-AR'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
