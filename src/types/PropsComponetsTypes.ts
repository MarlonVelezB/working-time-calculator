// Las interfaces para las props de los componentes

import { InputProps } from "antd";
import { InputStatus } from "antd/es/_util/statusUtils";

export default interface InputFormProps extends InputProps {
  id: string;
  type: string;
  name: string;
  textError?: string;
  status?: InputStatus;
  disableInput?: boolean;
}

export default interface ButtonComponentProps {
    
}
