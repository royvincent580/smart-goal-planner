import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to SMART Goal Planner</h1>
      <p>A financial goal management dashboard to track your savings goals and progress.</p>
      <Link to="/" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;