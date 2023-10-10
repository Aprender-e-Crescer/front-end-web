import { Carousel } from 'flowbite-react';

export type CarouselProps = {
  imageUrls: string[];
};

function Carousels({ imageUrls }: CarouselProps) {
  return (
    <div className="flex justify-center">
      <Carousel className="h-96 w-4/5 my-16">
        {imageUrls.map((url, index) => (
          <img src={url} alt={`Imagem ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
}

export default Carousels;
