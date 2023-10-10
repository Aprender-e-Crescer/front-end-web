import { useNavigate } from 'react-router-dom';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import {Card, Button} from 'flowbite-react'
import data from '../data/pages.json'

export function AdminLandingPageSelector() {
  const navigate = useNavigate();
  const pages = data.

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center flex justify-around">
        {pages.map(({ name }) => (
             <Card className="max-w-sm">
             <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               <p>
               Pagina: {name}
               </p>
             </h5>
             <p className="font-normal text-gray-700 dark:text-gray-400">
               <p>
                 Editar a pagina do Aprender e Crescer
               </p>
             </p>
             <Button className='bg-blue-400' onClick={() => navigate('/admin-landing-page-editor')}>
               <p>
                Ir para edição da pagina {name}
               </p>
             </Button>
           </Card>
        ))}
      </div>
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}