interface VideosProps {
  videosSrc: string[];
}

export default function Videos({ videosSrc }: VideosProps) {
  return (
    <div>
      {videosSrc.map(videoLink => (
        <video src={videoLink} />
      ))}
    </div>
  );
}
