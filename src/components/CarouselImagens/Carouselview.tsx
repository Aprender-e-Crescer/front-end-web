import Carousels from './carouselHeader';

function Carouselview({ data }) {
  return (
    <div>
      <Carousels imageUrls={data.find(item => item.type === 'carrousel-images')?.content as string[]} />
    </div>
  );
}

export default Carouselview;
