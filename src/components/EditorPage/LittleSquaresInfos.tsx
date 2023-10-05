/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { Formik, FieldArray, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TextSchema = Yup.object().shape({
  QuadradosPequenos: Yup.array().of(Yup.string()).required('Pelo menos um campo de texto é necessário'),
});

const TextForm: React.FC = () => {
  return (
    <div className="min-w-lg flex flex-col mt-32">
      <h1 className="text-2xl font-semibold mb-4">Editar os pequenos quadrados da pagina</h1>
      <Formik
        initialValues={{ QuadradosPequenos: [''] }}
        validationSchema={TextSchema}
        onSubmit={values => {
          console.log('Valores enviados:', values);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="QuadradosPequenos">
              {({ remove, push }) => (
                <div>
                  {values.QuadradosPequenos.map((text, index) => (
                    <div key={index} className="mb-2 flex items-center">
                      <Field
                        type="text"
                        name={`QuadradosPequenos[${index}]`}
                        placeholder="Digite um texto"
                        className="w-full border rounded-md py-2 px-3"
                      />
                      <button
                        type="button"
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => remove(index)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Adicionar novo quadrado pequeno
                  </button>
                </div>
              )}
            </FieldArray>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os textos antigos serão removidos.</p>
            <ErrorMessage name="QuadradosPequenos" component="div" className="text-red-500" />
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TextForm;
