import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import { useQuery } from 'react-query';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import pages from '../data/pages.json';
import { HTTP } from '../services/api';

async function fetchData() {
  const users = await HTTP.get('/presentations').catch(() => ({ data: pages }));

  return users.data;
}

export function AdminLandingPageSelector() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [`pages`],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="md:w-[80%] self-center flex justify-around ">
        <div className="flex gap-4 my-4 flex-wrap justify-center h-screen text-center">
          {data?.map(({ name, id }) => (
            <Card className="w-96">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Pagina: {name}</p>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>Editar a pagina do Aprender e Crescer</p>
              </p>
              <Button className="bg-blue-500" onClick={() => navigate(`/admin-landing-page-editor/${id}`)}>
                <p>Ir para edição da pagina {name}</p>
              </Button>
            </Card>
          ))}
        </div>
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
