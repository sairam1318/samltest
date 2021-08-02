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
        <form classNameName="form-horizontal">
            <div classNameName="form-group">
                <label for="inputType" className="col-sm-2 control-label">Entity Id</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Entity Id" onChange={(e)=>{handleEntityId(e)}} required />
                </div>
            </div>
            <br/>
            <br/>   
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">Single Sign On Service End point</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Single Sign on Service" onChange={(e)=>{handleSignOn(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">Single logout service end point</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Single logout service" onChange={(e)=>{handleLogout(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">SP X.509 cert (same cert for sign/encrypt)</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Certificate" onChange={(e)=>{handleCert(e)}}/>
                </div>
            </div>
            <br/>
            <br/>
            <div className="form-group">
                <label for="NameId Format" className="col-sm-2 control-label">NameId Format</label>
                <div className="col-sm-4">
                    <select  onChange={(e)=>{handleNameId(e)}}>
                        <option >urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</option>
                        <option >urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</option>
                        <option >urn:oasis:names:tc:SAML:1.1:nameid-format:entity</option>
                        <option>urn:oasis:names:tc:SAML:1.1:nameid-format:transient</option>
                        <option>urn:oasis:names:tc:SAML:1.1:nameid-format:persistent</option>
                        <option>urn:oasis:names:tc:SAML:1.1:nameid-format:encrypted</option>
                    </select>
                </div>
            </div>
            <br/>
            <br/>
            <div className="form-group">
                <label for="inputType"  className="col-sm-2 control-label">WantAuthnRequestsSigned</label>
                <div className="col-sm-4">
                    <select onChange={(e)=>{handleAuthn(e)}} >
                        <option >True</option>
                        <option >False</option>
                    </select>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">ORGANIZATION NAME</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Organisation Name" onChange={(e)=>{handleOrganization(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">ORGANIZATION DISPLAY NAME</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="organisation display name" onChange={(e)=>{handleOrganizationDisplayName(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">ORGANIZATION URL</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="organisation url" onChange={(e)=>{handleOrganizationUrl(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="col-sm-2 control-label">Tecnical Contact</div>
            <br/>
            <br/>
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">GIVEN NAME</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Name" onChange={(e)=>{handleTecnicalContactName(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">Email</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Email" onChange={(e)=>{handleTecnicalEmail  (e)}}/>
                </div>
            </div>
            <br/>
            <br/>
            <div className="col-sm-2 control-label">Support Contact</div>
            <br/>
            <br/>
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">Contact</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Support Name" onChange={(e)=>{handleSupportName(e)}}/>
                </div>
            </div>
            <br/>
            <br/> 
            <div className="form-group">
                <label for="inputType" className="col-sm-2 control-label">Email</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="input" placeholder="Email" onChange={(e)=>{handleSupportEmail(e)}}/>
                </div>
            </div>
            <br/>
            <br/>
            <button onClick={generateMetadata}>Build IDP Metadata</button>
        </form>
                       
        <div>
            {xml != null ? <p>{xml}</p> : null}
        </div>
    </div>)
}
export default BuildMetadata