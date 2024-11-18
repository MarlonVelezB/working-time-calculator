import { useNavigate } from "react-router-dom";
import { CalculatorHoursForm } from "../../features/calculator-hours";

const HoursCalculatorPage: React.FC = () => {

  const navigate = useNavigate();

  const goBackHome = () => {
    navigate('/');
  }

  return (
    <div>
      <button onClick={goBackHome}>Go back Home</button>
      <div>
        <CalculatorHoursForm />
      </div>
    </div>
  );
};

export default HoursCalculatorPage;
