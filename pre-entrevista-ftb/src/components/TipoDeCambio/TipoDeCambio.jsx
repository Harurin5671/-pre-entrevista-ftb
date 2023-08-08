import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TipoDeCambio.module.css'; // Asegúrate de ajustar la ruta

const TipoDeCambio = () => {
  const [tipoCambio, setTipoCambio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/tipo-cambio')
      .then(response => {
        setTipoCambio(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tipo de cambio:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.tipoCambioContainer}>
      <h2 className={styles.title}>Tipo de Cambio SUNAT</h2>
      {loading ? (
        <p className={styles.loading}>Cargando tipo de cambio...</p>
      ) : (
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>Moneda</th>
              <th>Compra</th>
              <th>Venta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tipoCambio.moneda}</td>
              <td>{tipoCambio.compra}</td>
              <td>{tipoCambio.venta}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TipoDeCambio;
