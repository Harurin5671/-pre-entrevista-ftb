/* eslint-disable react/prop-types */
import styles from './Editar.module.css'

export default function Editar({abrirEditor, cerrarEditor}) {
  if (!abrirEditor) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Operación</h2>
        <button onClick={cerrarEditor}>X</button>
        <form className={styles.formEdit}>
          <label>Fecha:</label>
          <input type="text" />
          <label>Descripción:</label>
          <input type="text" />
          <label>Moneda:</label>
          <input type="text" />
          <label>Monto:</label>
          <input type="text" />
        </form>
      </div>
    </div>
  )
}
  