import CardConteudo from './CardConteudo';
import data from '../components.json';

function CardConteudoview() {
  return (
    <div className="flex flex-col flex-wrap justify-center gap-8 mt-8 items-center lg:flex-row">
      <CardConteudo
        buttons={data.find(item => item.type === 'content-buttons')?.content as string[]}
        mainContent={data.find(item => item.type === 'main-content')?.content as string}
        subContent={data.find(item => item.type === 'main-subcontent')?.content as string}
      />
    </div>
  );
}

export default CardConteudoview;
