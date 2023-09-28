import { useState } from 'react';

interface IInput {
  tipodepergunta: string;
  opcoes: string[];
}

function App() {
  const [inputs, setInputs] = useState<IInput[]>([]);

  const handleClickAddInput = () => {
    setInputs(oldInputs => [...oldInputs, { tipodepergunta: 'text', opcoes: [] }]);
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
  return (
    <div>
      <div className="bg-gray-200 flex flex-col gap-4 justify-items-center items-center py-5 min-h-screen">
        {inputs.map(({ tipodepergunta }, index) => (
          <div className="bg-white rounded-lg text-center w-fit flex flex-col gap-2 px-4 py-1">
            <h1 className="font-bold">Crie ou altere uma pergunta:</h1>
            <div className="flex flex-row">
              <select
                className="rounded-l-full bg-orange-500 font-bold border-none hover:border-none"
                onChange={e => atualizarInputs(index, e.target.value)}
                value={tipodepergunta}
              >
                <option value="text">Texto</option>
                <option value="Check">CheckBox</option>
                <option value="Data">Data</option>
              </select>
              <input
                className="rounded-r-full bg-blue-700 placeholder:text-white font-bold"
                type="text"
                placeholder="Sua pergunta"
              />
            </div>
            {tipodepergunta === 'Check' && (
              <div>
                <h1>Luccas</h1>
              </div>
            )}
            <button type="button" onClick={() => apagarPergunta(index)} className="text-red-500 font-bold">
              Apagar
            </button>
          </div>
        ))}
        <button
          onClick={handleClickAddInput}
          type="button"
          className="rounded-full bg-blue-500 text-white flex items-center justify-center py-1 px-2"
        >
          <span className="text-center font-bold">Adicionar Pergunta</span>
        </button>
      </div>
    </div>
  );
}

export default App;
