import * as Yup from "yup";

export const validationSchemaCalculator = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .min(1, "Price must be greater than 0")
    .required("Price is required"),
  category: Yup.string().required("Product category is required"),
});

export const validationSchema = Yup.object({
  jobStartTime: Yup.string()
    .required("La hora de entrada al trabajo es requerida")
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Formato de hora no válido (HH:mm)"
    ),
 
  isLunchBreakRequired: Yup.boolean(),
 
  // El método when() se usa para validaciones condicionales
  // Primer argumento: Array de campos de los que depende la validación ["isLunchBreakRequired"]
  // Segundo argumento: Función callback que recibe:
  //   - Primer parámetro: Array con los valores de los campos dependientes [isLunchBreakRequired]
  //   - Segundo parámetro: El schema actual (schema)
  lunchStartTime: Yup.string().when(
    ["isLunchBreakRequired", "jobStartTime"],
    ([isLunchBreakRequired, jobStartTime], schema) => {
      // Si isLunchBreakRequired es true, aplicamos validaciones
      // Si es false, el campo será nullable() (opcional)
      return isLunchBreakRequired
        ? schema
            .required("La hora de salida al almuerzo es requerida")
            .matches(
              /^([01]\d|2[0-3]):([0-5]\d)$/,
              "Formato de hora no válido (HH:mm)"
            )
            .test(
              "after-start-job", // Cambié el nombre para que sea más descriptivo
              "La hora de salida al almuerzo debe ser posterior a la hora de entrada del trabajo",
              (value) => !jobStartTime || !value || value > jobStartTime
            )
        : schema.nullable();
    }
  ),
 
  // Este when() depende de dos campos: isLunchBreakRequired y lunchStartTime
  // Los valores se reciben en el mismo orden que se declaran en el array
  lunchEndTime: Yup.string().when(
    ["isLunchBreakRequired", "lunchStartTime", "jobEndTime"],
    ([isLunchBreakRequired, lunchStartTime, jobEndTime], schema) => {
      return isLunchBreakRequired
        ? schema
            .required("La hora de entrada del almuerzo es requerida")
            .matches(
              /^([01]\d|2[0-3]):([0-5]\d)$/,
              "Formato de hora no válido (HH:mm)"
            )
            // test() permite crear validaciones personalizadas
            // Primer argumento: nombre único del test
            // Segundo argumento: mensaje de error
            // Tercer argumento: función que retorna true si la validación pasa
            .test(
              "after-lunch-start",
              "La hora de regreso debe ser posterior a la hora de almuerzo",
              (value) => !lunchStartTime || !value || value > lunchStartTime
            )
            .test(
              "before-end-job", // Cambié el nombre para que sea más descriptivo
              "La hora de regreso debe ser anterior a la hora de salida del trabajo",
              (value) => !jobEndTime || !value || value < jobEndTime
            )
        : schema.nullable();
    }
  ),
 
  jobEndTime: Yup.string()
    .required("La hora de salida del trabajo es requerida")
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Formato de hora no válido (HH:mm)"
    )
    // Ejemplo de when() con una sola dependencia
    // La sintaxis es la misma pero solo recibimos un valor en el array
    .when(
      ["jobStartTime"],
      ([jobStartTime], schema) => {
        return schema.test(
          "after-job-start",
          "La hora de salida debe ser posterior a la hora de entrada",
          (value) => !jobStartTime || !value || value > jobStartTime
        );
      }
    ),
 });
 
 /**
 * Notas adicionales sobre el uso de when():
 * 
 * 1. Siempre necesita un array como primer argumento, incluso si solo hay una dependencia
 * 2. La función callback siempre recibe un array con los valores en el primer parámetro
 * 3. El schema que se recibe como segundo parámetro es el schema actual del campo
 * 4. Se pueden encadenar múltiples when() si se necesitan diferentes condiciones
 * 5. Se puede usar with test() para validaciones más complejas
 * 6. nullable() marca el campo como opcional
 */
