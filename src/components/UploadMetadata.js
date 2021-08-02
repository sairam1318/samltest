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
        e.preventDefault();
        if(data === undefined) {
            alert("Please upload a file or enter url")
        }else{
            await fetch('http://127.0.0.1:5000/uploadmetadata', {
                method: 'POST',
                type: 'CORS',
                body: data
              })
              .then(res => res.json())
              .then(data => setXml(data))
        }
        
    }
    return <form>
    <div className="form-group">
        <div className="col-sm-4">
        <p className="label label-primary">Enter the URL where your metadata is hosted(preferably the entityID):</p>
        <br/>
        <input className="form-control" onChange={(e)=>{handleUrl(e)}}></input>
        <br/>
        <legend>(OR)</legend>
        <p className="p-10 label label-primary">Select a metadata file from disk that you would like to upload directly.</p>
        <input type="file" name="file" onChange ={(e)=>{handleFile(e)}} ></input>
        <br/>
        <button className="btn btn-primary" onClick={(e)=>{handleSubmission(e)}}>Fetch</button>
        <div>
            {xml !== undefined ? <p>{xml.data}</p> : null }
        </div>
        </div>
    </div>
    </form>
}

export default UploadMetadata
