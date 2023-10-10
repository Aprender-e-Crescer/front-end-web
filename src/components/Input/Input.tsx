import './Input.css';
import { Field } from 'formik';

interface InputProps {
  placeholder?: string;
  children?: React.ReactNode;
  type?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

function Input({ placeholder, children, type = 'text', required = false, name, id }: InputProps) {
  return (
    <div className="containerInput">
      <label className="label" htmlFor={id}>
        {children}:
        <Field className="input w-full" id={id} name={name} type={type} placeholder={placeholder} required={required} />
      </label>
    </div>
  );
}
export default Input;
