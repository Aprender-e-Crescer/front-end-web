/* eslint-disable react/no-unused-prop-types */
import { Carousel } from 'flowbite-react';
import data from '../../data/components.json';

export type Comment = {
  text: string;
  who_is: string;
  image: string;
};

function Comment() {
  return (
    <section className="bg-transparen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-2">Comentários</h2>
        <div className="w-full sm:w-1/2 mx-auto">
          <Carousel className="h-96">
            {data
              .find(item => item.type === 'carrousel-testimony')
              ?.content.map(({ image, text, who_is: whoIs }: Comment) => (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="flex items-center mb-2">
                    <img className="w-32 h-32 rounded-full" src={image} alt={whoIs} />
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold">{whoIs}</h3>
                      <p className="text-xl text-gray-600">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default Comment;
