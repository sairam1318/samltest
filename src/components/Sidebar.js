import { Link, Route, Switch } from 'react-router-dom'
import './sidebar.css'
import BuildMetadata from './BuildMetadata'
import CertificateWithHeader from './CertificateWithHeader'
import DownloadMetadata from './DownloadMetadata'
import Home from './Home'
import { SidebarData } from './SidebarData'
import TestIdp from './TestIdp'
import UploadMetadata from './UploadMetadata'
import XmlParser from './XmlParser'
const Sidebar = ()=> {
    return <>
    <div className='sidebar-header'>
        <ul className="sidebar-list">
            <li>
              <Link to="/parse-xml">PARSE XML</Link>
            </li>
            <li className="sidebar-row">
              <Link to="/build-metadata">Build Metadata</Link>
            </li>
            <li className="sidebar-row">
              <Link to="/certificateWithHeader">Certificate with header</Link>
            </li>
            <li className="sidebar-row">
              <Link to="/upload-metadata">Upload metadata</Link>
            </li>
            <li className="sidebar-row">
              <Link to="/download-metadata">Download Metadata</Link>
            </li>
            <li className="sidebar-row">
              <Link to="/test-idp">Test IDP</Link>
            </li>
        </ul>
        </div>
        <div className="components">
        <Switch>
            <Route path="/parse-xml" exact>
              <XmlParser/>
            </Route>
            <Route path="/build-metadata" exact>
              <BuildMetadata/>
            </Route>
            <Route path="/certificateWithHeader" exact>
              <CertificateWithHeader />
            </Route>
            <Route path="/upload-metadata" exact>
              <UploadMetadata />
            </Route>
            <Route path="/download-metadata" exact>
              < DownloadMetadata />
            </Route>
            <Route path="/test-idp" exact>
              < TestIdp />
            </Route>
          </Switch>
    </div>
    </>
}
export default Sidebar