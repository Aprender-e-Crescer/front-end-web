import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import data from '../../data/components.json';

const headerSchema = Yup.object().shape({
  logoFile: Yup.mixed().required('Você precisa selecionar um arquivo'),
});

function HeaderComponent() {
  const initialValues = {
    logoFile: data.find(item => item.type === 'logo')?.content || { textInputs: [''] },
  };

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleSubmit = async (values: { logoFile: File }) => {
    if (values.logoFile) {
      const base64String = await convertToBase64(values.logoFile);
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

            {!imageBase64 && (
              <div>
                <img alt="logo" src={initialValues.logoFile as string} className="w-60 h-52" />
              </div>
            )}

            <label htmlFor="logoFile">
              Selecione um arquivo de imagem
              <input
                type="file"
                name="logoFile"
                id="logoFile"
                accept="image/*"
                onChange={event => {
                  formik.setFieldValue('logoFile', event.currentTarget.files?.[0] || null);
                }}
              />
            </label>
            {formik.touched.logoFile && formik.errors.logoFile ? (
              <div className="text-red-600">{formik.errors.logoFile as string}</div>
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
}

export default HeaderComponent;
