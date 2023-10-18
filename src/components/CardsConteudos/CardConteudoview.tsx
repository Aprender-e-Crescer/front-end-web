import CardConteudo from './CardConteudo';

function CardConteudoview({data}) {
  const buttons = data?.find?.(item => item.type === 'content-buttons')?.content as string[];
  const mainContent = data?.find?.(item => item.type === 'main-content')?.content as string;
  const subContent = data?.find?.(item => item.type === 'main-subcontent')?.content as string;

  return (
    <div className="flex flex-col flex-wrap justify-center gap-8 mt-8 items-center lg:flex-row">
      <CardConteudo mainContent={mainContent} subContent={subContent} buttons={buttons} />
    </div>
  );
}

export default CardConteudoview;
