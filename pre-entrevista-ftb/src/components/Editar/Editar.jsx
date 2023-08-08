/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './Editar.module.css'

export default function Editar({ abrirEditor, cerrarEditor, data, setData }) {
  const [editedData, setEditedData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    moneda: 'PEN',
    monto: '',
  });

  if (!abrirEditor) return null

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
    cerrarEditor()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.loginBox}>
        <h2>Editar:</h2>
        <span className={styles.btnClose} onClick={cerrarEditor}>X</span>
        <form>
          <div className={styles.userBox}>
            <input
              type="date"
              name="fecha"
              value={editedData.fecha}
              onChange={handleInputChange}
            />
            <label>Fecha:</label>
          </div>
          <div className={styles.userBox}>
            <input
              type="text"
              name="descripcion"
              value={editedData.descripcion}
              onChange={handleInputChange}
            />
            <label>Descripción:</label>
          </div>
          <div>
            <label>Moneda:</label>
            <select
              name="moneda"
              value={editedData.moneda}
              onChange={handleInputChange}
            >
              <option value="PEN">PEN</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className={styles.userBox}>
            <input
              type="text"
              name="monto"
              value={editedData.monto}
              onChange={handleInputChange}
            />
            <label>Monto:</label>
          </div>

          <a onClick={handleSaveChanges} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Guardar Cambios
          </a>
        </form>
      </div>
    </div>
  )
}
