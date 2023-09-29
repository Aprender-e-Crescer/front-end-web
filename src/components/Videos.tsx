import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const VideoComponent: React.FC = () => {
  const [videoLinks, setVideoLinks] = useState<string[]>(['']);

  const addVideoLink = () => {
    setVideoLinks([...videoLinks, '']);
  };

  const handleVideoLinkChange = (index: number, link: string) => {
    const updatedVideoLinks = [...videoLinks];
    updatedVideoLinks[index] = link;
    setVideoLinks(updatedVideoLinks);
  };

  const removeVideoLink = (index: number) => {
    const updatedVideoLinks = [...videoLinks];
    updatedVideoLinks.splice(index, 1);
    setVideoLinks(updatedVideoLinks);
  };

  const renderVideoInputs = () => {
    return videoLinks.map((videoLink, index) => (
      <div key={index} className="mb-2">
        <label htmlFor={`videoLink${index}`}>Link do Vídeo #{index + 1}</label>
        <Field
          type="text"
          name={`videoLinks[${index}]`} // Use o nome do campo como um array
          id={`videoLink${index}`}
          value={videoLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleVideoLinkChange(index, e.target.value)
          }
          placeholder="Digite o link do vídeo"
          className="border rounded p-2"
        />
        <button
          type="button"
          onClick={() => removeVideoLink(index)}
          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Remover
        </button>
      </div>
    ));
  };

  const videoSchema = Yup.object().shape({
    videoLinks: Yup.array()
      .of(Yup.string().url('URL do vídeo inválida').required('URL do vídeo é obrigatória'))
      .min(1, 'Pelo menos um link de vídeo é obrigatório'), // Adicione uma validação para garantir que haja pelo menos um link
  });

  const handleSubmit = (values: any) => {
    console.log('Valores do formulário em JSON:', JSON.stringify(values)); // Imprime os valores em JSON no console
  };

  return (
    <div className="border-solid border-4 border-gray-600">
      <h2>Vídeos</h2>
      <Formik initialValues={{ videoLinks }} validationSchema={videoSchema} onSubmit={handleSubmit}>
        <Form>
          {renderVideoInputs()}
          <button type="button" onClick={addVideoLink} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
            Adicionar Vídeo
          </button>
          <button type="submit" className="mt-2 bg-green-500 text-white px-2 py-1 rounded">
            Salvar
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default VideoComponent;
