import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx' 
import SimplifyDocument from "./pages/SimplifyDocument";
import CheckForm from "./pages/CheckForm";


function App() {
  

  return (
    <>
    <div className="min-h-screen bg-[#eae0f9]">
      <Header />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/simplify-document" element={<SimplifyDocument />} />
        <Route path="/check-form" element={<CheckForm />} />
      </Routes>
    </div>

    </>
  )
}

export default App
