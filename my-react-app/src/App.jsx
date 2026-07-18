import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Hero from "./pages/Home/Hero";
import Services from "./pages/Services";
import About from "./pages/About";
import Courses from "./pages/Courses";
import FAQ from "./pages/Faq";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Team from "./pages/Team";
import { BrowserRouter,Route,Routes } 

from "react-router-dom";
import Technologies from "./pages/Technologies";
import Internship from "./pages/Internship";


function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    
    <Routes>

    <Route path="/" element={<Hero/>}/>

    <Route path="/about" element={<About/>}/>

     <Route path="/services" element={<Services/>}/>

       <Route path="/courses" element={<Courses/>}/>
         <Route path="/faq" element={<FAQ/>}/>
         <Route path="/contact" element={<Contact/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/technologies" element={<Technologies/>}/>
           <Route path="/team" element={<Team/>}/>
            <Route path="/internship" element={<Internship/>}/>






  </Routes>
  <Footer/>
  </BrowserRouter>
  
  </>
  );
}

export default App;