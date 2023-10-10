import { Field, useFormikContext } from 'formik';
import { PropsWithChildren } from 'react';

interface InputDropProps {
  options: string[];
  name: string;
  id?: string;
}

function InputDrop({ options, children, name, id }: PropsWithChildren<InputDropProps>) {
  const { setFieldValue } = useFormikContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedOptionFromFormik = useFormikContext<any>().values[name];

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setFieldValue(name, selectedValue);
  };

  return (
    <div className="flex-row items-center m-2.5">
      <input
        type="text"
        className="border rounded text-base p-2.5 border-solid border-[#ccc] hover:shadow-[0_0_5px_rgba(0,123,255,0.5)] hover:border-[#007bff] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:border-[#007bff] outline-none"
      />
      <label htmlFor={id} className="text-[18px] font-bold">
        {children}:
        <br />
        <Field
          className="w-full border rounded text-base p-2.5 border-solid border-[#ccc] hover:shadow-[0_0_5px_rgba(0,123,255,0.5)] hover:border-[#007bff] focus:shadow-[0_0_5px_rgba(0,123,255,0.5)] focus:border-[#007bff] outline-none"
          as="select"
          name={name}
          id={id}
          onChange={handleSelectChange}
        >
          <option value="">Selecione uma opção</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Field>
      </label>
      {selectedOptionFromFormik && <p>Você selecionou: {selectedOptionFromFormik}</p>}
    </div>
  );
}

export default InputDrop;
