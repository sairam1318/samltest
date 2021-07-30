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
    return <div>
        <p><label>Entity Id: </label></p>
        <br/><input  onChange={e=>{handleEntityid(e)}}></input> 
        <br/><button onClick={(e)=>{validateEntityId(e)}}>Submit</button>
        {signOnUrl !=  null ? window.location.href = signOnUrl.data : null}
    </div>
}

export default TestIdp