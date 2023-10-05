import { useEffect } from 'react';
import { Formik, FieldArray, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTextInputsStore } from '../../stores/BigSquares'; // Importe o store Zustand

const TextSchema = Yup.object().shape({
  textInputs: Yup.array().of(Yup.string()).required('Pelo menos um campo de texto é necessário'),
});

function TextForm() {
  const { textInputs, updateTextInputs } = useTextInputsStore();

  useEffect(() => {
    // Carrega os valores salvos no localStorage quando a página é carregada
    const savedValues = localStorage.getItem('textInputs');
    if (savedValues) {
      try {
        const parsedValues = JSON.parse(savedValues);
        updateTextInputs(parsedValues);
      } catch (error) {
        console.error('Erro ao carregar valores do localStorage:', error);
      }
    }
  }, [updateTextInputs]);

  return (
    <div className="min-w-lg flex flex-col mt-32">
      <h1 className="text-2xl font-semibold mb-4">Editar o quadrado maior e principal da página</h1>
      <Formik
        initialValues={{ textInputs }}
        validationSchema={TextSchema}
        onSubmit={values => {
          console.log('Valores enviados:', values);

          // Salva os valores no localStorage
          localStorage.setItem('textInputs', JSON.stringify(values.textInputs));
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="textInputs">
              {({ remove, push }) => (
                <div>
                  {values.textInputs.map((text, index) => (
                    <div key={index} className="mb-2 flex items-center">
                      <Field
                        type="text"
                        name={`textInputs[${index}]`}
                        placeholder="Digite um texto"
                        className="w-full border rounded-md py-2 px-3"
                      />
                      <button
                        type="button"
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => {
                          remove(index); // Remova do Zustand
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      push(''); // Adicione ao Zustand
                    }}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Adicionar novo quadrado grande
                  </button>
                </div>
              )}
            </FieldArray>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os textos antigos serão removidos.</p>
            <ErrorMessage name="textInputs" component="div" className="text-red-500" />
            <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TextForm;
