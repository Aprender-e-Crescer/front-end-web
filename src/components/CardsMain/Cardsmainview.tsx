import Card from './Cardmain';

function Cardsview({data}) {
  return <Card cards={data.find(item => item.type === 'content-cards')?.content as string[]} />;
}

export default Cardsview;
