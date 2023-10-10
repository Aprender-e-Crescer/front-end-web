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
    <div className="flex-row items-center m-2.5">
      <label className="text-[18px] font-bold" htmlFor={id}>
        {children}:
        <Field
          className="border rounded text-base p-2.5 border-solid border-[#ccc] hover:shadow-[0_0_5px_rgba(0,123,255,0.5)] hover:border-[#007bff] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:border-[#007bff] outline-none w-full"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </label>
    </div>
  );
}

export default Input;
