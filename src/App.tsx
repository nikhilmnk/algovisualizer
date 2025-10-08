import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import AlgorithmVisualization from './pages/AlgorithmVisualization';
function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/algorithm/:algorithmId" element={<AlgorithmVisualization />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
