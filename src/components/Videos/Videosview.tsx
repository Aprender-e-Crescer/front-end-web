import Videospropsjson from '../components.json';
import Videos from './Videos';

const Videosview = () => {
  const { videoURL1, videoURL2, urlLOGO } = Videospropsjson[2] || {};

  return (
    <div>
      <Videos videoURL1={videoURL1 || ''} videoURL2={videoURL2 || ''} urlLOGO={urlLOGO || ''} />
    </div>
  );
};

export default Videosview;
