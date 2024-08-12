import './App.css';
import axios from 'axios';
import {useState} from 'react'

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
    <div className="App">
      <div>Generating Excuse</div>
      <button onClick={() => generateExcuse("family")}>Family</button>
      <button onClick={() => generateExcuse("office")}>Office</button>
      <button onClick={() => generateExcuse("party")}>Party</button>
      {loading ? (<div>loading ...</div>)
      : error ? (<div>{error}</div>)
      : <div>{excuses}</div>}
    </div>
  );
}

export default App;
