export type Cardsprops = {
  cardMain1: string;
  cardMain2: string;
  cardMain3: string;
};

function Card({ cardMain1, cardMain2, cardMain3 }: Cardsprops) {
  return (
    <>
      <section className="flex justify-evenly flex-wrap gap-8 p-20 break-normal">
        <div className="w-72 h-72 bg-red-600 flex justify-center items-center rounded-lg shadow-lg shadow-black">
          <div className="w-64 h-64 bg-orange-500 flex justify-center items-center rounded-lg shadow-lg shadow-black">
            <div className="bg-yellow-400 w-56 h-56 flex justify-center items-center rounded-lg shadow-lg shadow-black transform hover:scale-105 transition-transform duration-300">
              <h1 className="bg-white w-44 h-44 text-center text-3xl flex items-center justify-center text-indigo-900 font-bold rounded-lg">
                {cardMain1}
              </h1>
            </div>
          </div>
        </div>

        <div className="w-72 h-72 bg-red-600 flex justify-center items-center rounded-lg shadow-lg shadow-black">
          <div className="w-64 h-64 bg-orange-500 flex justify-center items-center rounded-lg shadow-lg shadow-black">
            <div className="bg-yellow-400 w-56 h-56 flex justify-center items-center rounded-lg shadow-lg shadow-black transform hover:scale-105 transition-transform duration-300">
              <h1 className="bg-white w-44 h-44 text-center text-3xl flex items-center justify-center text-indigo-900 font-bold rounded-lg">
                {cardMain2}
              </h1>
            </div>
          </div>
        </div>

        <div className="w-72 h-72 bg-red-600 flex justify-center items-center rounded-lg shadow-lg shadow-black">
          <div className="w-64 h-64 bg-orange-500 flex justify-center items-center rounded-lg shadow-lg shadow-black">
            <div className="bg-yellow-400 w-56 h-56 flex justify-center items-center rounded-lg shadow-lg shadow-black transform hover:scale-105 transition-transform duration-300">
              <h1 className="bg-white w-44 h-44 text-center text-3xl flex items-center justify-center text-indigo-900 font-bold rounded-lg">
                {cardMain3}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Card;
