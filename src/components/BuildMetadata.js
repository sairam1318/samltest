import { useState } from "react";

const BuildMetadata = ()=> {
    const [xml, setXml] = useState("");
    let [entityID, setEntityId] = useState("");
    let [signOnService, setSignOnService] = useState("")
    let [logoutService, setLogoutService] = useState("")
    let [certificate, setCertificate] = useState("")
    let [nameId, setNameId] = useState("")
    let [authnRequestNeeded, setAuthnRequestNeeded] = useState()
    
    const handleEntityId = (e)=> {
        setEntityId(e.target.value)
    }
    const handleSignOn = (e)=> {
        setSignOnService(e.target.value)
    }
    const handleLogout = (e)=> {
        setLogoutService(e.target.value)   
    }
    const handleCert = (e)=> {
        setCertificate(e.target.value)
    }
    const handleNameId = (e)=> {
        setNameId(e.target.value)
    }
    const handleAuthn = (e)=> {
        setAuthnRequestNeeded(e.target.value)
    }
    const generateMetadata =()=>{
        let metadata = {
            "entityId": entityID,
            "signOnService": signOnService,
            "logoutService": logoutService,
            "certificate": certificate,
            "nameId": nameId,
            "authnRequesteNeeded": authnRequestNeeded
        }
        console.log(metadata)
        formataDataToXml(metadata);
    }
    const formataDataToXml = (metadata)=> {
        let xml = `<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="${metadata.entityId}">
        <md:IDPSSODescriptor WantAuthnRequestsSigned="${metadata.authnRequestNeeded}" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <md:KeyDescriptor use="signing">
        <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data>
        <ds:X509Certificate>${metadata.certificate}</ds:X509Certificate>
        </ds:X509Data>
        </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:NameIDFormat>${metadata.nameId}</md:NameIDFormat>
        <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${metadata.signOnService}"/>
        </md:IDPSSODescriptor>
        </md:EntityDescriptor>`
        setXml(xml);
    }
    return (<div>
        Entity Id: <input onChange={(e)=>{handleEntityId(e)}}></input>
        <br/>Single Sign On Service End point: <input onChange={(e)=>{handleSignOn(e)}}></input>
        <br/>Single logout service end point: <input onChange={(e)=>{handleLogout(e)}}></input>
        <br/>SP X.509 cert (same cert for sign/encrypt): <input onChange={(e)=>{handleCert(e)}}></input>
        <br/>NameId Format: <select onChange={(e)=>{handleNameId(e)}}>
            <option>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</option>
            <option>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</option>
            <option>urn:oasis:names:tc:SAML:1.1:nameid-format:entity</option>
            <option>urn:oasis:names:tc:SAML:1.1:nameid-format:transient</option>
            <option>urn:oasis:names:tc:SAML:1.1:nameid-format:persistent</option>
            <option>urn:oasis:names:tc:SAML:1.1:nameid-format:encrypted</option>
        </select>
        <br/>WantAuthnRequestsSigned:
        <select onChange={(e)=>{handleAuthn(e)}}>
            <option>True</option>
            <option>False</option>
        </select>
        <br></br>
        <button onClick={generateMetadata}>Build IDP Metadata</button>
        <div>
            {xml != null ? <p>{xml}</p> : null}
        </div>
    </div>)
}
export default BuildMetadata