import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ComplaintForm from "./ComplaintForm";
import SOS from "./SOS";
import ComplaintList from "./ComplaintList";
import ImageUpload from "./ImageUpload";


const App = () => {
  return (
    <>
        <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaint" element={<ComplaintForm/>}/>
        <Route path="/SOS" element={<SOS />} />
        <Route path="/ComplaintList" element={<ComplaintList />} />
        <Route path="/Image" element={<ImageUpload />} />
      </Routes>
    </Router>
    </>
    
  );
};

export default App;
