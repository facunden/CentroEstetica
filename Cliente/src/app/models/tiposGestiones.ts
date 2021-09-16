export interface TiposGestiones {
  id: number,
  nombre_gestion: string,
  id_categoria_gestion: number,
  realizado_automatico: number,
  es_numerica: number,
  es_tabulada: number,
  crea_evento_calendar: number,
  crea_movimiento_caja: number,
  tiene_nota: number
}
