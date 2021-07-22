import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

    const [resp, setResp] = useState({
        "entityID": null,
        "certificate" : null,
        "acsUrls": null,
        "singleLogoutUrl": null
    });
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
        "entityID": json.entityId,
        "certificates" : json.certificate,
        "acsUrls": json.acsUrls,
        "singleLogoutUrl": json.singleLogoutService
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
      <div>{resp.entityID != null ? <div>Entity ID: {resp.entityID}</div>: null }</div>
      <div>{resp.singleLogoutUrl != null ? resp.singleLogoutUrl.map((url)=>{
        return <p>Single Logout Url: {url.Url} Single logout Binding : {url.Binding}</p>
      }): null}</div>
      <div>{resp.acsUrls != null ? resp.acsUrls.map(acsUrl => {
        return <p>Acs url: {acsUrl.url} Acs url binding: {acsUrl.binding}</p>
      }): null}</div>
      <div className="certificate">{resp.certificates != null ? resp.certificates.map((cert) => {
        return <p>Certificate: {cert.content }<br></br> </p>
      }): null}</div>
    </div>
  );
}

export default App;
