import { useState } from "react"

const TestIdp = ()=> {
    const [entityid, setEntityid] = useState();
    const [signOnUrl, setSignOnUrl] = useState(null);

    const validateEntityId = (e)=> {  
        fetch('http://127.0.0.1:5000/validateEntityId', {
          method: 'POST',
          type: 'CORS',
          body: entityid
        })
        .then(res => res.json())
        .then(data => setSignOnUrl(data))
    }

    const handleEntityid = (e)=> {
        setEntityid(e.target.value);
    }
    return <form>
        <div className="col-sm-4">
        <p><label className="p-10 label label-primary">Entity Id: </label></p>
        <br/><input className="form-control"  onChange={e=>{handleEntityid(e)} }></input> 
        <br/><button className="btn btn-primary" onClick={(e)=>{validateEntityId(e)}}>Submit</button>
        {signOnUrl !=  null ? window.location.href = signOnUrl.data : null}
        </div>
    </form>
}

export default TestIdp