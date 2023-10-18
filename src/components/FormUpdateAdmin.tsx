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

const saveQuestions = async (questions: InterfaceQuestion[]) => {
  const { data } = await HTTP.post('/questions', questions);

  return data;
};

const fetchQuestions = async () => {
  const response = await HTTP.get('/questions');
  console.log(response.data);

  return response.data.data.questions;
};

const deleteQuestion = async (id: number) => {
  return HTTP.delete(`/questions/${id}`);
};

export function FormUpdateAdmin() {
  const [campos, setCampos] = useState<InterfaceQuestion[]>([]);
  const { data: questionAPI, isLoading } = useQuery('questions', fetchQuestions);
  const { isLoading: isLoadingMutationSaveQuestion, mutate: mutateSaveQuestion } = useMutation(saveQuestions);
  const { isLoading: isLoadingDeleteMutation, mutate: mutateDeleteQuestion } = useMutation(deleteQuestion);

  const handleSave = async () => {
    try {
      const postData = {
        questions: campos,
      };

      postData.questions
        .filter(campo => campo.active)
        .map(({ _id, needUpSert, isCreating, ...rest }) => {
          !isCreating && mutateDeleteQuestion(campos.find(c => c._id === _id)?._id);
          mutateSaveQuestion({ ...rest });
        });

      setCampos(postData.questions.filter(campo => campo.active).map(({ needUpSert, isCreating, ...rest }) => rest));

      console.log('Dados salvos com sucesso');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const adicionarCampo = () => {
    const idDeCampo = Date.now();
    const novoCampo = {
      _id: idDeCampo,
      isCreating: true,
      needUpSert: true,
      description: '',
      type: 'texto',
      options: [],
      active: true,
      required: true,
    };
    setCampos([...campos, novoCampo]);
  };

  const removerCampo = async (id: number) => {
    const novosCampos = campos.filter(c => c._id !== id);
    await mutateDeleteQuestion(campos.find(c => c._id === id)?._id);
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
        return { ...campo, ...campoAtualizado, needUpSert: true };
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
            campo.needUpSert = true;
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
        options: dataB.options.map((option, index) => ({
          id: option.id || Date.now() + index,
          texto: option.texto as unknown as string,
        })),
        active: dataB.active,
        required: dataB.required,
      }));

      setCampos(dataRepair);
    }
  }, [questionAPI]);

  if (isLoading || isLoadingMutationSaveQuestion)
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
                  <option value="text">Texto</option>
                  <option value="objetiva">Resposta Objetiva</option>
                  <option value="date">Campo de data</option>
                </select>
              </div>
              <div className="flex justify-center py-2">
                {campo.type === 'objetiva' && (
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
                {campo.type === 'objetiva' && (
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
