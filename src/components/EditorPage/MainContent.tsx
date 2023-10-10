import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import data from '../../data/components.json';

const textSchema = Yup.object().shape({
  textInput: Yup.string().required('O texto é obrigatório'),
});

function TextComponent() {
  const initialValues = {
    textInput: data.find((item) => item.type === 'main-content')?.content || '',
  };

  const handleSubmit = (values) => {
    console.log('Texto inserido:', values.textInput);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: textSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para inserir ou alterar o texto principal da página.</h1>

          <div className="flex flex-col">
            <div className="mt-4">
              <label className="font-bold" htmlFor="textInput">Texto:</label>
              <textarea
                id="textInput"
                name="textInput"
                value={formik.values.textInput}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-2 h-40 w-full"
              />
            </div>

            {formik.touched.textInput && formik.errors.textInput ? (
              <div className="text-red-600 mt-2">{formik.errors.textInput}</div>
            ) : null}
          </div>

          <div>
            <p className="text-sm text-gray-800 mt-2">Ao clicar em salvar, o texto será inserido ou atualizado.</p>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default TextComponent;
