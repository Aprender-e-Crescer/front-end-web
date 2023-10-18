import Card from './Cardmain';

function Cardsview({data}) {

  const Conteudo = data?.find(item => item.type === 'content-cards')?.content as string[];

  if (!Conteudo) return null;

  return (
    <div>
      <Card cards={Conteudo} />
    </div>
  );
}
export default Cardsview;
