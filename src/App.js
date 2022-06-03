import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/shared/Navigation/Navigation';

function App() {
  return (
    <>
      <BrowserRouter> 
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>

      </Routes>
      </BrowserRouter>

     
    </>
  );
}

export default App;
