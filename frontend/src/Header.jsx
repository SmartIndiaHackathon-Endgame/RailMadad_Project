
import './Header.css';

function Header() {
  return (
    <div>
      <h3>RailResolve</h3>
      
      <div className="container">
        <img className="img1" src="https://i.pinimg.com/474x/8d/f4/7a/8df47a9e22716c4ca19aeb872e60c760.jpg" alt="" />
        <nav className="bar">
          <span className="search-bar">
            <a href=""><span className="home">Home</span></a>
            <a href="">Complaint</a>
            <a style={{ color: 'red' }} href="">Emergency</a>
            <a href="">Contact</a>
          </span>
        </nav>
        <img className="img2" src="unnamed.png" alt="" />
      </div>

      <div className="box">
        <p className="intro">Hello I am RailResolve and I am here to fix any kind of problem that you are facing in your journey with our Indian Railways. Hope you have a happy trip :)</p>
        <div className="glass">
          <div className="rail">
            <p>RailResolve</p>
          </div>
          <div className="check">
            <input id="hi" type="text" className="search" placeholder="how can I help you?" />
            <div className="questions">
              <br /><br /><br />
              <p>Find me available trains for tomorrow</p>
              <p>Someone took my seat. What should I do?</p>
              <p>My seat is dirty. Someone help</p>
              <p>I lost my bag. Need help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;