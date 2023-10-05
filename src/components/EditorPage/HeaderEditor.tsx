/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, FormikProvider, useFormik } from 'formik';

const headerSchema = Yup.object().shape({
  logoFile: Yup.mixed()
    .required('Você precisa selecionar um arquivo')
    .test('fileSize', 'O arquivo é muito grande', value => {
      if (!value) return true; // No file selected, so no size to check
      return value.size <= 10000000; // 5 MB
    }),
});

const HeaderComponent: React.FC = () => {
  const initialValues = {
    logoFile: null,
  };

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleSubmit = async (values: { logoFile: File | null }) => {
    if (values.logoFile) {
      const base64String = await convertToBase64(values.logoFile);
      console.log('Arquivo em base64:', base64String);
      setImageBase64(base64String);
    }
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: headerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para alterar a logo principal da página.</h1>

          <div className="flex flex-col">
            {imageBase64 && (
              <div>
                <img src={imageBase64} alt="Imagem em base64" className="w-60 h-52" />
              </div>
            )}

            <label htmlFor="logoFile">Selecione um arquivo de imagem</label>
            <input
              type="file"
              name="logoFile"
              id="logoFile"
              accept="image/*"
              onChange={event => {
                formik.setFieldValue('logoFile', event.currentTarget.files?.[0] || null);
              }}
            />
            {formik.touched.logoFile && formik.errors.logoFile ? (
              <div className="text-red-600">{formik.errors.logoFile}</div>
            ) : null}
          </div>

          <div>
            <p className="text-sm text-gray-800">Ao clicar em salvar, o título e a logo antigos serão removidos.</p>
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
