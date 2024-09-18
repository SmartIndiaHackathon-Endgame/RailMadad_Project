import "./HomePage1.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo-container">
          <img src="/rail-madad-logo.png" alt="Rail Madad Logo" className="logo" />
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#complaints">Complaints</a></li>
            <li><a href="#about">About</a></li>

          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="title">RailResolve</h1>
        <p className="subtitle">How can we help you?</p>
        
        <ul className="query-options">
          <li><span>🚨</span> File a complaint or track your complaint</li>
          <li><span>📞</span> Need to speak with your local railway office?</li>
          <li><span>❓</span> My query is not in the list</li>
          <li><span>⚠️</span> I want to flag a safety or security issue</li>
          
        </ul>
        
        <input
          type="text"
          placeholder="Enter your location here to begin"
          className="location-input"
        />
      </main>

      <footer className="footer">
        <p>© 2024 RailResolve Hackathon</p>
      </footer>
    </div>
  );
};

export default HomePage;
