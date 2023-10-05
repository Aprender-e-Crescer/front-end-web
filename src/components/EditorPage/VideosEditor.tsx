/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, FormikProvider, useFormik } from 'formik';

const videoSchema = Yup.object().shape({
  videoFiles: Yup.array()
    .of(
      Yup.mixed().test('fileSize', 'O arquivo é muito grande', value => {
        if (!value) return true; // No file selected, so no size to check
        return value.size <= 50000000; // 50 MB
      }),
    )
    .min(1, 'Pelo menos um arquivo é necessário'),
});

const VideoComponent: React.FC = () => {
  const initialValues = {
    videoFiles: [null],
  };

  const [videoBase64List, setVideoBase64List] = useState<(string | null)[]>([null]);

  const handleSubmit = async (values: { videoFiles: File[] }) => {
    const base64Promises = values.videoFiles.map(async file => {
      if (file) {
        return await convertToBase64(file);
      }
      return null;
    });

    const base64Strings = await Promise.all(base64Promises);

    console.log('Vídeos em base64:', base64Strings);
    setVideoBase64List(base64Strings);
  };

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: videoSchema,
    onSubmit: handleSubmit,
  });

  const addVideoInput = () => {
    formik.setFieldValue('videoFiles', [...formik.values.videoFiles, null]);
    setVideoBase64List([...videoBase64List, null]);
  };

  const removeVideoInput = (index: number) => {
    const updatedVideos = [...formik.values.videoFiles];
    updatedVideos.splice(index, 1);
    formik.setFieldValue('videoFiles', updatedVideos);

    const updatedBase64List = [...videoBase64List];
    updatedBase64List.splice(index, 1);
    setVideoBase64List(updatedBase64List);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para adicionar vídeos.</h1>

          {formik.values.videoFiles.map((_, index) => (
            <div key={index} className="flex flex-col">
              {videoBase64List[index] && (
                <div>
                  <video controls width="300" src={videoBase64List[index]} />
                </div>
              )}

              <label htmlFor={`videoFile${index}`}>Selecione um arquivo de vídeo</label>
              <input
                type="file"
                name={`videoFiles[${index}]`}
                id={`videoFile${index}`}
                accept="video/*"
                onChange={event => {
                  formik.setFieldValue(`videoFiles[${index}]`, event.currentTarget.files?.[0] || null);
                }}
              />
              {formik.touched.videoFiles && formik.errors.videoFiles && formik.errors.videoFiles[index] ? (
                <div className="text-red-600">{formik.errors.videoFiles[index]}</div>
              ) : null}

              <button
                type="button"
                onClick={() => removeVideoInput(index)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
              >
                Remover
              </button>
            </div>
          ))}

          <div>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os vídeos serão adicionados.</p>
            <button type="button" onClick={addVideoInput} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
              Adicionar arquivo de vídeo
            </button>
            <button type="submit" className="ml-3 mt-2 bg-green-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default VideoComponent;
