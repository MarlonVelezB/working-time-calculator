import { useNavigate } from "react-router-dom";
import { CalculatorHoursForm } from "../../features/calculator-hours";
import TableComponent from "../../components/table/TableComponent";
import { useState } from "react";
import { WorkingTimeInfo } from "../../types/working-info.models";
import { generateUniqueString } from "../../utils/generators-funtions";

const HoursCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  const [workingInfo, setWorkingInfo] = useState<WorkingTimeInfo[]>([]);

  const handleSubmitForm = (recordSubmit: WorkingTimeInfo) => {

    const newRecord: WorkingTimeInfo = {
      ...recordSubmit,
      _id: generateUniqueString(),
      // Evita que salga el error Each child in a list should have a unique 'key' prop. React espera que cada elemento de una lista tenga una propiedad key única
      key: generateUniqueString() 
    };
    setWorkingInfo((prev) => [...prev, newRecord]);
  };

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={goBackHome}>Go back Home</button>
      <div>
        <CalculatorHoursForm
          hanbleSubmitForm={(data: any) => handleSubmitForm(data)}
        />
      </div>
      <div>
        <TableComponent dataSource={workingInfo} />
      </div>
    </div>
  );
};

export default HoursCalculatorPage;
