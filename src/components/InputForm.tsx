import { Input } from "antd";
import InputFormProps from "../types/PropsComponetsTypes";
import { ErrorMessage, useField } from "formik";

const InputForm = ({
  id,
  type,
  name,
  disableInput,
  ...props
}: InputFormProps) => {
  const [field, meta] = useField(name);

  return (
    <div className="flex flex-col">
      <Input
        {...field}
        {...props}
        id={id}
        type={type}
        status={meta.touched && meta.error ? "error" : undefined}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
      />
      <div className="min-h-[20px]">
        <ErrorMessage
          className="text-red-500 text-sm mt-1"
          name={name}
          component="div"
        />
      </div>
    </div>
  );
};

export default InputForm;