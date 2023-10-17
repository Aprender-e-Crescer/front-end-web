import Videos from './Videos';

function Videosview({data}) {
  return (
    <div>
      <Videos videos={data.find(item => item.type === 'video')?.content as string[]} />
    </div>
  );
}

export default Videosview;
