import { Link } from "react-router-dom";
import "./Home.css";
import Sos from "./SOS";
import Header from "./Header";


const Home = () => {
  return (
    <>

    <Header/>
    <div className="home-container">
      {/* Hero Section */}
        <div className="container">
            <img src="" alt="" />
        </div>
      
      {/* Features Section */}
      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Complaint</h3>
            <p>Upload your complaint here.</p>
            <Link to="/complaint" className="feature-button">
              Click Here
            </Link>
          </div>
          <div className="feature-card">
            <h3>SOS</h3>
            <p>Send SOS.</p>
                <Sos></Sos>
          </div>
          <div className="feature-card">
            <h3>Complaints</h3>
            <p>Check your complaint.</p>
            <Link to="/ComplaintList" className="feature-button">
              Click here
            </Link>
          </div>
          <div className="feature-card">
            <h3>Image detection</h3>
            <p>Upload your Image</p>
            <Link to="/Image" className="feature-button">
              Click here
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Railway Resolve is dedicated to improving the travel experience for
          passengers. We offer solutions for common railway issues and provide
          useful resources to ensure safety, comfort, and legal guidance.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Railway Resolve | All Rights Reserved</p>
        <div className="footer-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
          <a href="#!">Contact Us</a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home;
