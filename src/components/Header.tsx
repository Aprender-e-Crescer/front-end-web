import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Field, Form, FormikProvider } from 'formik';

// Validação Yup para o formulário do cabeçalho
const headerSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  subtitle: Yup.string().required('Subtítulo é obrigatório'),
  logoUrl: Yup.string().url('URL da logo inválida'),
});

const HeaderComponent: React.FC = () => {
  const initialValues = {
    title: '',
    subtitle: '',
    logoUrl: '',
  };

  const handleSubmit = (values: any) => {
    // Lida com a submissão do formulário aqui
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
        <div>

          {/* Exibe mensagens de erro */}
          {formik.touched.logoUrl && formik.errors.logoUrl ? (
            <div className="text-red-500">{formik.errors.logoUrl}</div>
          ) : null}

          <div className='flex flex-col'>
            <label htmlFor="title">Título</label>
            <Field type="text" name="title" id="title" placeholder="Título" />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}

          <div className='flex flex-col'>
            <label htmlFor="subtitle">Subtítulo</label>
            <Field type="text" name="subtitle" id="subtitle" placeholder="Subtítulo" />
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="logoUrl">URL da Logo</label>
            <Field type="text" name="logoUrl" id="logoUrl" placeholder="Link" className="h-10 w-auto border rounded p-2" />
          </div>
          {formik.touched.subtitle && formik.errors.subtitle ? (
            <div className="text-red-500">{formik.errors.subtitle}</div>
          ) : null}

          <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default HeaderComponent;
