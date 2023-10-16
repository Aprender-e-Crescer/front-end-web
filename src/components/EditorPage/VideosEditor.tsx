import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import data from '../../data/components.json';

const videoSchema = Yup.object().shape({
  videoLinks: Yup.array().of(Yup.string().url('Insira um link válido')).min(1, 'Pelo menos um link é necessário'),
});

function VideoComponent() {
  const initialValues = {
    videoLinks: data.find(item => item.type === 'video')?.content,
  };

  const handleSubmit = async (values: { videoLinks: string[] }) => {
    // eslint-disable-next-line no-console
    console.log('Links de vídeo:', values.videoLinks);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: videoSchema,
    onSubmit: handleSubmit,
  });

  const addVideoInput = () => {
    formik.setFieldValue('videoLinks', [...formik.values.videoLinks, '']);
  };

  const removeVideoInput = (index: number) => {
    const updatedLinks = [...formik.values.videoLinks];
    updatedLinks.splice(index, 1);
    formik.setFieldValue('videoLinks', updatedLinks);
  };

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="min-w-lg flex flex-col gap-2 mt-32">
          <h1 className="text-2xl font-medium">Preencha os campos abaixo para adicionar links de vídeos.</h1>

          {formik.values.videoLinks.map((_, index) => (
            <div key={index} className="flex flex-col">
              <label htmlFor={`videoLink${index}`}>
                Insira um link de vídeo
                <br />
                <input
                  type="url"
                  name={`videoLinks[${index}]`}
                  id={`videoLink${index}`}
                  placeholder="https://www.example.com/video"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.videoLinks[index]}
                />
              </label>
              {formik.touched.videoLinks && formik.errors.videoLinks && formik.errors.videoLinks[index] ? (
                <div className="text-red-600">{formik.errors.videoLinks[index]}</div>
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
            <p className="text-sm text-gray-800">Ao clicar em salvar, os links de vídeos serão adicionados.</p>
            <button type="button" onClick={addVideoInput} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
              Adicionar link de vídeo
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

export default VideoComponent;
