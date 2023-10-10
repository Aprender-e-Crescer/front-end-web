export type Videosprops = {
  videos: string[];
};

function Videos({ videos }: Videosprops) {
  return (
    <div className="flex justify-center flex-wrap mt-32">
      <div className="flex flex-row justify-center video-frame">
        <div className="border border-gray-300 rounded-lg overflow-hidden flex gap-6 flex-wrap">
          {videos.map((video, index) => (
            <iframe
              width="560"
              height="315"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              src={video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Videos;
