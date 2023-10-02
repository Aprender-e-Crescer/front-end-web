import "./Input.css";
import { Field } from "formik";

const Input = ({ placeholder, children, type, required, name, id }) => {


  return (
    <div className="containerInput">
      <label className="label">{children}:</label>
      <Field
        className="input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
export default Input;
