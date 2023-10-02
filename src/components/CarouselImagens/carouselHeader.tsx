import { Carousel } from 'flowbite-react';

export type CarouselProps = {
  imageUrls: string[];
};

function Carousels({ imageUrls }: CarouselProps) {
  return (
    <div className="flex justify-center">
      <Carousel className="h-96 w-3/4 m-24">
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Imagem ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
}

export default Carousels;
