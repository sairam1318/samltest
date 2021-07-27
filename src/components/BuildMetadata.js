import { useState } from "react";

const BuildMetadata = ()=> {
    const [xml, setXml] = useState("");
    const [entityID, setEntityId] = useState("");
    const [signOnService, setSignOnService] = useState("")
    const [logoutService, setLogoutService] = useState("")
    const [certificate, setCertificate] = useState("")
    const [nameId, setNameId] = useState("")
    const [authnRequestNeeded, setAuthnRequestNeeded] = useState()
    const [organisationName, setOrganisationName ] = useState("")
    const [organisationDisplayName, setOrganisationDisplayName] = useState()
    const [organisationUrl, setOrganisationUrl] = useState("")
    const [tecnicalContactName, setTecnicalContactName] = useState()
    const [tecnicalContactEmail, setTecnicalContactEmail] = useState()
    const [supportContactName, setSupportContactName] = useState();
    const [supportContactEmail, setSupportContactEmail] = useState();

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
    const handleOrganization = (e) => {
        setOrganisationName(e.target.value);   
    }

    const handleOrganizationDisplayName = (e) => {
        setOrganisationDisplayName(e.target.value)
    }

    const handleOrganizationUrl = (e)=> {
        setOrganisationUrl(e.target.value);
    }

    const handleTecnicalContactName = (e)=> {
        setTecnicalContactEmail(e.target.value)
    }
    const handleTecnicalEmail = (e)=> {
        setTecnicalContactEmail(e.target.value)
    }

    const handleSupportName = (e)=> {
        setSupportContactName(e.target.value);
    }
    const handleSupportEmail = (e)=> {
        setSupportContactEmail(e.target.value)
    }
    
    const generateMetadata =()=>{
        let metadata = {
            "entityId": entityID,
            "signOnService": signOnService,
            "logoutService": logoutService,
            "certificate": certificate,
            "nameId": nameId,
            "authnRequesteNeeded": authnRequestNeeded,
            "organisationName": organisationName,
            "organisationDisplayName": organisationDisplayName
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
        </md:KeyDescriptor>`
        if(`${metadata.logoutService != null}`) {
            xml = xml + `<md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${metadata.logoutService}"/>`
        }
        if(`${metadata.nameId != null}`) {
            xml = xml + `<md:NameIDFormat>${metadata.nameId}</md:NameIDFormat>`
        }
        xml = xml + `<md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${metadata.signOnService}"/>`
        if(`${metadata.nameId != null}`)
        
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
        <br/>ORGANIZATION NAME: <input onChange={(e)=>{handleOrganization(e)}}></input>
        <br/>ORGANIZATION DISPLAY NAME: <input onChange={(e)=>{handleOrganizationDisplayName(e)}}></input>
        <br/>ORGANIZATION URL: <input onChange={(e)=>{handleOrganizationUrl(e)}}></input>
        <br/>TECHNICAL CONTACT <br/> GIVEN NAME: <input onChange={(e)=>{handleTecnicalContactName(e)}}></input>
        <br/> EMAIL: <input onChange={(e)=>{handleTecnicalEmail(e)}}></input>
        <br/> SUPPORT CONTACT <br/> GIVEN NAME: <input onChange={(e)=>{handleSupportName(e)}}></input>
        <br/> EMAIL: <input onChange={(e)=>{handleSupportEmail(e)}}></input>
        <button onClick={generateMetadata}>Build IDP Metadata</button>
        <div>
            {xml != null ? <p>{xml}</p> : null}
        </div>
    </div>)
}
export default BuildMetadata