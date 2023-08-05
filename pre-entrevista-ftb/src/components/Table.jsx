/* eslint-disable react/prop-types */
import {useState} from 'react'

export default function Table({ movimientos, tipo_cambio }) {
  const [USD, setUSD] = useState(true)

  const cambioMoneda = (moneda) => {
    if (USD) {
      if (moneda !== 'PEN') {
        let monedaCambiada = (moneda = 'PEN')
        return monedaCambiada
      } else {
        return moneda
      }
    }
  }

  const convertirAPen = (moneda, monto, fecha) => {
    const montoAbsoluto = Math.abs(monto)
    const signo = monto < 0 ? '-' : ''

    if (moneda !== 'PEN') {
      const cambioActual = tipo_cambio.find((t) => t.fecha === fecha)
      const montoEnSoles = (montoAbsoluto * cambioActual.compra).toFixed(2)
      return `${signo}${montoEnSoles}`
    } else {
      return `${signo}${montoAbsoluto}`
    }
  }

  return (
    <>
      <table className="customTable">
        <thead>
          <tr>
            <th>FECHA</th>
            <th>DESCRIPCIÓN</th>
            <th>MONEDA</th>
            <th>MONTO</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m) => (
            <tr key={m.codigo_unico}>
              <td>{m.fecha}</td>
              <td>{m.descripcion}</td>
              <td>{USD ? cambioMoneda(m.moneda) : m.moneda}</td>
              <td>
                {USD ? convertirAPen(m.moneda, m.monto, m.fecha) : m.monto}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setUSD(!USD)}>USD</button>
      <button>Editar</button>
      <button>Eliminar</button>
    </>
  )
}
