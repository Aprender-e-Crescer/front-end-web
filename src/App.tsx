import { useState } from 'react';

interface IInput {
  name: string;
  tipodepergunta: string;
}

function App() {
  const [inputs, setInputs] = useState<IInput[]>([]);

  const handleClickAddInput = () => {
    setInputs(oldInputs => [...oldInputs, { name: 'Espaço para nova pergunta', tipodepergunta: 'text' }]);
  };

  const atualizarInputs = (index: number, value: string) => {
    setInputs(oldInputs => {
      const updatedInputs = [...oldInputs];
      updatedInputs[index].tipodepergunta = value;
      return updatedInputs;
    });
  };
  const apagarPergunta = (index: number) => {
    setInputs(oldInputs => {
      const updatedInputs = [...oldInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };
  const removerItem = (index: number) => {
    apagarPergunta(index);
  };
  return (
    <div>
      <div className="bg-orange-500 flex flex-col gap-4 justify-items-center items-center py-5">
        {inputs.map(({ name, tipodepergunta }, index) => (
          <div className="bg-white rounded-lg text-center w-fit flex flex-col gap-2 px-4 py-1">
            <h1 className="font-bold">Crie ou altere uma pergunta:</h1>
            <input className="rounded-lg bg-blue-900" type="text" placeholder={name} />
            <select onChange={e => atualizarInputs(index, e.target.value)} value={tipodepergunta}>
              <option value="text">Texto</option>
              <option value="Check">CheckBox</option>
              <option value="Data">Data</option>
            </select>
            <button type="button" onClick={() => removerItem(index)}>
              Apagar
            </button>
          </div>
        ))}
        <button
          onClick={handleClickAddInput}
          type="button"
          className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center"
        >
          <span className="text-center">+</span>
        </button>
      </div>
    </div>
  );
}

export default App;
