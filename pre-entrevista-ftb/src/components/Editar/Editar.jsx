/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './Editar.module.css'

export default function Editar({ abrirEditor, cerrarEditor, data, setData }) {
  const [editedData, setEditedData] = useState({
    fecha: new Date().toISOString().split('T')[0], // Inicializar con la fecha actual
    descripcion: data.descripcion || '',
    moneda: data.moneda || 'PEN', // Valor por defecto 'PEN'
    monto: data.monto || '',
  })

  if (!abrirEditor) return null

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.codigo_unico === data.codigo_unico ? editedData : item
      )
    )
    cerrarEditor()
  }

  return (
    // <div className={styles.overlay}>
    //   <div className={styles.modal}>
    //     <h2>Editar Operación</h2>
    //     <button className={styles.btnClose} onClick={cerrarEditor}>
    //       X
    //     </button>
    //     <form className={styles.formEdit}>
    //       <label>Fecha:</label>
    //       <input
    //         type="date"
    //         name="fecha"
    //         value={editedData.fecha}
    //         onChange={handleInputChange}
    //       />
    //       <label>Descripción:</label>
    //       <input
    //         type="text"
    //         name="descripcion"
    //         value={editedData.descripcion}
    //         onChange={handleInputChange}
    //       />
    //       <label>Moneda:</label>
    //       <select
    //         name="moneda"
    //         value={editedData.moneda}
    //         onChange={handleInputChange}
    //       >
    //         <option value="PEN">PEN</option>
    //         <option value="USD">USD</option>
    //       </select>
    //       <label>Monto:</label>
    //       <input
    //         type="text"
    //         name="monto"
    //         value={editedData.monto}
    //         onChange={handleInputChange}
    //       />
    //       <button onClick={handleSaveChanges}>Guardar Cambios</button>
    //     </form>
    //     <div className={styles.loginBox}>
    //       <h2>Login</h2>
    //       <form>
    //         <div className={styles.userBox}>
    //           <input type="text" name="" required="" />
    //           <label>Username</label>
    //         </div>
    //         <div className={styles.userBox}>
    //           <input type="password" name="" required="" />
    //           <label>Password</label>
    //         </div>
    //         <a href="#">
    //           <span></span>
    //           <span></span>
    //           <span></span>
    //           <span></span>
    //           Submit
    //         </a>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className={styles.overlay}>
      <div className={styles.loginBox}>
        <h2>Editar:</h2>
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
