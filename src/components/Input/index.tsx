import React from 'react';

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  type?: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ id, name, error = '', type = 'text', value, label = '', onChange }: Props) {
  return (
    <div>
      <label className="text-zinc-100 mb-1" htmlFor={id}>
        {label}
        <br />
        <input
          id={id}
          type={type}
          className="w-full p-2 outline-none rounded-sm bg-transparent border-2 border-zinc-100 text-zinc-100"
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
