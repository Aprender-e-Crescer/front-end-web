/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

const headerSchema = Yup.object().shape({
  logoFiles: Yup.array()
    .of(
      Yup.mixed().test('fileSize', 'O arquivo é muito grande', value => {
        if (!value) return true; // No file selected, so no size to check
        return value.size <= 5000000; // 5 MB
      }),
    )
    .min(1, 'Pelo menos um arquivo é necessário'),
});

const HeaderComponent: React.FC = () => {
  const initialValues = {
    logoFiles: [null],
  };

  const [imageBase64List, setImageBase64List] = useState<(string | null)[]>([null]);

  const handleSubmit = async (values: { logoFiles: File[] }) => {
    const base64Promises = values.logoFiles.map(async file => {
      if (file) {
        return await convertToBase64(file);
      }
      return null;
    });

    const base64Strings = await Promise.all(base64Promises);

    console.log('Arquivos em base64:', base64Strings);
    setImageBase64List(base64Strings);
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

  const addFileInput = () => {
    formik.setFieldValue('logoFiles', [...formik.values.logoFiles, null]);
    setImageBase64List([...imageBase64List, null]);
  };

  const removeFileInput = (index: number) => {
    const updatedFiles = [...formik.values.logoFiles];
    updatedFiles.splice(index, 1);
    formik.setFieldValue('logoFiles', updatedFiles);

    const updatedBase64List = [...imageBase64List];
    updatedBase64List.splice(index, 1);
    setImageBase64List(updatedBase64List);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para alterar a logo principal da página.</h1>

          {formik.values.logoFiles.map((_, index) => (
            <div key={index} className="flex flex-col">
              {imageBase64List[index] && (
                <div>
                  <img src={imageBase64List[index]} alt={`Imagem ${index + 1} em base64`} className="w-60 h-52" />
                </div>
              )}

              <label htmlFor={`logoFile${index}`}>Selecione um arquivo de imagem</label>
              <input
                type="file"
                name={`logoFiles[${index}]`}
                id={`logoFile${index}`}
                accept="image/*"
                onChange={event => {
                  formik.setFieldValue(`logoFiles[${index}]`, event.currentTarget.files?.[0] || null);
                }}
              />
              {formik.touched.logoFiles && formik.errors.logoFiles && formik.errors.logoFiles[index] ? (
                <div className="text-red-600">{formik.errors.logoFiles[index]}</div>
              ) : null}

              <button
                type="button"
                onClick={() => removeFileInput(index)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
              >
                Remover
              </button>
            </div>
          ))}

          <div>
            <p className="text-sm text-gray-800">Ao clicar em salvar, o título e a logo antigos serão removidos.</p>
            <button type="button" onClick={addFileInput} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
              Adicionar arquivo de imagem
            </button>
            <button type="submit" className="ml-3 mt-2 bg-green-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default HeaderComponent;
