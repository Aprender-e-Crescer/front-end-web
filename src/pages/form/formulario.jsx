/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/input/Input.jsx';
import InputDrop from '../../components/inputDrop/InputDrop.jsx';
import './Form.css';
import { pt } from 'yup-locale-pt';
import { useState, useEffect } from 'react';
import { HTTP } from '../../services/api.tsx';

Yup.setLocale(pt);
export function Formulario() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await HTTP.get('api/form/ac');
      const result = response.data;
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const fieldsWithName = data.map(field => ({
    ...field,
    name: `${field.label.toLowerCase().replaceAll(' ', '-')}-${field.id}`,
  }));

  const schema = Yup.object().shape(
    fieldsWithName.reduce((acc, field) => {
      acc[field.name] = field.required ? Yup.string().required().label(field.label) : Yup.string().label(field.label);
      return acc;
    }, {}),
  );

  const initialValues = {};
  const validationSchema = {};

  fieldsWithName.forEach(field => {
    initialValues[field.name] = '';
    validationSchema[field.name] = field.required ? Yup.string().required('Campo obrigatório') : Yup.string();
  });

  const handleSubmit = async values => {
    try {
      await HTTP.post('salva/dados', values);

      getData();
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return (
    <section className="sectionForm">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
        {({ errors, touched }) => (
          <Form className="form">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src="/img/aprendereCrescer2.png" alt="" style={{ width: '150px', height: '150px' }} />
              <h1 className="title">Inscrever-se para o programa de qualificação Aprender e Crescer</h1>
            </div>
            {fieldsWithName.map(field => (
              <div key={field.label}>
                {field.options ? (
                  <div>
                    <InputDrop
                      fieldsWithName={fieldsWithName}
                      name={field.name}
                      type={field.type}
                      options={field.options}
                      placeholder={field.placeholder}
                      required={field.required}
                    >
                      {field.label}
                    </InputDrop>
                    {errors[field.name] && touched[field.name] ? (
                      <div className="error" style={{ color: 'red' }}>
                        {errors[field.name]}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <Input
                      fieldsWithName={fieldsWithName}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                    >
                      {field.label}
                    </Input>
                    {errors[field.name] && touched[field.name] ? (
                      <div className="error" style={{ color: 'red' }}>
                        {errors[field.name]}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
            <div className="buttons">
              <button className="buttoncleanform" type="reset">
                Limpar Formulário
              </button>
              <button className="button" type="submit">
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
