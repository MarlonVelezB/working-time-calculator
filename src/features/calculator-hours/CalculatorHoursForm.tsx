// CalculatorHoursForm.tsx
import { Formik, Form } from "formik";
import { InputForm } from "../../components";
import { validationSchema } from "./validationSchemaCalculator";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

const CalculatorHoursForm = () => {
  const [isRequiredField, setIsRequiredField] = useState<boolean>(true);

  const initialValues = {
    jobStartTime: "",
    lunchStartTime: "",
    lunchEndTime: "",
    jobEndTime: "",
    isLunchBreakRequired: true, // Agregado a los valores iniciales
  };

  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
  };

  // Manejo del cambio en el checkbox
  const handleCheckboxChange = (
    e: CheckboxChangeEvent,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("isLunchBreakRequired", e.target.checked); // Actualiza el valor en Formik
    setIsRequiredField(e.target.checked);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <Checkbox
              id="isLunchBreakRequired"
              name="isLunchBreakRequired"
              checked={values.isLunchBreakRequired}
              onChange={(e) => handleCheckboxChange(e, setFieldValue)}
              className="text-white"
            >
              Did you have time for lunch?
            </Checkbox>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center w-full">
            <div>
              <label htmlFor="jobStartTime">Job Start Time</label>
              <InputForm id="jobStartTime" name="jobStartTime" type="text" />
            </div>

            <div>
              <label htmlFor="lunchStartTime">Lunch Start Time</label>
              <InputForm
                id="lunchStartTime"
                name="lunchStartTime"
                type="text"
                disabled={!isRequiredField}
              />
            </div>

            <div>
              <label htmlFor="lunchEndTime">Lunch End Time</label>
              <InputForm
                id="lunchEndTime"
                name="lunchEndTime"
                type="text"
                disabled={!isRequiredField}
              />
            </div>

            <div>
              <label htmlFor="jobEndTime">Job End Time</label>
              <InputForm id="jobEndTime" name="jobEndTime" type="text" />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CalculatorHoursForm;
