export type Cardsprops = {
  cards: string[];
};

function Card({ cards }: Cardsprops) {
  return (
    <section className="flex justify-evenly flex-wrap gap-8 p-20 break-normal">
      {cards.map((card, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="w-80 h-60 bg-red-600 flex justify-center items-center rounded-lg shadow-lg shadow-black transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-72 h-52 bg-orange-500 flex justify-center items-center rounded-lg shadow-lg shadow-black transform hover:scale-105 transition-transform duration-300">
            <div className="bg-yellow-400 w-60 h-44 flex justify-center items-center rounded-lg shadow-lg shadow-black transform hover:scale-105 transition-transform duration-300">
              <h1 className="bg-white w-48 h-36 text-center text-3xl flex items-center justify-center text-indigo-900 font-bold rounded-lg transform hover:scale-105 transition-transform duration-300">
                {card}
              </h1>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Card;
