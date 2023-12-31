import { Field } from 'formik';

interface InputProps {
  placeholder?: string;
  label?: React.ReactNode;
  type?: string;
  required?: boolean;
  name?: string;
  id?: string;
  isDisabled?: boolean;
}

function Input({ placeholder, label, type = 'text', required = false, name, id, isDisabled }: InputProps) {
  return (
    <div className="flex-row items-center m-2.5">
      <label className="text-[18px] font-bold" htmlFor={id}>
        {label}:
        <br />
        <Field
          className="border rounded text-base p-2.5 border-solid border-[#ccc] hover:shadow-[0_0_5px_rgba(0,123,255,0.5)] hover:border-[#007bff] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:border-[#007bff] outline-none w-full"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={isDisabled}
        />
      </label>
    </div>
  );
}

export default Input;
