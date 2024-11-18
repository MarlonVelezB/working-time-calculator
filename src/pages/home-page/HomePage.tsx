import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/calculator');
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p className="mb-10">
        This is where the content for the home page will go.
      </p>
      <button onClick={handleButtonClick}>Go to Calculator</button>

    </div>
  );
};

export default HomePage;
