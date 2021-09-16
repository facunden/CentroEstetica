export interface Gestiones {
  id: number,
  usuario: string,
  nombre_gestion: string,
  fecha_carga: string,
  fecha_programada: string,
  fecha_realizado: string,
  observacion: string,
  id_cliente: number,
  id_categoria_gestion: number
  flag_realizado: number;
  tabulacion: string;
  usuario_realizado?: string;
  obs_numerica?:number;
  gestion_concat?:string;
}
