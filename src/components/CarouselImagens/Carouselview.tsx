import Carousels from './CarouselHeader';
import componentsJson from '../components.json';

const Carouselview = () => {
  const { imageUrls } = componentsJson[3];

  return (
    <div>
      <Carousels imageUrls={imageUrls || []} />
    </div>
  );
};

export default Carouselview;
