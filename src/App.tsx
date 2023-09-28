import { DateSelectViewer } from './components/DateSelectViewer';
import data from './data.json';

function App() {
  return <DateSelectViewer dates={data.dates} title={data.title} />;
}

export default App;
