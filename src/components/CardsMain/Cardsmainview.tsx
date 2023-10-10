import Card from './Cardmain';
import data from '../components.json';

function Cardsview() {
  return <Card cards={data.find(item => item.type === 'content-cards')?.content as string[]} />;
}

export default Cardsview;
