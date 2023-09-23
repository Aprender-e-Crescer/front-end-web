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
    <div className="flex flex-col gap-4 justify-items-center items-center py-5">
      {inputs.map(({ name }) => (
        <div className="bg-orange-500 rounded-lg text-center w-fit flex flex-col gap-2 px-4 py-1">
          <h1 className="font-bold">Crie ou altere uma pergunta:</h1>
          <input className="rounded-full" type="text" placeholder={name} />
        </div>
      ))}    
        <button onClick={handleClickAddInput} type="button" className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
          <span className="text-center">+</span>
        </button>

    </div>
  );
}

export default App;
