import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  buttonList: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Campo do título é obrigatório'),
      address: Yup.string().required('Campo do endereço é obrigatório'),
    }),
  ),
});

function ButtonComponent({ data }) {
  const initialValues = {
    buttonList: data.find(item => item.type === 'content-buttons')?.content || [],
  };

  return (
    <div className="min-w-lg flex flex-col gap-2 mt-32">
      <h1 className="text-2xl font-medium">Botões</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Valores enviados:', values);
        }}
      >
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="buttonList">
              {({ remove }) => (
                <div>
                  {formik.values.buttonList.map((button, index) => (
                    <div key={index} className="flex flex-col">
                      <Field
                        type="text"
                        name={`buttonList[${index}].title`}
                        placeholder="Título do botão"
                        className="border rounded p-2"
                      />
                      <Field
                        type="text"
                        name={`buttonList[${index}].link`}
                        placeholder="Endereço do botão"
                        className="border rounded p-2"
                      />
                      <ErrorMessage name={`buttonList[${index}].title`} component="div" className="text-red-600" />
                      <ErrorMessage name={`buttonList[${index}].address`} component="div" className="text-red-600" />
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
                  formik.values.buttonList.push({ title: '', address: '' });
                  formik.setFieldValue('buttonList', [...formik.values.buttonList]);
                }}
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Adicionar Botão
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

export default ButtonComponent;
