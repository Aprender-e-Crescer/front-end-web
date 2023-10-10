import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatória'),
  observacoes: yup.string().required('Observações é obrigatório'),
});
