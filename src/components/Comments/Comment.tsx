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
    <section className="bg-transparen p-16">
      <div className="max-w-[1000px] h-automy-8 py-0 mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-2">Comentários</h2>
        <div className="w-full sm:w-1/2 mx-auto">
          <Carousel
            className="h-96"
            leftControl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-10 h-10 bg-gray-700 rounded-full"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.25 9l-3 3m0 0l3 3m-3-3h7.5" />
              </svg>
            }
            rightControl={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-10 h-10 bg-gray-700 rounded-full"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5" />
              </svg>
            }
          >
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
