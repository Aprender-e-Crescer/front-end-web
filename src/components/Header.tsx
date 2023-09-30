/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
import React from 'react';
import * as Yup from 'yup';
import { Field, Form, FormikProvider, useFormik } from 'formik';

// Validação Yup para o formulário do cabeçalho
const headerSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  subtitle: Yup.string().required('Subtítulo é obrigatório'),
  logoUrl: Yup.string().required('Você precisa inserir um link').url('O link inserido está erradou ou não existe'),
});

const HeaderComponent: React.FC = () => {
  const initialValues = {
    title: '',
    subtitle: '',
    logoUrl: '',
  };

  const handleSubmit = (values: unknown) => {
    console.log('Valores do formulário:', values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: headerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para alterar o titulo e a logo da pagina.</h1>

          <div className="flex flex-col">
            <label htmlFor="title">Título</label>
            <Field
              type="text"
              name="title"
              id="title"
              placeholder="Título"
              className="h-10 w-auto border rounded-md p-2"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-600">{formik.errors.title}</div>
            ) : null}
          </div>

          <div className="flex flex-col">
            <label htmlFor="subtitle">Subtítulo</label>
            <Field
              type="text"
              name="subtitle"
              id="subtitle"
              placeholder="Subtítulo"
              className="h-10 w-auto border rounded-md p-2"
            />
            {formik.touched.subtitle && formik.errors.subtitle ? (
              <div className="text-red-600">{formik.errors.subtitle}</div>
            ) : null}
          </div>

          <div className="flex flex-col ">
            <label htmlFor="logoUrl">Insira o link da logo</label>
            <Field
              type="text"
              name="logoUrl"
              id="logoUrl"
              placeholder="Link"
              className="h-10 w-auto border rounded-md p-2"
            />
            {formik.touched.logoUrl && formik.errors.logoUrl ? (
              <div className="text-red-600">{formik.errors.logoUrl}</div>
            ) : null}
          </div>

          <div>
            <p className="text-sm text-gray-800">
              Ao clicar em salvar, o titulo, subtitulo e logo antigos, seram removidos.
            </p>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default HeaderComponent;
