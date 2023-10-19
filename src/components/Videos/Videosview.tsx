import Videos from './Videos';

function Videosview({data}) {
  const videos = data?.find?.(item => item.type === 'video')?.content as string[];
  if (!videos) return null;
  return (
    <div>
      <Videos videos={videos} />
    </div>
  );
}

export default Videosview;
