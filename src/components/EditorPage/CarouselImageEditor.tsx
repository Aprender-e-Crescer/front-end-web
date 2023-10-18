import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

const photoSchema = Yup.object().shape({
  link: Yup.array().of(Yup.string().url('Insira um link válido')).min(1, 'Pelo menos uma foto é necessária'),
});

function PhotoComponent({ data, handleSubmit }) {
  const initialValues = {
    link: data.find(item => item.type === 'carrousel-images')?.content || [],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: photoSchema,
    onSubmit: ({ link }) =>
    handleSubmit({
      type: 'carrousel-images',
      content: link,
    })
  });

  const addPhotoInput = () => {
    formik.setFieldValue('link', [...formik.values.link, '']);
  };

  const removePhotoInput = (index: number) => {
    const updatedLinks = [...formik.values.link];
    updatedLinks.splice(index, 1);
    formik.setFieldValue('link', updatedLinks);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32  shadow-lg p-10 bg-gray-100 rounded">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para adicionar links de fotos.</h1>

          {formik.values.link.map((_, index) => (
            // TODO - use id instead of index
            <div key={index} className="flex flex-col">
              <label htmlFor={`photoLink${index}`}>
                Insira um link de foto {index + 1}
                <br />
                <input
                  type="url"
                  name={`link[${index}]`}
                  id={`photoLink${index}`}
                  placeholder="https://www.example.com/photo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.link[index]}
                />
              </label>
              {formik.touched.link && formik.errors.link && formik.errors.link[index] ? (
                <div className="text-red-600">{formik.errors.link[index]}</div>
              ) : null}

              <button
                type="button"
                onClick={() => removePhotoInput(index)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
              >
                Remover
              </button>
            </div>
          ))}

          <div>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os links de fotos serão adicionados.</p>
            <button type="button" onClick={addPhotoInput} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
              Adicionar link de foto
            </button>
            <button type="submit" className="ml-3 mt-2 bg-green-500 text-white px-4 py-2 rounded">
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default PhotoComponent;
