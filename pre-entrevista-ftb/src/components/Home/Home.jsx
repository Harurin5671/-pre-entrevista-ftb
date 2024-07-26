import { useState } from 'react'
import CsvReader from 'react-csv-reader'
import TipoDeCambio from '../TipoDeCambio/TipoDeCambio.jsx'
import Tabla from '../Tabla/Tabla.jsx'
// import styles from './Home.module.css'

export default function Home() {
  const [csvData, setCsvData] = useState([])

  const handleCsvFile = (data) => {
    setCsvData(data)
  }

  return (
    <div className="p-9 text-center">
      <h1 className="text-4xl text-black mb-4">CSV Importer</h1>
      <CsvReader
        cssClass="my-5 text-lg text-black"
        onFileLoaded={handleCsvFile}
        parserOptions={{
          header: true,
          skipEmptyLines: true,
        }}
      />
      <TipoDeCambio />
      <div >
        <h2 className="text-4xl my-3">CSV Data</h2>
        <Tabla data={csvData} setData={setCsvData} />
      </div>
    </div>
  )
}
