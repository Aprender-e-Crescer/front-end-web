import Cabecalho from './components/Cabecalho';
import Carrossel from './components/CarrosselImgs';

export default function App() {
  return (
    <div>
      <Cabecalho subtitle="EAe" title="eaea" logoUrl="./eae" />
      <Carrossel imgsSrc={['eae', 'eae', 'eae']} />
    </div>
  );
}
