import { useState } from 'react';

interface IInput {
  name: string;
  tipodepergunta: string;
  opcoes: string[];
}
interface IOption {
  name: string;
}

function App() {
  const [inputs, setInputs] = useState<IInput[]>([]);
  const []

  const handleClickAddInput = () => {
    setInputs(oldInputs => [...oldInputs, { name: 'Espaço para nova pergunta', tipodepergunta: 'text', opcoes: [] }]);
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
        {inputs.map(({ name, tipodepergunta, opcoes }, index) => (
          <div className="bg-white rounded-lg text-center w-fit flex flex-col gap-2 px-4 py-1">
            <h1 className="font-bold">Crie ou altere uma pergunta:</h1>
            <div className="flex flex-row gap-2">
              <input className="rounded-full bg-blue-700" type="text" placeholder={name} />
              <select
                className="rounded-full bg-orange-500 font-bold border-none hover:border-none"
                onChange={e => atualizarInputs(index, e.target.value)}
                value={tipodepergunta}
              >
                <option value="text">Texto</option>
                <option value="Check">CheckBox</option>
                <option value="Data">Data</option>
              </select>
            </div>
            {tipodepergunta === 'Check' &&
              opcoes.map(() => (
                <div>
                  <h1>Lucas</h1>
                </div>
              ))}
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
//Preciso adicionar uma função para adicionar opçoes ao meu checkbox...