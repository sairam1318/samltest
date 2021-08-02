import { useState } from "react"

const TestIdp = ()=> {
    const [entityid, setEntityid] = useState("");
    const [signOnUrl, setSignOnUrl] = useState({
        data: null,
        error: null
    });

    const validateEntityId = (e)=> {  
        if(entityid.length > 1) {
            fetch('http://127.0.0.1:5000/validateEntityId', {
            method: 'POST',
            type: 'CORS',
            body: entityid
            })
            .then(res => res.json())
            .then(data => setSignOnUrl({
                "data": data.data,
                "error": data.err
            }))
        }else{
            alert("Please enter entity Id first")
        }
        
    }

    const handleEntityid = (e)=> {
        setEntityid(e.target.value);
    }
    return <form>
        <div className="col-sm-4">
        <p><label className="p-10 label label-primary">Entity Id: </label></p>
        <br/><input className="form-control"  onChange={e=>{handleEntityid(e)} }></input> 
        <br/><button className="btn btn-primary" onClick={(e)=>{validateEntityId(e)}}>Submit</button>
        {signOnUrl.data != null ? (signOnUrl.data.length > 1 ?  window.location.href = signOnUrl.data: <p>Entered entity id did not match. Please upload metadata First</p> ): null}

        </div>
    </form>
}

export default TestIdp