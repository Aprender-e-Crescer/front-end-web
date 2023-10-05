/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

interface CarouselItem {
  image: string | null;
  title: string;
  paragraph: string;
}

const initialCarouselItem: CarouselItem = {
  image: null,
  title: '',
  paragraph: '',
};

const CarouselComponent: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([initialCarouselItem]);

  const addCarouselItem = () => {
    setCarouselItems([...carouselItems, { ...initialCarouselItem }]); // Crie uma cópia separada
  };

  const removeCarouselItem = (index: number) => {
    const updatedCarouselItems = [...carouselItems];
    updatedCarouselItems.splice(index, 1);
    setCarouselItems(updatedCarouselItems);
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedItems = [...carouselItems];
        updatedItems[index] = { ...updatedItems[index], image: reader.result as string };
        setCarouselItems(updatedItems);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-w-lg mt-32">
      <h1 className="text-2xl font-semibold mb-4">Adicionar fotos no carrossel de fotos</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('Itens do carrossel:', carouselItems);
        }}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={`image${index}`}>Imagem do Item {index + 1}</label>
            <input
              type="file"
              accept="image/*"
              id={`image${index}`}
              onChange={e => handleFileChange(index, e)}
              className="h-30 w-auto border rounded-md p-2"
            />
            {item.image && <img src={item.image} alt={`Imagem ${index + 1}`} className="mt-2 max-h-40" />}

            <label htmlFor={`title${index}`}>Título da Imagem número {index + 1}</label>
            <input
              type="text"
              value={item.title}
              onChange={e => {
                const updatedItems = [...carouselItems];
                updatedItems[index] = { ...updatedItems[index], title: e.target.value };
                setCarouselItems(updatedItems);
              }}
              placeholder="Digite o título"
              className="h-10 w-auto border rounded-md p-2"
            />

            <label htmlFor={`paragraph${index}`}>Parágrafo da Imagem número {index + 1}</label>
            <textarea
              value={item.paragraph}
              onChange={e => {
                const updatedItems = [...carouselItems];
                updatedItems[index] = { ...updatedItems[index], paragraph: e.target.value };
                setCarouselItems(updatedItems);
              }}
              placeholder="Digite o parágrafo"
              className="h-20 w-auto border rounded-md p-2"
            />

            <button
              type="button"
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
      </form>
    </div>
  );
};

export default CarouselComponent;
