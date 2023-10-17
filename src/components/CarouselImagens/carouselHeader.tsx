import { Carousel } from 'flowbite-react';
import { RightController } from '../CarrouselControllers/RightController';
import { LeftController } from '../CarrouselControllers/LeftController';

export type CarouselProps = {
  imageUrls: string[];
};

function Carousels({ imageUrls }: CarouselProps) {
  return (
    <div className="flex justify-center">
      <Carousel leftControl={<LeftController />} rightControl={<RightController />} className="h-96 w-4/5 my-16">
        {imageUrls.map((url, index) => (
          <img src={url} alt={`Imagem ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
}

export default Carousels;
