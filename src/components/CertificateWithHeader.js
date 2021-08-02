import { useState } from 'react'
import '../App.css'
import fileDownload from 'js-file-download';
const CertificateWithHeader = ()=> {

  const [certificate, setCertificate] = useState();
  const [certificateWithHeader, setCertificateWithHeader] = useState();
  const handleCertificate = (e)=> {
    setCertificate(e.target.value)
  }
  const formatCertificate = (e)=> {
    fetch('http://127.0.0.1:5000/formatCertificate', {
        method: 'POST',
        body: certificate,
    })
    .then(res => res.json())
    .then(data => {
        setCertificateWithHeader(data)
    })
  }
  const handleCertificateSave = ()=> {
    var date = new Date();
    let present_date = date.getDate() + "" + (date.getMonth() + 1) + "" + date.getUTCFullYear() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
    let fileName = `certificate${present_date}.txt`
    console.log(present_date)
    fileDownload(certificateWithHeader.data, fileName)
  }
    return <div>
        <textarea className="form-control" rows="3" onChange={(e)=>{handleCertificate(e)}}></textarea>
        <br/>
        <button onClick={()=>{formatCertificate()}}>format certificate</button>
        {certificateWithHeader != null ? <p>{certificateWithHeader.data} <br/><button onClick={handleCertificateSave}>download certificate</button></p>: null}
    </div>

}
export default CertificateWithHeader
