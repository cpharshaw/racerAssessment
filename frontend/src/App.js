import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./components/Layout";


const App = () => {

  const handleClick_newRace = () => {
    console.log("new race")
  }


  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
