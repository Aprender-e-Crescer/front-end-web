import { Button } from 'flowbite-react';
import { MenuFront } from './MenuFront';
import menuData from '../data/menu.json';

interface Props {
  logo: string;
  phone: string;
}

export function HeaderFront({ phone, logo }: Props) {
  return (
    <header className="flex flex-1 items-center h-28 p-4  shadow-lg shadow-cyan-500/50 ">
      <div className="flex flex-1 mx-20 items-center space-x-2">
        <img src={logo} alt="Logo do Site" className="h-30 w-40" />
        <MenuFront items={menuData} />
        <span className="flex-1" />
        <div className="flex mx-10 items-center text-slate-500 font-bold text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          {/* Phone */}
          <p>{phone}</p>
        </div>
        {/* Botão de Área Restrita */}
        <Button className="mr-20" size="lg" gradientDuoTone="purpleToBlue" outline>
          <p>Área restrita</p>
        </Button>
      </div>
    </header>
  );
}
