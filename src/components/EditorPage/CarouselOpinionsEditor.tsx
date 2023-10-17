import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
interface IPhotoItems {
  image: string;
  who_is: string;
  text: string;
}

const photoSchema = Yup.object().shape({
  photoItems: Yup.array().of(
    Yup.object().shape({
      image: Yup.string().url('Insira um link de imagem válido'),
      who_is: Yup.string().required('O título é obrigatório'),
      text: Yup.string().required('O parágrafo é obrigatório'),
    }),
  ),
});

function PhotoComponent({ data }) {
  const initialValues = {
    photoItems: (data?.find(item => item.type === 'carrousel-testimony')?.content as IPhotoItems[]) || [],
  };

  const handleSubmit = async (values: { photoItems: IPhotoItems[] }) => {
    // eslint-disable-next-line no-console
    console.log('Itens de fotos:', values.photoItems);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: photoSchema,
    onSubmit: handleSubmit,
  });

  const addPhotoItem = () => {
    formik.setFieldValue('photoItems', [...formik.values.photoItems, { image: '', who_is: '', text: '' }]);
  };

  const removePhotoItem = (index: number) => {
    const updatedItems = [...formik.values.photoItems];
    updatedItems.splice(index, 1);
    formik.setFieldValue('photoItems', updatedItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-16  mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para adicionar itens de fotos.</h1>
          {formik.values.photoItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`image-${index}`}>
                Link da Imagem
                <br />
                <input
                  type="url"
                  name={`photoItems[${index}].image`}
                  id={`image-${index}`}
                  placeholder="https://www.example.com/image"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={item.image}
                  className="w-full"
                />
              </label>
              {formik.touched.photoItems && formik.errors.photoItems && formik.errors.photoItems[index] && (
                <div className="text-red-600">{formik.errors.photoItems[index].image}</div>
              )}

              <label htmlFor={`who_is-${index}`}>
                Título
                <br />
                <input
                  type="text"
                  name={`photoItems[${index}].who_is`}
                  id={`who_is-${index}`}
                  placeholder="Título da Imagem"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={item.who_is}
                  className="w-full"
                />
              </label>
              {formik.touched.photoItems && formik.errors.photoItems && formik.errors.photoItems[index] && (
                <div className="text-red-600">{formik.errors.photoItems[index].who_is}</div>
              )}

              <label htmlFor={`text-${index}`}>
                Parágrafo
                <br />
                <textarea
                  name={`photoItems[${index}].text`}
                  id={`text-${index}`}
                  placeholder="Descrição da Imagem"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={item.text}
                  className="w-full"
                />
              </label>
              {formik.touched.photoItems && formik.errors.photoItems && formik.errors.photoItems[index] && (
                <div className="text-red-600">{formik.errors.photoItems[index].text}</div>
              )}
              <button
                type="button"
                onClick={() => removePhotoItem(index)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-24"
              >
                Remover
              </button>
            </div>
          ))}

          <div>
            <p className="text-sm text-gray-800">Ao clicar em salvar, os itens de fotos serão adicionados.</p>
            <button type="button" onClick={addPhotoItem} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
              Adicionar item de foto
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
