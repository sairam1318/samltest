import { useEffect, useState } from 'react';
import '../App.css'
const XmlParser = ()=> {
    const [resp, setResp] = useState({
        "entityID": null,
        "certificate" : null,
        "acsUrls": null,
        "singleLogoutService": null,
        "singleSignonService": null
    });
    const [data, setData] = useState();
    useEffect( ()=> {
      console.log(resp);
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
        "singleLogoutService": json.singleLogoutService,
        "singleSignonService": json.singleSignonService
      }))

    }
    const handleUrl = (e)=> {
      setData(e.target.value);
    }
    const changeHandler = (e) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file)
      reader.onload = (e) => {
        setData(e.target.result);
      }
    }


    return <>
    <input type="file" name="file" onChange={(e)=>{changeHandler(e)}} accept="xml"  />
      <br/>
      <p> (OR) PASTE URL HERE: <input className="url" onChange={(e)=>{handleUrl(e)}}></input></p>
      <div>
          <button onClick={(e)=>{handleSubmission(e)}}>Submit</button>
      </div>
      <br/>
      <div className="metadata">
        <div>{resp.entityID != null ? <div><b><u>Entity ID:</u></b> {resp.entityID}</div>: null }</div>
        <div>{resp.singleLogoutService != null ? resp.singleLogoutService.map((url)=>{
          return <p key={url.index}><b><u>Single Logout Url:</u></b> {url.Url} <br/> <b><u>Single logout Binding:</u></b> {url.Binding}</p>
        }): null}</div>
        <div>{resp.acsUrls != null ? resp.acsUrls.map(acsUrl => {
          return <p key={acsUrl.index}><b><u>Acs url: </u></b>{acsUrl.url}<br/> <b><u> Acs url binding: </u></b>{acsUrl.binding}</p>
        }): null}</div>
        <div className="signon"> {resp.singleSignonService != null ? resp.singleSignonService.map((signon)=>{
          return <p key={signon.index}><b><u>Single sign on url: </u></b>  {signon.url}<br/> <b><u>Single sign on Binding: </u></b>{signon.binding} </p>
        }): null} </div>
      </div>
      <div className="certificate">{resp.certificates != null ? resp.certificates.map((cert) => {
        return <p key={cert.index}><b><u>Certificate: </u></b> <br/> {cert.content}</p>
      }): null}</div>

    </>
}
export default XmlParser;
