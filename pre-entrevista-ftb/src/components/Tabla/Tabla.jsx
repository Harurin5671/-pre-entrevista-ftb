/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
import Editar from '../Editar/Editar.jsx'
import styles from './Tabla.module.css'

export default function Tabla({ data, setData }) {
  const [USD, setUSD] = useState(true)
  const [editar, setEditar] = useState(false)
  const [editingData, setEditingData] = useState(null)
  const [cambioFecha, setCambioFecha] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data && data.length > 0) {
      const fechas = data.map((d) => d.fecha)
      const fechaHoy = new Date().toISOString().split('T')[0]
      fechas.push(fechaHoy)

      const fechasUnicasObjeto = fechas.reduce((accumulator, fecha) => {
        accumulator[fecha] = true
        return accumulator
      }, {})

      const fechasUnicas = Object.keys(fechasUnicasObjeto)

      Promise.all(
        fechasUnicas.map((fecha, index) =>
          new Promise((resolve) => setTimeout(resolve, index * 800))
            .then(() =>
              axios.get(`http://localhost:3000/tipo-cambio-fecha/${fecha}`)
            )
            .then((response) => ({
              fecha: fecha,
              ...response.data,
            }))
        )
      )
        .then((responses) => {
          setLoading(false)
          setCambioFecha(responses)
        })
        .catch((error) => {
          setLoading(false)
          console.error('Error fetching tipo de cambio:', error)
        })
    }
  }, [data])

  const cambioMoneda = (moneda) => {
    if (cambioFecha.length > 0) {
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

  const eliminarCampo = (codigo) => {
    const newData = data.filter((item) => item.codigo_unico !== codigo)
    setData(newData)
  }

  const convertirAPen = (moneda, monto, fecha) => {
    const montoAbsoluto = Math.abs(monto)
    const signo = monto < 0 ? '-' : ''

    if (moneda !== 'PEN' && cambioFecha.length > 0) {
      const cambioActual = cambioFecha.find((t) => t.fecha === fecha)
      const montoEnSoles = (montoAbsoluto * cambioActual.precioCompra).toFixed(
        2
      )
      return `${signo}${montoEnSoles}`
    } else {
      return `${signo}${montoAbsoluto}`
    }
  }

  const generarContenidoCSV = () => {
    let contenido = 'fecha,descripcion,moneda,monto,codigo_unico\n'

    for (const m of data) {
      const fecha = m.fecha
      const descripcion = m.descripcion
      const moneda = USD ? cambioMoneda(m.moneda) : m.moneda
      const monto = USD
        ? convertirAPen(m.moneda, m.monto, m.fecha)
        : convertirAUsd(m.moneda, m.monto, m.fecha)
      const codigo_unico = m.codigo_unico

      contenido += `${fecha},"${descripcion}",${moneda},${monto},${codigo_unico}\n`
    }

    return contenido
  }

  const descargarCSV = () => {
    const contenido = generarContenidoCSV()
    const blob = new Blob([contenido], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tabla.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const convertirAUsd = (moneda, monto, fecha) => {
    const montoAbsoluto = Math.abs(monto)
    const signo = monto < 0 ? '-' : ''

    if (moneda === 'PEN') {
      const cambioActual = cambioFecha.find((t) => t.fecha === fecha)
      const montoEnDolares = (montoAbsoluto / cambioActual.venta).toFixed(2)
      return `${signo}${montoEnDolares}`
    } else {
      return `${signo}${montoAbsoluto}`
    }
  }

  return (
    <>
      {data && data.length > 0 ? (
        <>
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th>FECHA</th>
                <th>DESCRIPCIÓN</th>
                <th>MONEDA</th>
                <th>MONTO</th>
                <th>ACCIONES</th>
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
                  </td>
                  <td>
                    <button
                      className={styles.editar}
                      onClick={() => abrirEditor(m)}
                    >
                      Editar
                    </button>
                    {editar && editingData && (
                      <Editar
                        abrirEditor={editar}
                        cerrarEditor={cerrarEditor}
                        data={editingData}
                        setData={setData}
                      />
                    )}
                    <button
                      className={styles.eliminar}
                      onClick={() => eliminarCampo(m.codigo_unico)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.downloadButton} onClick={descargarCSV}>
            Descargar CSV
          </button>
        </>
      ) : (
        <p className={styles.mensajeDataVacia}>
          Por favor, carga el archivo antes de mostrar la tabla.
        </p>
      )}
    </>
  )
}
