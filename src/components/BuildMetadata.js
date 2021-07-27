import { useState } from "react";

const BuildMetadata = ()=> {
    const [xml, setXml] = useState("");
    const [entityID, setEntityId] = useState("");
    const [signOnService, setSignOnService] = useState("")
    const [logoutService, setLogoutService] = useState(null)
    const [certificate, setCertificate] = useState("")
    const [nameId, setNameId] = useState(null)
    const [authnRequestNeeded, setAuthnRequestNeeded] = useState()
    const [organisationName, setOrganisationName ] = useState(null)
    const [organisationDisplayName, setOrganisationDisplayName] = useState(null)
    const [organisationUrl, setOrganisationUrl] = useState(null)
    const [tecnicalContactName, setTecnicalContactName] = useState(null)
    const [tecnicalContactEmail, setTecnicalContactEmail] = useState(null)
    const [supportContactName, setSupportContactName] = useState(null);
    const [supportContactEmail, setSupportContactEmail] = useState(null);

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
        setTecnicalContactName(e.target.value)
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
            "organisationDisplayName": organisationDisplayName,
            "organisationurl": organisationUrl,
            "tecnicalContactName": tecnicalContactName,
            "tecnicalContactEmail": tecnicalContactEmail,
            "supportContactName": supportContactName,
            "supportContactEmail": supportContactEmail
        }
        console.log(metadata)
        formataDataToXml(metadata);
    }
    const formataDataToXml = (metadata)=> {
        if(`${metadata.entityID.length}` < 1 || `${metadata.signOnService.length}` < 1 || `${metadata.certificate.length}` < 1){
            return "entity id is required";
        }else{
            let xml = `<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="${metadata.entityId}">
            <md:IDPSSODescriptor WantAuthnRequestsSigned="${metadata.authnRequestNeeded}" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
            <md:KeyDescriptor use="signing">
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:X509Data>
            <ds:X509Certificate>${metadata.certificate}</ds:X509Certificate>
            </ds:X509Data>
            </ds:KeyInfo>
            </md:KeyDescriptor>`
            if(metadata.logoutService != null) {
                xml = xml + `<md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${metadata.logoutService}"/>`
            }
            if(metadata.nameId != null) {
                xml = xml + `<md:NameIDFormat>${metadata.nameId}</md:NameIDFormat>`
            }
            xml = xml + `<md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${metadata.signOnService}"/></md:IDPSSODescriptor>`
            
            if(metadata.organisationName != null || metadata.organisationDisplayName != null || metadata.setOrganisationUrl != null) {
                xml = xml + `<md:Organization>`;
                if(metadata.organisationName != null){
                    xml = xml + `<md:OrganizationName xml:lang="en-US">${metadata.organisationName}</md:OrganizationName>`
                }
                if(metadata.organisationDisplayName != null) {
                    xml = xml + `<md:OrganizationDisplayName xml:lang="en-US">${metadata.organisationDisplayName}</md:OrganizationDisplayName>`
                }
                if(metadata.organisationUrl != null) {
                    xml = xml + `<md:OrganizationURL xml:lang="en-US">${metadata.organisationUrl}</md:OrganizationURL>`
                }
                xml = xml + `</md:Organization>`
            }
            if(metadata.tecnicalContactName != null || metadata.tecnicalContactEmail != null){
                xml = xml + `<md:ContactPerson contactType="tecnical">`
                if(metadata.tecnicalContactName != null){
                    xml = xml + `<md:GivenName>${metadata.tecnicalContactName}</md:GivenName>`
                }
                if(metadata.tecnicalContactEmail != null){
                    xml = xml + `<md:EmailAddress>${metadata.tecnicalContactEmail}</md:EmailAddress>`
                }
                xml = xml + `</md:ContactPerson>`
            }
            if(metadata.supportContactEmail != null || metadata.supportContactName != null){
                xml = xml + `<md:ContactPerson contactType="support">`
                if(metadata.supportContactName != null){
                    xml = xml + `<md:GivenName>${metadata.supportContactName}</md:GivenName>`
                }
                if(metadata.supportContactEmail != null){
                    xml = xml + `<md:EmailAddress>${metadata.supportContactEmail}</md:EmailAddress>`
                }
                xml = xml + `</md:ContactPerson>`
            }
            xml = xml + `</md:EntityDescriptor>`
            setXml(xml)
        }
        ;
    }
    return (<div>
        Entity Id: <input onChange={(e)=>{handleEntityId(e)}} required='True'></input>
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
        <br/><button onClick={generateMetadata}>Build IDP Metadata</button>
        <div>
            {xml != null ? <p>{xml}</p> : null}
        </div>
    </div>)
}
export default BuildMetadata