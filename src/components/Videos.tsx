import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const VideoComponent: React.FC = () => {
  const [videoLinks, setVideoLinks] = useState<string[]>(['']); // Inicialmente, um espaço para vídeo vazio

  const addVideoLink = () => {
    setVideoLinks([...videoLinks, '']); // Adicione um novo espaço para vídeo vazio
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
          name={`videoLink${index}`}
          id={`videoLink${index}`}
          value={videoLink}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleVideoLinkChange(index, e.target.value)}
          placeholder="Digite o link do vídeo"
          className="border rounded p-2"
        />
        <button onClick={() => removeVideoLink(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
          Remover
        </button>
      </div>
    ));
  };

  const initialValues = { videoLinks };

  const videoSchema = Yup.object().shape({
    videoLinks: Yup.array().of(Yup.string().url('URL do vídeo inválida').required('URL do vídeo é obrigatória')),
  });

  const handleSubmit = (values: any) => {
    // Lida com a submissão do formulário aqui
    console.log('Valores do formulário:', values);
  };

  return (
    <div>
      <h2>Vídeos</h2>
      <Formik initialValues={initialValues} validationSchema={videoSchema} onSubmit={handleSubmit}>
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