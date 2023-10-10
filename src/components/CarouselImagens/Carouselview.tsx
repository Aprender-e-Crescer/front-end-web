import Carousels from './carouselHeader';
import data from '../../data/components.json';

function Carouselview() {
  return (
    <div>
      <Carousels imageUrls={data.find(item => item.type === 'carrousel-images')?.content as string[]} />
    </div>
  );
}

export default Carouselview;
