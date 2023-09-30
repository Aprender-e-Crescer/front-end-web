/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

// Validação Yup para os itens do carrossel
const carouselSchema = Yup.object().shape({
  items: Yup.array()
    .of(Yup.string().url('URL do item inválida').required('URL do item é obrigatória'))
    .min(1, 'Pelo menos um item é necessário'),
});

const CarouselComponent: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<string[]>(['']); // Inicialmente, um item vazio

  const addCarouselItem = () => {
    setCarouselItems([...carouselItems, '']); // Adicione um novo item vazio ao carrossel
  };

  const removeCarouselItem = (index: number) => {
    const updatedCarouselItems = [...carouselItems];
    updatedCarouselItems.splice(index, 1);
    setCarouselItems(updatedCarouselItems);
  };

  const initialValues = { items: carouselItems };

  const handleSubmit = (values: any) => {
    console.log('Itens do carrossel:', values.items);
  };

  return (
    <div className="flex flex-col min-w-lg ">
      <h1 className="text-2xl font-semibold mb-4">Adicionar fotos no carrossel de fotos</h1>
      <Formik initialValues={initialValues} validationSchema={carouselSchema} onSubmit={handleSubmit}>
        <Form>
          {carouselItems.map((_, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`carouselItem${index}`}>Link da foto numero {index + 1}</label>
              <Field
                type="text"
                name={`items[${index}]`}
                id={`carouselItem${index}`}
                placeholder="Digite a URL do item"
                className="h-10 w-auto border rounded-md p-2"
              />
              <button
                onClick={() => removeCarouselItem(index)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
              >
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={addCarouselItem} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
            Adicionar fotos novas
          </button>
          <button type="submit" className="ml-3 mt-2 bg-green-500 text-white px-2 py-1 rounded">
            Salvar
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CarouselComponent;
