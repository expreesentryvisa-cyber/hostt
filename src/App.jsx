import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Vevo from "./components/vevo";
import VEVOApp from "./Admin/AdminPanel";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* Homepage */}
          <Route
            path="/"
            element={
              <>
              <Header/>
                <Hero />
                <section className="alerts-section container">
                  <div className="alert-box">
                    <p>
                      People impacted by conflict in the State of Palestine or
                      Israel can find more information on Hamas-Israel Conflict:
                      Visa Support and financial assistance.
                    </p>
                  </div>
                  <div className="alert-box">
                    <p>
                      People impacted by the conflict in Iran can find more
                      information on Iran Visa Support.
                    </p>
                  </div>
                </section>
                <Features />
                <Testimonials />
                <Contact />
                <Footer />

              </>
            }
          />

          {/* Features Page */}
          <Route path="/immiaccount" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Testimonials Page */}
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />
           <Route path="/vevo" element={<Vevo />} />
           <Route path="/adminonly" element={<VEVOApp />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
