import './App.css';
import axios from 'axios';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [excuses, setExcuses] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateExcuse = async (selectedGategory) => {
    try{
      setLoading(true)
      await axios.get(`https://excuser-three.vercel.app/v1/excuse/${selectedGategory}`).then((res) => {
        setExcuses(res.data[0].excuse) 
      })
    }catch (error){
      setError("Oops! Something went wrong.")

    }finally{
      setLoading(false)

    }

  }

  return (
    <div className="container mt-5">
      <h1 className="m-2">Generating Excuse</h1>
      <nav className="navbar navbar-light bg-light">
        <form className="container-fluid justify-content-start">
          <button className="btn btn-outline-success me-2" type="button" onClick={() => generateExcuse("family")}>Family</button>
          <button className="btn btn-outline-success me-2" type="button" onClick={() => generateExcuse("office")}>Office</button>
          <button className="btn btn-outline-success me-2" type="button" onClick={() => generateExcuse("family")}>Party</button>
        </form>
      </nav>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center h-60vh">
          <div className="spinner-border" role="status">
          </div>
        </div>)
      : error ? (<div>{error}</div>)
      : <p>{excuses}</p>}
    </div>
  );
}

export default App;
