import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout'
import {Hour, Week, Today} from './pages'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Today/>}/>
          <Route path='hour' element={<Hour/>}/>
          <Route path='week' element={<Week/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
