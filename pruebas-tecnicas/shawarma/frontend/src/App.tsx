import {useState} from 'react';
import './App.css';

const APP_STATUS = {
  IDLE: 'idle', // al entrar
  ERROR: 'error', // cuando hay un error
  READY_UPLOAD: 'ready_upload', // al elegir el archivo
  UPLOADING: 'uploading', // mientras se sube el archivo
  READY_USAGE: 'ready_usage', // despues de subir
} as const;

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE);

  const [file, setFile] = useState<File | null>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (file) {
      setFile(file);
      setAppStatus(APP_STATUS.READY_UPLOAD);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('TODO');
  };
  return (
    <>
      <h4>Challenge: Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <input
            onChange={handleInputChange}
            name="file"
            type="file"
            accept=".csv"
          />
        </label>
        {appStatus === APP_STATUS.READY_UPLOAD && (
          <button>Subir Archivo</button>
        )}
      </form>
    </>
  );
}

export default App;
