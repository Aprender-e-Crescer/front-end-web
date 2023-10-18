import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  textList: Yup.array().of(Yup.string().required('Campo de texto é obrigatório')),
});

function TextSquareComponent({ data, handleSubmit }) {
  const initialValues = { textList: data?.find(item => item.type === 'content-cards')?.content || [] };

  return (
    <div className="min-w-lg flex flex-col gap-2 mt-32">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ ({ textList }) =>
        handleSubmit({
          type: 'content-cards',
          content: textList,
        })}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="textList">
              {({ remove }) => (
                <div className='   shadow-lg p-10 bg-gray-100 rounded'>
                  <h1 className='font-semibold text-xl'>Editar quadrados menores</h1>
                  {formik.values.textList.map((text, index) => (
                    <div key={index} className="flex flex-col">
                      <h1 className="text-base font-medium">Quadrados de Texto {index + 1}</h1>
                      <Field
                        type="text"
                        name={`textList[${index}]`}
                        placeholder="Digite um texto"
                        className="border rounded p-2"
                      />
                      <ErrorMessage name={`textList[${index}]`} component="div" className="text-red-600" />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <div>
              <button
                type="button"
                onClick={() => {
                  formik.values.textList.push('');
                  formik.setFieldValue('textList', [...formik.values.textList]);
                }}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Adicionar Quadrado de Texto
              </button>
              <button type="submit" className="ml-3 mt-2 bg-green-500 text-white px-4 py-2 rounded">
                Salvar
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TextSquareComponent;
