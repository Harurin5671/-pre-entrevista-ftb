/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import Editar from '../Editar/Editar.jsx'
import styles from './Tabla.module.css'

const tipo_cambio = [
  { fecha: '2023-05-28', venta: 3.675, compra: 3.671 },
  { fecha: '2023-05-29', venta: 3.678, compra: 3.674 },
  { fecha: '2023-05-30', venta: 3.68, compra: 3.667 },
]

export default function Tabla({ data, setData }) {
  const [USD, setUSD] = useState(true)
  const [editar, setEditar] = useState(false)
  const [editingData, setEditingData] = useState(null)

  const cambioMoneda = (moneda) => {
    if (USD) {
      return moneda !== 'PEN' ? 'PEN' : moneda
    }
    return moneda
  }

  const abrirEditor = (item) => {
    setEditingData(item)
    setEditar(true)
  }

  const cerrarEditor = () => {
    setEditar(false)
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

  const convertirAUsd = (moneda, monto, fecha) => {
    const montoAbsoluto = Math.abs(monto)
    const signo = monto < 0 ? '-' : ''

    if (moneda === 'PEN') {
      const cambioActual = tipo_cambio.find((t) => t.fecha === fecha)
      const montoEnDolares = (montoAbsoluto / cambioActual.venta).toFixed(2)
      return `${signo}${montoEnDolares}`
    } else {
      return `${signo}${montoAbsoluto}`
    }
  }

  return (
    <>
      {data && data.length > 0 ? (
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>FECHA</th>
              <th>DESCRIPCIÓN</th>
              <th>MONEDA</th>
              <th>MONTO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr key={m.codigo_unico}>
                <td>{m.fecha}</td>
                <td>{m.descripcion}</td>
                <td>{USD ? cambioMoneda(m.moneda) : m.moneda}</td>
                <td>
                  {USD
                    ? convertirAPen(m.moneda, m.monto, m.fecha)
                    : convertirAUsd(m.moneda, m.monto, m.fecha)}
                  <button onClick={() => abrirEditor(m)}>Editar</button>
                  {editar && editingData && (
                    <Editar
                      abrirEditor={editar}
                      cerrarEditor={cerrarEditor}
                      data={editingData}
                      setData={setData}
                    />
                  )}
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.mensajeDataVacia}>
          Por favor, carga el archivo antes de mostrar la tabla.
        </p>
      )}
    </>
  )
}
