// Importando a função 'useState' da biblioteca 'react'
import { useState } from 'react';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
// Declaração de uma função chamada 'Formulario'
function Formulario() {
  // Usando 'useState' para criar um estado chamado 'campos'
  // 'campos' é uma lista de perguntas e respostas no formulário
  // Cada pergunta tem um ID, tipo, resposta e opções
  // Inicialmente, 'campos' está vazio (um array vazio '[]')
  const [campos, setCampos] = useState<
    {
      id: number;
      pergunta: string;
      tipo: string;
      resposta: string | string[];
      opcoes: { id: number; texto: string }[];
      date: Date | null;
    }[]
  >([]);

  // Usando 'useState' para criar um estado chamado 'contador'
  // 'contador' rastreia o número de perguntas criadas e começa em 1
  const [contador, setContador] = useState(1);

  // Função 'adicionarCampo': Adiciona uma nova pergunta ao formulário
  const adicionarCampo = () => {
    // Criamos uma nova pergunta com um ID único, pergunta vazia, tipo padrão "texto",
    // resposta vazia e nenhuma opção.
    const novoCampo = {
      id: contador,
      pergunta: '',
      tipo: 'texto',
      resposta: '',
      opcoes: [],
      date: null, // Certifique-se de incluir a propriedade 'date'
    };
    // Atualizamos o estado 'campos' adicionando a nova pergunta
    setCampos([...campos, novoCampo]);
    // Incrementamos o contador para o próximo ID
    setContador(contador + 1);
  };

  // Função 'removerCampo': Remove uma pergunta com base em seu ID
  const removerCampo = (id: number) => {
    // Filtramos a lista 'campos' para manter apenas as perguntas cujos IDs são diferentes do ID fornecido
    const novosCampos = campos.filter(c => c.id !== id);
    // Atualizamos o estado 'campos' com as perguntas restantes (excluindo a que foi removida)
    setCampos(novosCampos);
  };

  // Função 'adicionarOpcao': Adiciona uma nova opção a uma pergunta com base em seu ID
  const adicionarOpcao = (id: number) => {
    // Encontramos a pergunta com o ID correspondente
    const perguntaEncontrada = campos.find(c => c.id === id);
    // Se encontrarmos a pergunta, adicionamos uma nova opção a ela
    if (perguntaEncontrada) {
      // Criamos uma nova opção com um ID único e texto vazio
      const novasOpcoes = [...perguntaEncontrada.opcoes, { id: Date.now(), texto: '' }];
      // Chamamos a função 'handleChange' para atualizar a pergunta com as novas opções
      handleChange(id, { opcoes: novasOpcoes });
    }
  };

  // Função 'removerOpcao': Remove uma opção de uma pergunta com base em seu ID e ID de opção
  const removerOpcao = (id: number, opcaoId: number) => {
    // Encontramos a pergunta com o ID correspondente
    const perguntaEncontrada = campos.find(c => c.id === id);
    if (!perguntaEncontrada) return; // Certificamo-nos de que a pergunta existe
    // Filtramos as opções da pergunta para manter apenas aquelas com IDs diferentes do ID da opção fornecido
    const novasOpcoes = perguntaEncontrada.opcoes.filter(opcao => opcao.id !== opcaoId);
    // Chamamos a função 'handleChange' para atualizar a pergunta com as novas opções (excluindo a opção removida)
    handleChange(id, { opcoes: novasOpcoes });
  };

  // Função 'handleChange': Atualiza uma pergunta com base em seu ID e dados atualizados
  const handleChange = (id: number, campoAtualizado: Partial<(typeof campos)[0]>) => {
    // Mapeamos a lista 'campos' para criar uma nova lista de perguntas
    const novosCampos = campos.map(campo => {
      if (campo.id === id) {
        // Se encontrarmos a pergunta com o ID correspondente, a atualizamos com os novos dados
        return { ...campo, ...campoAtualizado };
      }
      // Se não for a pergunta que estamos procurando, mantemos a pergunta como está
      return campo;
    });
    // Atualizamos o estado 'campos' com as perguntas atualizadas
    setCampos(novosCampos);
  };

  // Função 'handleSubmit': Lida com o envio do formulário
  const handleSave = () => {
    // Aqui é onde processamos as criações/alterações do formulário
    // Por exemplo, podemos enviá-las para um servidor ou fazer o que for necessário com elas
    console.log('Campos do formulário:', campos);
  };

  // Renderização do componente do formulário
  return (
    <div className="max-w-xl mx-auto p-4 bg-orange-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-orange-600 mb-4">Aprender e Crescer</h1>
      {/* Mapeamos a lista de perguntas (campos) e renderizamos cada uma delas */}
      {campos.map(campo => (
        <div key={campo.id} className="mb-4 p-4 bg-orange-200 rounded-lg shadow-md">
          {/* Seleção de tipo de pergunta (como texto, seleção múltipla, etc.) */}
          <select
            value={campo.tipo}
            className="border rounded px-2 py-1 w-full text-xs"
            // Quando o valor da seleção muda, chamamos a função 'handleChange' para atualizar o tipo
            onChange={e => handleChange(campo.id, { tipo: e.target.value, resposta: '', opcoes: [] })}
          >
            <option value="texto">Texto</option>
            <option value="multiplaEscolha">Resposta Objetiva</option>
            <option value="campoData">Campo de data</option>
          </select>
          {/* Campo de entrada para a pergunta */}
          <input
            type="text"
            placeholder="Digite sua pergunta aqui..."
            value={campo.pergunta}
            className="border rounded px-2 py-1 w-full mt-2 text-xs"
            // Quando o texto da pergunta muda, chamamos a função 'handleChange' para atualizar a pergunta
            onChange={e => handleChange(campo.id, { pergunta: e.target.value })}
          />
          {/* Se o tipo de pergunta for 'multiplaEscolha', mostramos opções de resposta */}
          {campo.tipo === 'multiplaEscolha' && (
            <>
              {/* Mapeamos as opções de resposta da pergunta e renderizamos cada uma delas */}
              {campo.opcoes.map(opcao => (
                <div key={opcao.id} className=" flex flex-row items-center">
                  {/* Rótulo da opção de resposta */}
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
              {/* Botão para adicionar uma nova opção de resposta */}
              <button
                type="button"
                onClick={() => adicionarOpcao(campo.id)}
                className="bg-orange-500 text-white px-2 py-1 rounded-full hover:bg-orange-600 mt-2 text-xs"
              >
                Adicionar Opção
              </button>
            </>
          )}
          {/* Botão para remover o componente do formulário (a pergunta) */}
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
      {/* Botão para adicionar um novo campo (pergunta) ao formulário */}
      <button
        type="button"
        onClick={adicionarCampo}
        className="bg-orange-500 text-white px-2 py-1 rounded-full hover:bg-orange-600 text-xs"
      >
        <PlusIcon className="w-3 h-3" />
      </button>
      {/* Botão para enviar o formulário */}
      <button
        type="button"
        onClick={handleSave}
        className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 ml-2 text-xs"
      >
        Salvar
      </button>
    </div>
  );
}

// Exportando o componente 'Formulario' para que possa ser usado em outros lugares
export default Formulario;
