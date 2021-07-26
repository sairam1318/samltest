import XmlParser from './components/XmlParser';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import BuildMetadata from './components/BuildMetadata';
function App() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/parse-xml" exact>
              <XmlParser/>
            </Route>
            <Route path="/build-metadata" exact>
              <BuildMetadata/>
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
