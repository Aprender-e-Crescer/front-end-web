import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Carousel } from 'flowbite-react';

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

  const renderCarouselImages = () => {
    return carouselItems.map((item, index) => (
      <img className='h-96 w-full' key={index} src={item} alt={`Slide ${index + 1}`} />
    ));
  };

  const initialValues = { items: carouselItems };

  const handleSubmit = (values: any) => {
    // Lida com a submissão do formulário aqui
    console.log('Itens do carrossel:', values.items);
  };

  return (
    <div>
      <h2>Carrossel</h2>
      <Formik initialValues={initialValues} validationSchema={carouselSchema} onSubmit={handleSubmit}>
        <Form>
          {carouselItems.length > 0 && (
            <Carousel className='h-96 w-full'>{renderCarouselImages()}</Carousel>
          )}
          {carouselItems.map((_, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`carouselItem${index}`}>URL do Item #{index + 1}</label>
              <Field
                type="text"
                name={`items[${index}]`}
                id={`carouselItem${index}`}
                placeholder="Digite a URL do item"
                className="border rounded p-2"
              />
              <button onClick={() => removeCarouselItem(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={addCarouselItem} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
            Adicionar Item
          </button>
          <button type="submit" className="mt-2 bg-green-500 text-white px-2 py-1 rounded">
            Salvar
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CarouselComponent;
