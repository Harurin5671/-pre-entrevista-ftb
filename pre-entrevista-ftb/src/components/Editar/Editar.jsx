/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './Editar.module.css';

export default function Editar({ abrirEditor, cerrarEditor, data, setData }) {
  const [editedData, setEditedData] = useState({
    fecha: new Date().toISOString().split('T')[0], // Inicializar con la fecha actual
    descripcion: data.descripcion || '',
    moneda: data.moneda || 'PEN', // Valor por defecto 'PEN'
    monto: data.monto || '',
  })

  if (!abrirEditor) return null;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSaveChanges = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.codigo_unico === data.codigo_unico ? editedData : item
      )
    );
    cerrarEditor();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Operación</h2>
        <button className={styles.btnClose} onClick={cerrarEditor}>X</button>
        <form className={styles.formEdit}>
          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={editedData.fecha}
            onChange={handleInputChange}
          />
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={editedData.descripcion}
            onChange={handleInputChange}
          />
          <label>Moneda:</label>
          <select
            name="moneda"
            value={editedData.moneda}
            onChange={handleInputChange}
          >
            <option value="PEN">PEN</option>
            <option value="USD">USD</option>
          </select>
          <label>Monto:</label>
          <input
            type="text"
            name="monto"
            value={editedData.monto}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}
