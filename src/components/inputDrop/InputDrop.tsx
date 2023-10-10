import { Field, useFormikContext } from 'formik'; // Importe useFormikContext
import './InputDrop.modules.css';
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
    <div className="containerInput">
      <input type="text" />
      <label htmlFor={id}>
        {children}:
        <Field className="w-full" as="select" name={name} id={id} onChange={handleSelectChange}>
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
