// Importando a função 'useState' da biblioteca 'react'
import { useState } from 'react';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

export function FormUpdateAdmin() {
  const [campos, setCampos] = useState<
    {
      id: number;
      pergunta: string;
      tipo: string;
      opcoes: { id: number; texto: string }[];
    }[]
  >([]);

  const [contador, setContador] = useState(0);

  const adicionarCampo = () => {
    const novoCampo = {
      id: contador,
      pergunta: '',
      tipo: 'texto',
      opcoes: [],
    };
    setCampos([...campos, novoCampo]);
    setContador(contador + 1);
  };

  const removerCampo = (id: number) => {
    const novosCampos = campos.filter(c => c.id !== id);
    setCampos(novosCampos);
  };

  const adicionarOpcao = (id: number) => {
    const perguntaEncontrada = campos.find(c => c.id === id);
    if (perguntaEncontrada) {
      const novasOpcoes = [...perguntaEncontrada.opcoes, { id: Date.now(), texto: '' }];
      handleChange(id, { opcoes: novasOpcoes });
    }
  };

  const removerOpcao = (id: number, opcaoId: number) => {
    const perguntaEncontrada = campos.find(c => c.id === id);
    if (!perguntaEncontrada) return;
    const novasOpcoes = perguntaEncontrada.opcoes.filter(opcao => opcao.id !== opcaoId);
    handleChange(id, { opcoes: novasOpcoes });
  };

  const handleChange = (id: number, campoAtualizado: Partial<(typeof campos)[0]>) => {
    const novosCampos = campos.map(campo => {
      if (campo.id === id) {
        return { ...campo, ...campoAtualizado };
      }
      return campo;
    });
    setCampos(novosCampos);
  };

  const handleSave = () => {
    console.log('Campos do formulário:', campos);
  };

  return (
    <div className="py-4">
      <div className=" max-w-xl mx-auto p-4 rounded-lg ">
        <h1 className="text-3xl text-blue-900 text-center mb-4 font-extrabold">APRENDER E CRESCER</h1>
        {campos.map(campo => (
          <div key={campo.id} className="mb-4 p-4 rounded-lg shadow-md bg-gray-200">
            <select
              value={campo.tipo}
              className="border rounded px-2 py-1 w-full text-xs"
              onChange={e => handleChange(campo.id, { tipo: e.target.value, opcoes: [] })}
            >
              <option value="texto">Texto</option>
              <option value="multiplaEscolha">Resposta Objetiva</option>
              <option value="campoData">Campo de data</option>
            </select>
            <input
              type="text"
              placeholder="Digite sua pergunta aqui..."
              value={campo.pergunta}
              className="border rounded px-2 py-1 w-full mt-2 text-xs"
              onChange={e => handleChange(campo.id, { pergunta: e.target.value })}
            />
            {campo.tipo === 'multiplaEscolha' && (
              <>
                {campo.opcoes.map(opcao => (
                  <div key={opcao.id} className=" flex flex-row items-center">
                    <label htmlFor={`opcao-${campo.id}-${opcao.id}`}>{opcao.texto}</label>
                    <input
                      className="mt-2 border-none bg-orange-50 rounded-sm mr-4"
                      type="text"
                      placeholder="Digite a pergunta aqui..."
                    />
                    <button
                      type="button"
                      onClick={() => removerOpcao(campo.id, opcao.id)}
                      className="bg-red-500 text-white rounded-full hover:bg-red-600 mt-2 text-xs w-3 h-3 flex items-center justify-center"
                    >
                      <XMarkIcon className="w-2 h-2 " />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => adicionarOpcao(campo.id)}
                  className="bg-orange-500 text-white px-2 py-1 rounded-full hover:bg-orange-600 mt-2 text-xs"
                >
                  Adicionar Opção
                </button>
              </>
            )}
            <div className="mt-2">
              <button
                type="button"
                onClick={() => removerCampo(campo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 mt-2 text-xs"
              >
                <TrashIcon className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={adicionarCampo}
          className="bg-orange-500 text-white px-2 py-1 rounded-full hover:bg-orange-600 text-xs"
        >
          <PlusIcon className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 ml-2 text-xs"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
