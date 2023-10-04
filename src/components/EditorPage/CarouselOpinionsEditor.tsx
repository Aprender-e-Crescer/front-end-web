import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface CarouselItem {
  image: string;
  title: string;
  paragraph: string;
}

// Validação Yup para os itens do carrossel
const carouselSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      image: Yup.string().url('URL da imagem inválida').required('URL da imagem é obrigatória'),
      title: Yup.string().required('Título é obrigatório'),
      paragraph: Yup.string().required('Parágrafo é obrigatório'),
    })
  ),
});

const CarouselComponent: React.FC = () => {
  const [carouselItems, setCarouselItems] = React.useState<CarouselItem[]>([
    {
      image: '',
      title: '',
      paragraph: '',
    },
  ]);

  const addCarouselItem = () => {
    setCarouselItems([...carouselItems, { image: '', title: '', paragraph: '' }]);
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
    <div className="flex flex-col min-w-lg mt-32">
      <h1 className="text-2xl font-semibold mb-4">Adicionar fotos no carrossel de fotos</h1>
      <Formik initialValues={initialValues} validationSchema={carouselSchema} onSubmit={handleSubmit}>
        <Form>
          {carouselItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`image${index}`}>URL da Imagem do Item {index + 1}</label>
              <Field
                type="text"
                name={`items[${index}].image`}
                id={`image${index}`}
                placeholder="Digite a URL da imagem"
                className="h-10 w-auto border rounded-md p-2"
              />
              <ErrorMessage name={`items[${index}].image`} component="div" className="text-red-500" />

              <label htmlFor={`title${index}`}>Título da Imagem numero {index + 1}</label>
              <Field
                type="text"
                name={`items[${index}].title`}
                id={`title${index}`}
                placeholder="Digite o título"
                className="h-10 w-auto border rounded-md p-2"
              />
              <ErrorMessage name={`items[${index}].title`} component="div" className="text-red-500" />

              <label htmlFor={`paragraph${index}`}>Parágrafo do Imagem numero {index + 1}</label>
              <Field
                as="textarea"
                name={`items[${index}].paragraph`}
                id={`paragraph${index}`}
                placeholder="Digite o parágrafo"
                className="h-20 w-auto border rounded-md p-2"
              />
              <ErrorMessage name={`items[${index}].paragraph`} component="div" className="text-red-500" />

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
  