import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik'; // Importe useFormikContext
import './InputDrop.modules.css';

const InputDrop = ({ options, children, name, id }) => {

  const { setFieldValue } = useFormikContext();
  const selectedOptionFromFormik = useFormikContext().values[name];

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setFieldValue(name, selectedValue);
  };

  return (
    <div className="containerInput">
      <label>{children}:</label>
      <Field as="select" name={name} id={id} onChange={handleSelectChange}>
        <option value="">Selecione uma opção</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
      {selectedOptionFromFormik && <p>Você selecionou: {selectedOptionFromFormik}</p>}
    </div>
  );
};

export default InputDrop;
