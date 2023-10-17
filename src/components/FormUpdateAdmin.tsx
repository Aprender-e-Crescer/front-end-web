// Importando a função 'useState' da biblioteca 'react'
import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useQuery, useMutation } from 'react-query';
import { Spinner } from 'flowbite-react';
import { HTTP } from '../services/api';

interface InterfaceQuestion {
  _id: number;
  description: string;
  type: string;
  options: { id: number; texto: string }[];
  active: boolean;
  required: boolean;
}

const fetchQuestions = async () => {
  const response = await HTTP.get<{ data: { questions: InterfaceQuestion[] } }>('/questions');
  return response.data.data.questions;
};

const saveQuestions = async (questions: InterfaceQuestion[]) => {
  const { data } = await HTTP.post('/questions', {
    questions,
  });

  return data;
};

export function FormUpdateAdmin() {
  const [campos, setCampos] = useState<InterfaceQuestion[]>([]);
  const { data: questionAPI, isLoading } = useQuery('questions', fetchQuestions);
  const { isLoading: isLoadingMutation } = useMutation(saveQuestions);

  const handleSave = async () => {
    try {
      const postData = {
        questions: campos,
      };

      // Inicialize uma matriz de promessas para todas as chamadas de API
      const apiPromises = postData.questions.map(async q => {
        try {
          // Primeiro, exclua a pergunta existente
          await HTTP.delete(`/questions/${q._id}`);

          // Em seguida, remova o _id
          delete q._id;

          // Transforme as opções em uma matriz de texto
          const opts = q.options.map(o => o.texto);
          q.options = opts;

          if (q.active !== true) console.log('Lucas Ativo');
          // await HTTP.post('/questions', q);
          console.log('lucas132');
        } catch (error) {
          console.error('Erro ao enviar pergunta:', error);
        }
      });

      // Aguarde todas as chamadas de API
      await Promise.all(apiPromises);

      console.log('Dados salvos com sucesso');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const adicionarCampo = () => {
    const idDeCampo = Date.now();
    const novoCampo = {
      _id: idDeCampo,
      description: '',
      type: 'texto',
      options: [],
      active: true,
      required: false,
    };
    setCampos([...campos, novoCampo]);
  };

  const removerCampo = (id: number) => {
    const novosCampos = campos.filter(c => c._id !== id);
    setCampos(novosCampos);
  };

  const adicionarOpcao = (id: number) => {
    const perguntaEncontrada = campos.find(c => c._id === id);
    if (perguntaEncontrada) {
      const novasOpcoes = [...perguntaEncontrada.options, { id: Date.now(), texto: '' }];
      handleChange(id, { options: novasOpcoes });
    }
  };

  const removerOpcao = (id: number, opcaoId: number) => {
    const perguntaEncontrada = campos.find(c => c._id === id);
    if (!perguntaEncontrada) return;
    const novasOpcoes = perguntaEncontrada.options.filter(opcao => opcao.id !== opcaoId);
    handleChange(id, { options: novasOpcoes });
  };

  const handleChange = (id: number, campoAtualizado: Partial<(typeof campos)[0]>) => {
    const novosCampos = campos.map(campo => {
      if (campo._id === id) {
        return { ...campo, ...campoAtualizado };
      }
      return campo;
    });
    setCampos(novosCampos);
  };

  const optionChange = (idPergunta: number, idOpcao: number, option: string) => {
    const novosCampos = [...campos];
    const question = novosCampos.find(campo => campo._id === idPergunta);

    if (question) {
      const optionIndex = question.options.findIndex(o => o.id === idOpcao);

      if (optionIndex !== -1) {
        novosCampos.forEach(campo => {
          if (campo._id === idPergunta) {
            campo.options[optionIndex].texto = option;
          }
        });

        // Update the state
        setCampos(novosCampos);
      }
    }
  };

  /*  const handleSave = () => {
      console.log(campos);
  };  */

  useEffect(() => {
    if (questionAPI) {
      const dataRepair = questionAPI.map(dataB => ({
        _id: dataB._id,
        description: dataB.description,
        type: dataB.type,
        options: dataB.options.map((option, index) => ({ id: Date.now() + index, texto: option as unknown as string })),
        active: dataB.active,
        required: dataB.required,
      }));

      setCampos(dataRepair);
    }
  }, [questionAPI]);
  if (isLoading || isLoadingMutation)
    return (
      <div className="flex justify-center py-32">
        <Spinner color="info" aria-label="Default status example" className="w-32 h-32 fill-blue-800" />
      </div>
    );

  return (
    <div>
      <div className=" max-w-xl mx-auto rounded-lg py-4">
        <h1 className="text-3xl text-blue-800 text-center mb-4 font-extrabold">APRENDER E CRESCER</h1>
        {campos
          .filter(campo => campo.active)
          .map(campo => (
            <div key={campo._id} className="mb-4 p-4 rounded-lg shadow-md border-2 border-orange-400 ">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Digite sua pergunta aqui..."
                  value={campo.description}
                  className="borderrounded px-2 py-1 w-full mt-2 text-xs font-normal focus:ring-0"
                  onChange={e => handleChange(campo._id, { description: e.target.value })}
                />
                <select
                  value={campo.type}
                  className="border rounded px-2 py-1 w-full text-xs font-bold"
                  onChange={e => handleChange(campo._id, { type: e.target.value, options: [] })}
                >
                  <option value="texto">Texto</option>
                  <option value="multiplaEscolha">Resposta Objetiva</option>
                  <option value="campoData">Campo de data</option>
                </select>
              </div>
              <div className="flex justify-center py-2">
                {campo.type === 'multiplaEscolha' && (
                  <div className="flex  flex-col gap-2">
                    {campo.options.map(opcao => (
                      <div key={opcao.id} className="flex flex-row h-8">
                        <input
                          className="border-none bg-gray-200 rounded-l-full"
                          type="text"
                          value={opcao.texto}
                          placeholder="Digite a opção"
                          onChange={e => optionChange(campo._id, opcao.id, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removerOpcao(campo._id, opcao.id)}
                          className="w-10 h-8 flex items-center justify-center bg-gray-200 rounded-r-full text-gray-500 border-none"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between flex-row-reverse">
                <button
                  type="button"
                  onClick={() => removerCampo(campo._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-600 mt-2 text-xs"
                >
                  <TrashIcon className="w-3 h-5" />
                </button>
                {campo.type === 'multiplaEscolha' && (
                  <button
                    type="button"
                    onClick={() => adicionarOpcao(campo._id)}
                    className="bg-orange-500 text-white px-2 py-1 rounded-full hover:bg-orange-600 mt-2 text-xs font-extrabold"
                  >
                    Adicionar Opção
                  </button>
                )}
              </div>
            </div>
          ))}
        <div className="flex flex-row-reverse gap-2">
          <button
            id="SaveConf"
            type="button"
            onClick={handleSave}
            className="bg-orange-500 text-white px-2 py-1 rounded-full mt-2 text-xs h-7 font-extrabold"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={adicionarCampo}
            className="bg-green-500 text-white px-2 py-1 rounded-full mt-2 text-xs h-7"
          >
            <PlusIcon className="w-3 h-3 " />
          </button>
        </div>
      </div>
    </div>
  );
  /*  Possivel utimo Commit */
}
