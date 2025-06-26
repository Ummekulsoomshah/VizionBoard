import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LandingPage from './pages/LandingPage'
import UploadCSV from './components/UploadCSV'
import ChartSpace from './components/ChartSpace'
import AIassistant from './components/AIassistant'

const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/> 
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/dashboard/upload" element={<UploadCSV/>} />
    <Route path="/dashboard/chart-space" element={<ChartSpace/>} />
    <Route path="/dashboard/ai-assistant" element={<AIassistant/>} />
    {/* Add more routes as needed */}
   </Routes>
   </BrowserRouter>
  )
}

export default App
