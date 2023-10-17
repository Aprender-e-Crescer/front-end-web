import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

const titleSchema = Yup.object().shape({
  titleInput: Yup.string().required('O título é obrigatório'),
});

function TitleComponent({ data }) {
  const initialValues = {
    titleInput: data?.find(item => item.type === 'title')?.content || '',
  };

  const handleSubmit = values => {
    console.log('Título inserido:', values.titleInput);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: titleSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">
            Preencha os campos abaixo para inserir ou alterar o título da página.
          </h1>

          <div className="flex flex-col">
            <div className="mt-4">
              <label className="font-bold" htmlFor="titleInput">
                Título:
                <br />
                <input
                  type="text"
                  id="titleInput"
                  name="titleInput"
                  value={formik.values.titleInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border rounded p-2 h-10 w-full"
                />
              </label>
            </div>

            {formik.touched.titleInput && formik.errors.titleInput ? (
              <div className="text-red-600 mt-2">{formik.errors.titleInput}</div>
            ) : null}
          </div>

          <div>
            <p className="text-sm text-gray-800 mt-2">Ao clicar em salvar, o título será inserido ou atualizado.</p>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default TitleComponent;
