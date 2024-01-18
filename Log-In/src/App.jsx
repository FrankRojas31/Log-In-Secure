import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Log-In";
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="*"  element={<Page404/>}/>
          <Route path="/" element={<Login/>}/>
          
        </Routes>
      </BrowserRouter>
  );
}
