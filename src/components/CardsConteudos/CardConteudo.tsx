import { useNavigate } from 'react-router-dom';

export type CardsConteudoprops = {
  mainContent: string;
  subContent: string;
  maxWidth?: string;
  buttons?: {
    title: string;
    link: string;
  }[];
};

export function CardConteudo({ mainContent, maxWidth = 'md:w-1/2 lg:w-1/3', subContent, buttons }: CardsConteudoprops) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mt-12 w-9/12 h-96 mx-auto my-auto flex flex-col border-25 border-solid rounded-xl border-y-orange-500 border-x-yellow-300 relative justify-center">
        <h1 className="text-center mt-1 text-4xl text-indigo-900 font-semibold p-6 max-md:text-sm max-xl:text-lg">
          {mainContent}
        </h1>
      </div>
      <div className="flex justify-around mt-8 ml-5 items-center flex-wrap text-center ">
        <span
          className={`p-6 rounded-xl border-25  border-solid border-y-orange-500 border-x-yellow-400 w-full ${maxWidth} text-indigo-900 font-semibold text-xl md:text-lg lg:text-xl xl:text-2xl`}
        >
          {subContent.split('\n').map(str => (
            <p>{str}</p>
          ))}
        </span>
        {buttons?.map(({ link, title }) => (
          <button
            onClick={() => navigate(link)}
            type="button"
            className="w-80  mt-10 mr-2
              h-16  rounded-full text-2xl bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold hover:bg-orange-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-transform duration-300 ease-in-out"
          >
            {title}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CardConteudo;
