import React from 'react';
import { useFormik } from 'formik';
import Input from '../Input';
import { registerSchema } from '../../schema/register';
import Button from '../Button';

export default function Form() {
  const [showerrors, setShowErrors] = React.useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      nome: '',
      email: '',
      telefone: '',
      observacoes: '',
    },
    validationSchema: registerSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(e);
  };
  return (
    <form onSubmit={onSubmit} className="p-5 rounded-sm shadow-xl bg-slate-800 w-2/3 mx-auto">
      <h1 className="text-center text-zinc-100 text-lg mb-5">Formulário</h1>
      <div className="flex flex-col gap-6">
        <Input
          name="nome"
          label="Nome/Empresa"
          value={values.nome}
          onChange={handleChange}
          error={showerrors ? errors.nome : ''}
        />

        <Input
          name="email"
          label="E-mail"
          value={values.email}
          onChange={handleChange}
          error={showerrors ? errors.email : ''}
        />

        <Input
          name="telefone"
          label="Telefone"
          value={values.telefone}
          onChange={handleChange}
          error={showerrors ? errors.telefone : ''}
        />

        <Input
          name="observacoes"
          label="Observações"
          value={values.observacoes}
          onChange={handleChange}
          error={showerrors ? errors.observacoes : ''}
        />
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
}
