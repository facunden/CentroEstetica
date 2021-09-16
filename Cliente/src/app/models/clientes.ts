export interface Clientes {
  id: any,
  dni: number,
  nombre_cliente: string,
  direccion: string,
  telefono: number,
  telefono_aux: number,
  email: string,
  fecha_nacimiento?: string,
  referido?: string,
  fk_referido?: number
}
