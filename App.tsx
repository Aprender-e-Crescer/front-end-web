// Carousel.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from './store.js';
const Carousel = () => {
  const store = useStore();

  const formik = useFormik({
    initialValues: {
      text: store.text,
      image: store.image,
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Campo obrigatório'),
      image: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: (values) => {
      store.updateText(values.text);
      store.updateImage(values.image);
    },
  });

  return (
    <div className="flex items-center">
      <div className="w-1/2 p-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-600">
              Texto:
            </label>
            <input
              type="text"
              id="text"
              name="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.text && formik.errors.text && (
              <div className="text-red-500 text-sm">{formik.errors.text}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              URL da Imagem:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Atualizar
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <img src={store.image} alt="Imagem" className="w-full h-auto" />
        <p className="text-xl mt-4">{store.text}</p>
      </div>
    </div>
  );
};

export default Carousel;
