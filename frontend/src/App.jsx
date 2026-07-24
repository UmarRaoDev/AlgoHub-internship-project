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
import { BrowserRouter,Route,Routes,useLocation } from "react-router-dom";


import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./pages/AdminUsers" ;
import Profile from "./pages/Profile";

import { useEffect } from "react";
import Technologies from "./pages/Technologies";
import Internship from "./pages/Internship";
 import { AuthProvider } from "./context/AuthContext";
   import Login from "./pages/Login";
   import Register from "./pages/Register";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <>
    
    <BrowserRouter>
    <AuthProvider>
    <ScrollToTop/>
    <Navbar/>

    
    
    <Routes>
     <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />

     <Route
     path="/profile"
     element={
       <ProtectedRoute>
         <Profile />
       </ProtectedRoute>
     }
   />
    <Route path="/" element={<Hero/>}/>

  <Route
  path="/admin/users"
  element={
    <ProtectedRoute roles={["admin", "editor"]}>
      <AdminUsers />
    </ProtectedRoute>
  }
/>

    <Route path="/about" element={<About/>}/>

     <Route path="/services" element={<Services/>}/>
        
       <Route path="/courses" element= {<ProtectedRoute>
            <Courses/>
            </ProtectedRoute>
            
            }/>
      
         <Route path="/faq" element={<FAQ/>}/>
         <Route path="/contact" element={<Contact/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
          <Route path="/technologies" element={<Technologies/>}/>
           <Route path="/team" element={<Team/>}/>
           
            <Route path="/internship" element=
            
            {<ProtectedRoute>
            <Internship/>
            </ProtectedRoute>
            
            }/>
            






  </Routes>
  <Footer/>
  </AuthProvider>
  </BrowserRouter>
  
  </>
  );
}

export default App;