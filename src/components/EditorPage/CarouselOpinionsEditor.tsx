import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import data from '../components.json';

const photoSchema = Yup.object().shape({
  photoItems: Yup.array().of(
    Yup.object().shape({
      image: Yup.string().url('Insira um link de imagem válido'),
      who_is: Yup.string().required('O título é obrigatório'),
      text: Yup.string().required('O parágrafo é obrigatório'),
    }),
  ),
});

const PhotoComponent: React.FC = () => {
  const initialValues = {
    photoItems: data.find(item => item.type === 'carrousel-testimony')?.content || [
      { image: '', who_is: '', text: '' },
    ],
  };

  const handleSubmit = async (values: { photoItems: { image: string; who_is: string; text: string }[] }) => {
    console.log('Itens de fotos:', values.photoItems);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: photoSchema,
    onSubmit: handleSubmit,
  });

  const addPhotoItem = () => {
    formik.setFieldValue('photoItems', [...formik.values.photoItems, { image: '', who_is: '', text: '' }]);
  };

  const removePhotoItem = (index: number) => {
    const updatedItems = [...formik.values.photoItems];
    updatedItems.splice(index, 1);
    formik.setFieldValue('photoItems', updatedItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para adicionar itens de fotos.</h1>

          {formik.values.photoItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`image${index}`}>Link da Imagem</label>
              <input
                type="url"
                name={`image-${index}`}
                id={`image-${index}`}
                placeholder="https://www.example.com/image"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={item.image}
              />
              {formik.touched.photoItems && formik.errors.photoItems && formik.errors.photoItems[index] && (
                <div className="text-red-600">{formik.errors.photoItems[index].image}</div>
              )}

              <label htmlFor={`who_is${index}`}>Título</label>
              <input
                type="text"
                name={`who_is-${index}`}
                id={`who_is-${index}`}
                placeholder="Título da Imagem"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={item.who_is}
              />
              {formik.touched.photoItems && formik.errors.photoItems && formik.errors.photoItems[index] && (
                <div className="text-red-600">{formik.errors.photoItems[index].who_is}</div>
              )}

              <label htmlFor={`text${index}`}>Parágrafo</label>
              <textarea
                name={`text-${index}`}
                id={`text-${index}`}
                placeholder="Descrição da Imagem"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={item.text}
              />
              {formik.touched.photoItems && formik.errors.photoItems && formik.errors.photoItems[index] && (
                <div className="text-red-600">{formik.errors.photoItems[index].text}</div>
              )}

              <button
                type="button"
                onClick={() => removePhotoItem(index)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
              >
                Remover
              </button>
            </div>
          ))}

          <div>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os itens de fotos serão adicionados.</p>
            <button type="button" onClick={addPhotoItem} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
              Adicionar item de foto
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

export default PhotoComponent;
