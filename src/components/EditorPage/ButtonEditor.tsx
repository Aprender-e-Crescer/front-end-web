/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  textInputs: string[];
}

const TextSchema = Yup.object().shape({
  textInputs: Yup.array().of(Yup.string()).required('Pelo menos um campo de texto é necessário'),
});

const TextInputForm: React.FC = () => {
  return (
    <div className="min-w-lg flex flex-col mt-32">
      <h1 className="text-2xl font-semibold mb-4">Editar o botão de inscrição</h1>
      <Formik
        initialValues={{ textInputs: [''] }}
        validationSchema={TextSchema}
        onSubmit={values => {
          console.log('Valores enviados:', values);
        }}
      >
        {({ values }) => (
          <Form>
            {values.textInputs.map((text, index) => (
              <div key={index} className="mb-2 flex items-center">
                <Field
                  type="text"
                  name={`textInputs[${index}]`}
                  placeholder="Digite um texto"
                  className="w-60 h-20 border rounded-md py-2 px-3"
                />
              </div>
            ))}
            <p className="text-sm text-gray-800">Ao clicar em salvar, os textos antigos serão atualizados.</p>
            <ErrorMessage name="textInputs" component="div" className="text-red-500" />
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TextInputForm;
