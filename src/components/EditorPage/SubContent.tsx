import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import data from '../../data/components.json';

const validationSchema = Yup.object().shape({
  paragraphList: Yup.array().of(Yup.string().required('Campo de parágrafo é obrigatório')),
});

function StyledParagraphComponent() {
  // TODO - get content for content-subcards
  const initialValues = { paragraphList: data.find(item => item.type === 'content-subcards')?.content as string[] };

  return (
    <div className="min-w-lg flex flex-col gap-2 mt-32">
      <h1 className="text-2xl font-medium">Quadrados de Parágrafo</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          // eslint-disable-next-line no-console
          console.log('Valores enviados:', values);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="paragraphList">
              {({ remove }) => (
                <div>
                  {formik.values.paragraphList.map((paragraph, index) => (
                    // TODO - use id instead of index
                    <div key={index} className="flex flex-col">
                      <Field
                        as="textarea"
                        name={`paragraphList[${index}]`}
                        placeholder="Digite um parágrafo"
                        className="border rounded p-2"
                        defaultValue={paragraph}
                      />
                      <ErrorMessage name={`paragraphList[${index}]`} component="div" className="text-red-600" />
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
                  formik.values.paragraphList.push('');
                  formik.setFieldValue('paragraphList', [...formik.values.paragraphList]);
                }}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Adicionar Quadrado de Parágrafo
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

export default StyledParagraphComponent;
