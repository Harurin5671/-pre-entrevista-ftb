import { useState } from 'react'
import LabelInputStyled from '../LabelInputStyle.jsx'
import { SaveIcon } from '../../icons/Icons.jsx'

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types


export default function Modal({ abrirModal, cerrarModal, data, setData }) {
  const [editedData, setEditedData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    moneda: '',
    monto: '',
    codigo_unico: data?.codigo_unico || generateUniqueCode(),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    setData((prev) =>
      prev.map((item) =>
        item.codigo_unico === data.codigo_unico ? editedData : item
      )
    )
    cerrarModal()
  }

  const generateUniqueCode = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  if (!abrirModal) return null

  return (
    <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen">
      <div className="relative p-4 w-full max-w-md max-h-full">

        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Editar
            </h3>
            <button onClick={cerrarModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <LabelInputStyled
                  onChange={handleInputChange}
                  type="date"
                  label="Fecha"
                  name="fecha"
                  value={editedData.fecha}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <LabelInputStyled
                  onChange={handleInputChange}
                  type="number"
                  label="Moneda"
                  name="monto"
                  placeholder={`${data.moneda === 'USD' ? "$" : "S/"} ${data.monto}`}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Moneda</label>
                <select placeholder={data.moneda} name="moneda" id="category" value={editedData.moneda} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option value="PEN">PEN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div className="col-span-2">
                <LabelInputStyled
                  onChange={handleInputChange}
                  type="text"
                  label="Descripcion"
                  name="descripcion"
                  placeholder={data.descripcion} />
              </div>
            </div>
            <button
              type="submit"
              className="border-none inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSaveChanges}
            >
              <SaveIcon className="mx-1 text-white" />
              <p className='text-white'>
                Guardar Cambios
              </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}