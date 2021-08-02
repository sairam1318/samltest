import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/Sidebar';

function App() {
    return (
      <Router>
        <div className="App">
          <Sidebar></Sidebar>
        </div>
    </Router>
  );
}

export default App;
