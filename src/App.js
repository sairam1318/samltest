import { useEffect, useState } from 'react';


function App() {
   
    const [resp, setResp] = useState([]);
    const [data, setData] = useState();
    useEffect( ()=> {
      console.log(resp)
    }, [resp])

    const handleSubmission = async (e) => {
      await fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        mode: 'cors',
        body: data,
      })
      .then(res => res.json())
      .then(json => setResp({
        "entityID": json.entityID,
        "certificate" : json.certificate,
        "acsUrl": json.ACSurl,
        "singleLogoutUrl": json.SingleLogouturl
      }))
      
    }
    const changeHandler = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file)
      reader.onload = (e) => {
        setData(e.target.result);
      }
    }
  
    return (
    <div className="App">
      <input type="file" name="file" onChange={(e)=>{changeHandler(e)}} accept="xml"  />
      <div>
          <button onClick={(e)=>{handleSubmission(e)}}>Submit</button>
      </div>
      <div><h3>Entity ID :</h3> <br/>{resp.entityID}</div>
      <div><h3>Single logout url: </h3><br/>{ resp.singleLogoutUrl}</div>
      <div><h3>ACS url: </h3><br/>{resp.acsUrl}</div>
      <div><h3>certificate: </h3><br/>{resp.certificate}</div>
    </div>
  );
}

export default App;
