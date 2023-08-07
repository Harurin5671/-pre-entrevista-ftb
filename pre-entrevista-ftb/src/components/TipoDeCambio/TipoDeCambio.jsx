import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Tipo de Cambio SUNAT</h2>
      {loading ? (
        <p>Cargando tipo de cambio...</p>
      ) : (
        <table>
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