import { useState } from "react"

const UploadMetadata = ()=> {
    const [data, setData] = useState();
    const [xml, setXml] = useState();
    const handleUrl = (e)=> {
        setData(e.target.value)
    }
    const handleFile = (e)=> {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file)
        reader.onload = (e) => {
            setData(e.target.result);
        }
    }
    const handleSubmission = async (e) => {
        await fetch('http://127.0.0.1:5000/uploadmetadata', {
          method: 'POST',
          type: 'CORS',
          body: data
        })
        .then(res => res.json())
        .then(data => setXml(data))
    }
    return <>
    <p>Enter the URL where your metadata is hosted(preferably the entityID):</p>
    <br/>
    <input onChange={(e)=>{handleUrl(e)}}></input>
    <br/>
    <p>(OR)</p>
    <p>select a metadata file from disk that you would like to upload directly.</p>
    <input type="file" name="file" onChange ={(e)=>{handleFile(e)}} ></input>
    <br/>
    <button onClick={(e)=>{handleSubmission(e)}}>fetch</button>
    <div>
        {xml !== undefined ? <p>{xml.data}</p> : null }
    </div>
    </>
}

export default UploadMetadata
