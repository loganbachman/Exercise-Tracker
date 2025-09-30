import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/HomePage';
import CreateExerPage from './pages/CreateExerPage';
import EditExerPage from './pages/EditExerPage';
import './App.css'

function App() {

  const [exerToEdit, setExerToEdit] = useState();

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setExerToEdit={setExerToEdit}/>}></Route>
          <Route path="/add-exercise" element={<CreateExerPage/>}></Route>
          <Route path="/edit-exercise" element={<EditExerPage exerToEdit={exerToEdit}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App
