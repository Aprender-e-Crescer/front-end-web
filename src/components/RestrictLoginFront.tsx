import { useState } from 'react';
import { Button, Checkbox, Modal } from 'flowbite-react';
import { Form, Formik, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { HTTP } from '../services/api';
import { useNavigate } from "react-router-dom";
import create from "zustand"
interface FormData {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Usuário é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

const useStore = create(
  persist(
    (set) => ({
      user: { name: 'Usuário Padrão' },
      updateUser: (name: string) => set((state) => ({ user: { name } })),
    }),
    { name: 'user-store' }
  )
);

function UserProfile() {
  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

  const handleUpdateName = () => {
    const newName = prompt('Novo nome:');
    if (newName) {
      updateUser(newName);
    }
  };

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Nome: {user.name}</p>
      <button onClick={handleUpdateName}>Atualizar Nome</button>
    </div>
  );
}


const login = async (values: FormData) => {
  try {
    const { data } = await HTTP.post('/api/auth/login', {
      email: values.username,
      password: values.password,
    });

    return data;
  } catch (error) {
    console.error('Erro ao fazer login', error);
  }
};

export default function RestrictLoginFront() {
  const navigate = useNavigate();

  const initialValues: FormData = {
    username: '',
    password: '',
  };
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);
  const [openModal, setOpenModal] = useState<string | undefined>();

  const handleSubmit = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      // eslint-disable-next-line no-console
      console.log('Dados do formulário:', values);
  
     
      const data = await login(values);

    if (data.accessToken) {
        navigate('/admin');
      }
    } catch (errors) {
      const validationErrors: Record<string, string> = {};
      errors.inner.forEach((error: { path: string | number; message: string }) => {
        validationErrors[error.path] = error.message;
      });
  
   
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Button gradientDuoTone="redToYellow" outline onClick={() => setOpenModal('form-elements')}>
        Área Restrita
      </Button>
      <Modal show={openModal === 'form-elements'} size="md" popup onClose={() => setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form>
                <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-black mb-6 text-center">
                    Login Área Restrita
                  </h3>
                  <div className="mb-4">
                    <div className="mb-2">
                      <label htmlFor="username" className="block text-gray-600 dark:text-gray-400 font-semibold mb-2">
                        Usuário:
                        <br />
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Digite o usuário aqui"
                          className="bg-gray-100 dark:bg-gray-800 border rounded py-2 px-3 w-full text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </label>
                      <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-2">
                      <label htmlFor="password" className="block text-gray-600 dark:text-gray-400 font-semibold mb-2">
                        Senha:
                        <br />
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Digite a senha aqui"
                          className="bg-gray-100 dark:bg-gray-800 border rounded py-2 px-3 w-full text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </label>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="remember" className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Checkbox id="remember" className="text-blue-500 dark:text-blue-300" />
                      Mantenha-se conectado
                    </label>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-blue-500 dark:text-blue-300 hover:underline">
                      Esqueceu a senha?
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                    Entrar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
