import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

// Import local images
import CloudImg from "../../assets/cloud_img.png";
import IoTKitImg from "../../assets/iot_kit.png";

const token = localStorage.getItem('token');

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      const user = localStorage.getItem("user");
      console.log("User in localStorage:", user);
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      console.log("Redirecting to Channels...");
      navigate("/channels");
    } else {
      console.log("Redirecting to Sign-in...");
      navigate("/signin");
    }
  };

  return (
    <>
      <Navbar />
      <div className="Home">
        {/* About Section as Main Section */}
        <main id="about" className="about-section container py-5 min-vh-100 d-flex align-items-center">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-6">
              <h2 style={{ fontSize: '42px' }}>Welcome to Xtrans Cloud</h2>
              <p>
                Discover how Xtrans combines cutting-edge technologies to transform IoT projects with advanced analytics,
                seamless integration, and intelligent automation.
              </p>
<<<<<<< HEAD
              <button onClick={handleGetStartedClick} className="btn btn-primary mt-4 mb-3">
                Get started
              </button>
=======
              <Link 
                to={token ? "/channels" : "/signin"} 
                className="btn btn-primary mt-4 mb-3"
              >
                Get started
              </Link>
>>>>>>> aa785cbeeff615d95b145231386840d818441eb6
            </div>
            <div className="col-md-6 text-center">
              <img src={CloudImg} alt="IoT Cloud Visualization" className="img-fluid rounded" />
            </div>
          </div>
        </main>

        {/* Services Section */}
        <section id="services" className="services-section container py-5 bg-light">
          <div className="text-center mb-5">
            <h2>Our Services</h2>
            <p>Explore the range of services we offer to empower your IoT projects.</p>
          </div>
          <div className="row text-center gy-4">
            <div className="col-md-4">
              <div className="service-item">
                <i className="bi bi-cloud-arrow-up-fill service-icon"></i>
                <h3>Cloud Analytics</h3>
                <p>Aggregate, visualize, and analyze live data streams seamlessly in the cloud.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-item">
                <i className="bi bi-gear-fill service-icon"></i>
                <h3>AIoT Solutions</h3>
                <p>Integrate AI and IoT for smarter, data-driven decision-making.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-item">
                <i className="bi bi-graph-up-arrow service-icon"></i>
                <h3>Real-Time Monitoring</h3>
                <p>Monitor and optimize operations with real-time insights and alerts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="stats-section container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={IoTKitImg} alt="AIoT Kit" className="img-fluid rounded" />
            </div>
            <div className="col-md-6">
              <h2>Why Choose Us</h2>
              <p>
                Our platform is trusted by industry leaders to drive innovation, enhance productivity, and deliver
                exceptional results in IoT projects.
              </p>
              <div className="row mt-4">
                <div className="col-4 text-center">
                  <h3 className="stat-number" data-purecounter-start="0" data-purecounter-end="3000" data-purecounter-duration="1">3000+</h3>
                  <p>Happy Clients</p>
                </div>
                <div className="col-4 text-center">
                  <h3 className="stat-number" data-purecounter-start="0" data-purecounter-end="1200" data-purecounter-duration="1">1200+</h3>
                  <p>Projects</p>
                </div>
                <div className="col-4 text-center">
                  <h3 className="stat-number" data-purecounter-start="0" data-purecounter-end="150" data-purecounter-duration="1">150+</h3>
                  <p>Partners</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="/channels" className="nav-link px-2 text-body-secondary">Channels</a></li>
            <li className="nav-item"><a href="/contact" className="nav-link px-2 text-body-secondary">Contact</a></li>
            <li className="nav-item"><a href="/documentation" className="nav-link px-2 text-body-secondary">Documentation</a></li>
          </ul>
          <p className="text-center text-body-secondary">© 2025 Xtrans Solutions</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
