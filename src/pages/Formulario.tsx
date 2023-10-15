/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input/Input';
import InputDrop from '../components/inputDrop/InputDrop';
import { HTTP } from '../services/api';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import { HeaderFront } from '../components/HeaderFront';
import { Button, Modal, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);

export function Formulario() {
  const navigate = useNavigate();
  function redirect() {
    navigate('/');
    console.log('oi');
  }
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const props = { openModal, setOpenModal };

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
    const isFormValid = fieldsWithName.every(field => !field.required || !!values[field.name]);

    if (isFormValid) {
      try {
        await HTTP.post('salva/dados', values);
        getData();
        setIsLoading(false);
        setOpenModal('pop-up');
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        setIsLoading(false);
        setOpenModal('pop-up-error');
      }
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <section className="relative transition-transform duration-[0.3s] ease-[ease-in-out] mx-auto my-0">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
            {({ errors, touched, isValid }) => (
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
                    disabled={!isValid}
                  >
                    Enviar
                  </button>
                </div>
                <Spinner aria-label="Default status example" />;
              </Form>
            )}
          </Formik>
        </section>
      </div>
      <Modal
        show={props.openModal === 'pop-up'}
        size="md"
        popup
        onClose={() => {
          props.setOpenModal(undefined);
          navigate('/');
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Formulário enviado com sucesso!
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  props.setOpenModal(undefined);
                  redirect();
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={props.openModal === 'pop-up-error'}
        size="md"
        popup
        onClose={() => {
          props.setOpenModal(undefined);
          navigate('/');
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Erro ao enviar formulário</h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  props.setOpenModal(undefined);
                  redirect();
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
