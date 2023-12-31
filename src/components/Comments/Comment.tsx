/* eslint-disable react/no-unused-prop-types */
import { Carousel } from 'flowbite-react';
import { RightController } from '../CarrouselControllers/RightController';
import { LeftController } from '../CarrouselControllers/LeftController';

export type Comment = {
  text: string;
  who_is: string;
  image: string;
};

function Comment({ data }) {
  const Comentario = data?.find(item => item.type === 'carrousel-testimony')?.content as Comment[];
  
  if (!Comentario) return null;
  
  return (
    <section className="bg-transparen p-16">
      <div className="max-w-[1000px] h-automy-8 py-0 mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-2">Comentários</h2>
        <div className="w-full mx-auto">
          <Carousel className="h-96" leftControl={<LeftController />} rightControl={<RightController />}>
            {Comentario.map(({ image, text, who_is: whoIs }: Comment) => (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4 px-20">
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
