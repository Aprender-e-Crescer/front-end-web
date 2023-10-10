import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

interface FormData {
  username: string;
  password: string;
}

function TesteArea() {
  const initialValues: FormData = {
    username: '',
    password: '',
  };

  const [submittedData, setSubmittedData] = useState<FormData[]>([]);

  const handleSubmit = (values: FormData) => {
    console.log('Dados do formulário:', values);

    // Adicione os dados ao array
    setSubmittedData([...submittedData, values]);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Usuário:
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Digite o usuário"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Senha:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Digite a senha"
              />
            </div>
            <div className="flex justify-center items-center ">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Enviar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TesteArea;
