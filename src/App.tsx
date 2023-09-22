import { useState } from 'react';

interface IInput {
  name: string;
}

function App() {
  const [inputs, setInputs] = useState<IInput[]>([]);

  const handleClickAddInput = () => {
    setInputs(oldInputs => [...oldInputs, { name: 'pergunta anterior' }]);
  };

  return (
    <div>
      {inputs.map(({ name }) => (
        <div className="bg-orange-500 rounded-lg text-center">
          <h1>Crie uma pergunta</h1>
          <input className="rounded-full" type="text" placeholder={name} />
        </div>
      ))}
      <button onClick={handleClickAddInput} type="button" className="rounded-full bg-blue-500 border-r-8">
        +
      </button>
    </div>
  );
}

export default App;
