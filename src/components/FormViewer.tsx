import { Formik, Form } from 'formik';
import { Spinner } from 'flowbite-react';
import { When } from 'react-if';
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';
import Input from './Input';
import InputDrop from './InputDrop';
import { FormModal } from './FormViewer/components/FormModal';

Yup.setLocale(pt);

interface Props {
  handleSubmit: (values: any) => void;
  fields: any[];
  isLoading: boolean;
  isModalOpen: boolean;
  modalTitle?: string;
  handleModalClose?: () => void;
  srcMainImage?: string;
  mainTitle: string;
}

export default function FormViewer({
  handleSubmit,
  isLoading,
  isModalOpen,
  modalTitle,
  handleModalClose,
  fields,
  mainTitle,
  srcMainImage,
}: Props) {
  const fieldsWithName = fields.map(field => ({
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

  return (
    <>
      <section className="relative transition-transform duration-[0.3s] ease-[ease-in-out] mx-auto my-0">
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schema}>
          {({ errors, touched, isValid }) => (
            <Form
              style={{ fontFamily: 'Arial, sans-serif' }}
              className="flex flex-col bg-[#f7f7f7] border m-auto p-5 rounded-[10px] border-solid border-[#ccc]"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {srcMainImage && <img src={srcMainImage} alt="" style={{ width: '150px', height: '150px' }} />}
                <h1 className="title">{mainTitle}</h1>
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
                  className="bg-[#007bff] text-[white] cursor-pointer px-5 py-2.5 rounded-[10px] border-[none] hover:bg-[#267edd] flex gap-2"
                  type="submit"
                  disabled={!isValid || isLoading}
                >
                  <When condition={isLoading}>
                    <Spinner className="w-5 h-5" color="failure" aria-label="Default status example" />
                  </When>
                  Enviar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
      <FormModal openModal={isModalOpen} title={modalTitle} handleClose={handleModalClose} />
    </>
  );
}
