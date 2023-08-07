import { useState } from 'react';
import CsvReader from 'react-csv-reader';
import Tabla from '../Tabla/Tabla.jsx'
import styles from './Home.module.css'

export default function Home() {
  const [csvData, setCsvData] = useState([]);

  const handleCsvFile = (data) => {
    console.log('CSV File Data:', data);
    setCsvData(data);
  };

  return (
    <div className={styles.readerContainer}>
    <header className={styles.readerHeader}>
      <h1 className={styles.headerTitle}>CSV Importer</h1>
      <CsvReader
        cssClass={styles.csvReaderSection}
        onFileLoaded={handleCsvFile}
        parserOptions={{
          header: true,
          skipEmptyLines: true
        }}
      />
      <div className={styles.csvDataSection}>
        <h2 className={styles.dataTitle}>CSV Data</h2>
      </div>
      <Tabla data={csvData} />
    </header>
  </div>
  );
}