import Table from './components/Table.jsx'

import './App.css'

const movimientos = [
  {
    fecha: '2023-05-28',
    descripcion: 'ITF',
    moneda: 'PEN',
    monto: -1.7,
    codigo_unico: '2010221',
  },
  {
    fecha: '2023-05-28',
    descripcion: 'Reembolso por Factura F01-00214',
    moneda: 'PEN',
    monto: -380,
    codigo_unico: '2010223',
  },
  {
    fecha: '2023-05-29',
    descripcion: 'Comisión interbancaria',
    moneda: 'USD',
    monto: -5.3,
    codigo_unico: '2010225',
  },
  {
    fecha: '2023-05-29',
    descripcion: 'Pago de RxH E01-00180',
    moneda: 'USD',
    monto: -1800,
    codigo_unico: '2010226',
  },
  {
    fecha: '2023-05-30',
    descripcion: 'Consumo Microsoft',
    moneda: 'USD',
    monto: -9.9,
    codigo_unico: '2010227',
  },
  {
    fecha: '2023-05-30',
    descripcion: 'Pago Invoice Google',
    moneda: 'USD',
    monto: -52.5,
    codigo_unico: '2010229',
  },
]

const tipo_cambio = [
  { fecha: '2023-05-28', venta: 3.675, compra: 3.671 },
  { fecha: '2023-05-29', venta: 3.678, compra: 3.674 },
  { fecha: '2023-05-30', venta: 3.68, compra: 3.667 },
]

function App() {

  return (
    <>
      <Table movimientos={movimientos} tipo_cambio={tipo_cambio}/>
    </>
  )
}

export default App
