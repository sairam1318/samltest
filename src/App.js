import XmlParser from './components/XmlParser';
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import BuildMetadata from './components/BuildMetadata';
import CertificateWithHeader from './components/CertificateWithHeader'
import UploadMetadata from './components/UploadMetadata';
import DownloadMetadata from './components/DownloadMetadata'
import TestIdp from './components/TestIdp';

function App() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <Link to="/parse-xml">PARSE XML</Link>
            </li>
            <li>
              <Link to="/build-metadata">Build Metadata</Link>
            </li>
            <li>
              <Link to="/certificateWithHeader">Certificate with header</Link>
            </li>
            <li>
              <Link to="/upload-metadata">Upload metadata</Link>
            </li>
            <li>
              <Link to="/download-metadata">Download Metadata</Link>
            </li>
            <li>
              <Link to="/test-idp">Test IDP</Link>
            </li>
          </ul>
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
            <Route path="/" exact>
              <Home/>
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
