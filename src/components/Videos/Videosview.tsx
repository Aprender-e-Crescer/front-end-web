import data from '../components.json';
import Videos from './Videos';

function Videosview() {
  return (
    <div>
      <Videos videos={data.find(item => item.type === 'video')?.content as string[]} />
    </div>
  );
}

export default Videosview;
