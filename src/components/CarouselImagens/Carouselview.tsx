import Carousels from './carouselHeader';

function Carouselview({ data }) {
  const imageUrls = data?.find(item => item.type === 'carrousel-images')?.content as string[];
  
  if (!imageUrls) return null;

  return (
    <div>
      <Carousels imageUrls={imageUrls} />
    </div>
  );
}

export default Carouselview;
