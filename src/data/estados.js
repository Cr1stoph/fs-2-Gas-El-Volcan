/** Etiquetas legibles para los estados del pedido y del pago. */
export const ETIQUETA_ESTADO = {
  PENDIENTE: { texto: 'Pendiente', clase: 'bg-yellow-100 text-yellow-800' },
  EN_CAMINO: { texto: 'En camino', clase: 'bg-blue-100 text-blue-800' },
  ENTREGADO: { texto: 'Entregado', clase: 'bg-green-100 text-green-800' },
  PAGO_RECHAZADO: { texto: 'Pago rechazado', clase: 'bg-red-100 text-red-800' },
};

export const ETIQUETA_PAGO = {
  APROBADO: { texto: 'Aprobado', clase: 'bg-green-100 text-green-800' },
  RECHAZADO: { texto: 'Rechazado', clase: 'bg-red-100 text-red-800' },
  PENDIENTE: { texto: 'Pendiente', clase: 'bg-yellow-100 text-yellow-800' },
};

export function etiquetaEstado(valor) {
  return ETIQUETA_ESTADO[valor] ?? { texto: valor, clase: 'bg-gray-100 text-gray-700' };
}

export function etiquetaPago(valor) {
  return ETIQUETA_PAGO[valor] ?? { texto: valor, clase: 'bg-gray-100 text-gray-700' };
}
