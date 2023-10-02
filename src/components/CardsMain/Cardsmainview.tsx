import Card from './Cardmain';
import Cardjson from '../components.json';

const Cardsview = () => {
  const { cardMain1, cardMain2, cardMain3 } = Cardjson[1] || {};

  return <Card cardMain1={cardMain1 || ''} cardMain2={cardMain2 || ''} cardMain3={cardMain3 || ''} />;
};

export default Cardsview;
