import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import { useState, useEffect } from 'react';
import Input from '../components/Input/Input';
import InputDrop from '../components/inputDrop/InputDrop';
import { HTTP } from '../services/api';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import { HeaderFront } from '../components/HeaderFront';

Yup.setLocale(pt);
export function Formulario() {
  // TODO - create type for response data
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await HTTP.get('api/form/ac');
      const result = response.data;
      setData(result);
    } catch (error) {
      // eslint-disable-next-line no-console
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

  const initialValues: { [key: string]: string } = {};

  fieldsWithName.forEach(field => {
    initialValues[field.name] = '';
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await HTTP.post('salva/dados', values);

      getData();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <section className="relative transition-transform duration-[0.3s] ease-[ease-in-out] mx-auto my-0">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
            {({ errors, touched }) => (
              <Form
                style={{ fontFamily: 'Arial, sans-serif' }}
                className="flex flex-col bg-[#f7f7f7] border m-auto p-5 rounded-[10px] border-solid border-[#ccc]"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src="/img/aprendereCrescer2.png" alt="" style={{ width: '150px', height: '150px' }} />
                  <h1 className="title">Inscrever-se para o programa de qualificação Aprender e Crescer</h1>
                </div>
                {fieldsWithName.map(field => (
                  <div key={field.label}>
                    {field.options ? (
                      <div>
                        <InputDrop name={field.name} options={field.options}>
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
                <div className="flex justify-between">
                  <button
                    className="bg-[#fa3333] text-[white] cursor-pointer px-5 py-2.5 rounded-[10px] border-[none] hover:bg-[#d33f3f]"
                    type="reset"
                  >
                    Limpar Formulário
                  </button>
                  <button
                    className="bg-[#007bff] text-[white] cursor-pointer px-5 py-2.5 rounded-[10px] border-[none] hover:bg-[#267edd]"
                    type="submit"
                  >
                    Enviar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
