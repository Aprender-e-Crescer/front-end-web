import { Carousel } from 'flowbite-react';

interface CarrosselProps {
  imgsSrc: string[];
}

export default function Carrossel({ imgsSrc }: CarrosselProps) {
  return (
    <Carousel className="w-full h-96">
      {imgsSrc.map(imgSrc => (
        <img alt="..." src={imgSrc} />
      ))}
    </Carousel>
  );
}
