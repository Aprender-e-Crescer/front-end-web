export type Videosprops = {
  videoURL1: string;
  videoURL2: string;
  urlLOGO: string;
};

function Videos({ videoURL1, videoURL2, urlLOGO }: Videosprops) {
  return (
    <>
      <div className="flex justify-center gap-20  flex-wrap mt-32">
        <div className="flex justify-center items-center  video-frame">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              width="560"
              height="315"
              src={videoURL1}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>

        <div className="flex justify-center items-center ">
          <img src={urlLOGO} alt="" />
        </div>

        <div className="flex justify-center items-center  video-frame">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              width="560"
              height="315"
              src={videoURL2}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Videos;
