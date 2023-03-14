import Provider from './components/UseContext/AuthContext';
import Router from '../routes';
import "./global.css";

function App() {
  return (
    <div>
      <Provider>
      <Router/>
      </Provider>
    </div>
  );
}

export default App;
