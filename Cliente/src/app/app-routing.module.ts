import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionesComponent} from "./components/gestiones/gestiones.component";
import {PanelComponent} from "./components/panel/panel.component";
import {DetalleGestionComponent} from "./components/detalle-gestion/detalle-gestion.component";
import {LoginComponent} from "./components/login/login.component";
import {CrearGestionComponent} from "./components/crear-gestion/crear-gestion.component";
import {TipoGestionAdminComponent} from "./components/tipo-gestion-admin/tipo-gestion-admin.component";
import {BuscarClientesComponent} from "./components/buscar-clientes/buscar-clientes.component";
import {ClientesAdminComponent} from "./components/clientes-admin/clientes-admin.component";
import {CrearUsuarioComponent} from "./components/crear-usuario/crear-usuario.component";
import {TipoGestionCategoriasAdminComponent} from "./components/tipo-gestion-categorias-admin/tipo-gestion-categorias-admin.component";
import {UsuariosAdminComponent} from "./components/usuarios-admin/usuarios-admin.component";
import {CalendarioComponent} from "./components/calendario/calendario.component";
import {GestionesPendientesComponent} from "./components/gestiones-pendientes/gestiones-pendientes.component";
import {CrearProveedorComponent} from "./components/crear-proveedor/crear-proveedor.component";
import {ListaProveedoresComponent} from "./components/lista-proveedores/lista-proveedores.component";
import {ObservacionesTabuladasAdminComponent} from "./components/observaciones-tabuladas-admin/observaciones-tabuladas-admin.component";
import {EditarProveedorComponent} from "./components/editar-proveedor/editar-proveedor.component";
import {TratamientosComponent} from "./components/tratamientos/tratamientos.component";
import {TratamientoClienteComponent} from "./components/tratamiento-cliente/tratamiento-cliente.component";
import {CajaDiariaComponent} from "./components/caja-diaria/caja-diaria.component";
import {ListaCajaDiariaComponent} from "./components/lista-caja-diaria/lista-caja-diaria.component";
import {TratamientosAdminComponent} from "./components/tratamientos-admin/tratamientos-admin.component";
import {GiftCardComponent} from "./components/gift-card/gift-card.component";
import {ListaGiftCardsComponent} from "./components/lista-gift-cards/lista-gift-cards.component";
import {ListaClientesComponent} from "./components/lista-clientes/lista-clientes.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {HomeComponent} from "./components/home/home.component";
import {ListaStockComponent} from "./components/lista-stock/lista-stock.component";
import {ReferidosAdminComponent} from "./components/referidos-admin/referidos-admin.component";

const routes: Routes = [
  {path: 'gestiones/:id/:id', component: GestionesComponent},
  {path: 'home', component: HomeComponent},
  {path: 'detalleGestion/:id', component: DetalleGestionComponent},
  {path: 'panel', component: PanelComponent},
  {path: 'login', component: LoginComponent},
  {path: 'crearGestion', component: CrearGestionComponent},
  {path: 'tipoGestionAdmin', component: TipoGestionAdminComponent},
  {path: 'buscarCliente/:name', component: BuscarClientesComponent},
  {path: 'administrarClientes', component: ClientesAdminComponent},
  {path: 'crearUsuario', component: CrearUsuarioComponent},
  {path: 'usuariosAdmin', component: UsuariosAdminComponent},
  {path: 'editar-proveedor/:id', component: EditarProveedorComponent},
  {path: 'tipoGestionCatAdmin', component: TipoGestionCategoriasAdminComponent},
  {path: 'calendario', component: CalendarioComponent},
  {path: 'gestionesPendientes', component: GestionesPendientesComponent},
  {path: 'crearProveedor', component: CrearProveedorComponent},
  {path: 'tratamiento/:id', component: TratamientosComponent},
  {path: 'asignarTratamiento/:id', component: TratamientoClienteComponent},
  {path: 'observaciones-tabuladas', component: ObservacionesTabuladasAdminComponent},
  {path: 'listaProveedores', component: ListaProveedoresComponent},
  {path: 'caja-diaria', component: CajaDiariaComponent},
  {path: 'lista-caja-diaria', component: ListaCajaDiariaComponent},
  {path: 'tratamientos-admin', component: TratamientosAdminComponent},
  {path: 'gift-card', component: GiftCardComponent},
  {path: 'lista-gift-card', component: ListaGiftCardsComponent},
  {path: 'lista-clientes', component: ListaClientesComponent},
  {path: 'file-upload/:id', component: FileUploadComponent},
  {path: 'lista-stock', component: ListaStockComponent},
  {path: 'referidos-admin', component: ReferidosAdminComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
