import { useNavigate } from "react-router-dom";
import { CalculatorHoursForm } from "../../features/calculator-hours";
import TableWorkingTime from "../../features/calculator-hours/table/TableWokingTime";
import { useState } from "react";
import { WorkingTimeInfo } from "../../types/working-info.models";
import { generateUniqueString } from "../../utils/generators-funtions";

const HoursCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  const [workingInfo, setWorkingInfo] = useState<WorkingTimeInfo[]>([]);
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);

  const handleSubmitForm = (recordSubmit: WorkingTimeInfo) => {

    // Formatear horas a decimal
    const jobStartTimeFormat = convertHoursToFloat(recordSubmit.jobStartTime);
    const lunchStartTimeFormat = convertHoursToFloat(recordSubmit.lunchStartTime);
    const lunchEndTimeFormat = convertHoursToFloat(recordSubmit.lunchEndTime);
    const jobEndTimeFormat = convertHoursToFloat(recordSubmit.jobEndTime);

    // Calcular horas
    const totalHours = jobEndTimeFormat - jobStartTimeFormat;
    const totalHoursLunch = lunchEndTimeFormat - lunchStartTimeFormat;

    const totalHoursWorked = totalHours - totalHoursLunch;

    setTotalHoursWorked((prev) => prev + totalHoursWorked);

    const newRecord: WorkingTimeInfo = {
      ...recordSubmit,
      _id: generateUniqueString(),
      // Evita que salga el error Each child in a list should have a unique 'key' prop. React espera que cada elemento de una lista tenga una propiedad key única
      key: generateUniqueString(),
    };
    setWorkingInfo((prev) => [...prev, newRecord]);
  };

  const convertHoursToFloat = (horaString: string) => {
    // Dividir el string en horas y minutos
    const [horas, minutos] = horaString.split(":").map(Number);

    // Convertir las horas y los minutos a un número decimal
    return horas + minutos / 60;
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
        <TableWorkingTime dataSource={workingInfo} dataFooterTable={"Total hours worked: "+totalHoursWorked} />
      </div>
    </div>
  );
};

export default HoursCalculatorPage;
