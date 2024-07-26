/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from 'axios'
import Editar from '../Editar/Editar.jsx'
import Modal from './Modal.jsx'
import styles from './Tabla.module.css'

export default function Tabla({ data, setData }) {
  const [USD, setUSD] = useState(true)
  const [editar, setEditar] = useState(false)
  const [abrir, setAbrir] = useState(false)
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
          new Promise((resolve) => setTimeout(resolve, index * 1000))
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

  const abrirModal = (item) => {
    setEditingData(item)
    setAbrir(true)
  }

  const cerrarEditor = () => {
    setEditar(false)
  }

  const cerrarModal = () => {
    setAbrir(false)
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
        <div className="overflow-x-auto flex flex-col justify-center items-center">
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-[#E2B842]">FECHA</th>
                <th scope="col" className="px-6 py-3 text-[#E2B842]">DESCRIPCIÓN</th>
                <th scope="col" className="px-6 py-3 text-[#E2B842]">MONEDA</th>
                <th scope="col" className="px-6 py-3 text-[#E2B842]">MONTO</th>
                <th scope="col" className="px-6 py-3 text-[#E2B842]">CODIGO UNICO</th>
                <th scope="col" className="px-16 py-3 text-[#E2B842]">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m) => (
                <tr key={m.codigo_unico} className="bg-red-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{m.fecha}</td>
                  <td className="px-6 py-4">{m.descripcion}</td>
                  <td className="px-6 py-4">{USD ? cambioMoneda(m.moneda) : m.moneda}</td>
                  <td className="px-6 py-4">
                    {USD
                      ? convertirAPen(m.moneda, m.monto, m.fecha)
                      : convertirAUsd(m.moneda, m.monto, m.fecha)}
                  </td>
                  <td className="px-6 py-4">{m.codigo_unico}</td>
                  <td>
                    <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-none" type="button" onClick={() => abrirModal(m)}>
                      <p className='text-white'>
                        Editar
                      </p>
                    </button>
                    {abrir && editingData && (
                      <Modal
                        abrirModal={abrir}
                        cerrarModal={cerrarModal}
                        data={editingData}
                        setData={setData}
                      />
                    )}
                    <button
                      data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                      className="border-none bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => eliminarCampo(m.codigo_unico)}
                    >
                      <p className='text-white'>
                        Eliminar
                      </p>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className=' mt-7 border-none bg-gradient-to-r from-[#E2B842] via-[rgb(226,184,60)] to-[rgb(226,184,66)] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-900 dark:focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={descargarCSV}>
            <p className='text-black text-3xl'>
              Descargar CSV
            </p>
          </button>
        </div>
      ) : (
        <p className={styles.mensajeDataVacia}>
          Por favor, carga el archivo antes de mostrar la tabla.
        </p>
      )}
    </>
  )
}
