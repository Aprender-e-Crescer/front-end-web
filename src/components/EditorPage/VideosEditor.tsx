import React from 'react';
import { Formik, FieldArray, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const VideoLinkSchema = Yup.object().shape({
  videoLinks: Yup.array()
    .of(Yup.string())
    .required('Pelo menos um link de vídeo é necessário'),
});

const VideoLinksForm: React.FC = () => {
  return (
    <div className="min-w-lg flex flex-col mt-32">
      <h1 className="text-2xl font-semibold mb-4">Editar os videos da pagina inicial</h1>
      <Formik
        initialValues={{ videoLinks: [''] }}
        validationSchema={VideoLinkSchema}
        onSubmit={values => {
          console.log('Valores enviados:', values);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="videoLinks">
              {({ remove, push }) => (
                <div>
                  {values.videoLinks.map((link, index) => (
                    <div key={index} className="mb-2 flex items-center">
                      <Field
                        type="text"
                        name={`videoLinks[${index}]`}
                        placeholder="Digite um link de vídeo"
                        className="w-full border rounded-md py-2 px-3"
                      />
                      <button
                        type="button"
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => remove(index)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push('')}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Adicionar novo video
                  </button>
                </div>
              )}
            </FieldArray>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os videos antigos serão removidos.</p>
            <ErrorMessage name="videoLinks" component="div" className="text-red-500" />
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VideoLinksForm;
