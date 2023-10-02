import cardsProps from '../components.json';
import CardConteudo from './CardConteudo';

const CardConteudoview = () => {
  const { textCardconteudo1, textCardconteudo2, textCardconteudo3, buttonSubscribe } = cardsProps[0] || {};

  return (
    <div className="flex flex-col flex-wrap justify-center gap-8 mt-8 items-center lg:flex-row">
      <div className="">
        <CardConteudo
          textCardconteudo1={textCardconteudo1 || ''}
          textCardconteudo2={textCardconteudo2 || ''}
          textCardconteudo3={textCardconteudo3 || ''}
          buttonSubscribe={buttonSubscribe || ''}
        />
      </div>
    </div>
  );
};

export default CardConteudoview;
