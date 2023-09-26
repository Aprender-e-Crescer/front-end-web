import Cabecalho from './components/Cabecalho';
import CarrosselImgs from './components/CarrosselImgs';
import QuadradoMenor from './components/QuadradoMenor';
import data from '../public/data.json';

export default function App() {
  return (
    <div>
      <Cabecalho subtitle={data.cabecalho.subtitle} title={data.cabecalho.title} imgUrl="" imgAlt="" />
      <CarrosselImgs imgsSrc={['eae', 'eae', 'eae']} />
      <QuadradoMenor texts={['oi', 'oii', 'oii']} />
    </div>
  );
}
