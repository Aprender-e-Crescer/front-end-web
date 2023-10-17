import { useQuery } from 'react-query';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import Carouselview from '../components/CarouselImagens/Carouselview';
import Cardsview from '../components/CardsMain/Cardsmainview';
import CardConteudoview from '../components/CardsConteudos/CardConteudoview';
import Videosview from '../components/Videos/Videosview';
import Comment from '../components/Comments/Comment';
import LogoHeaderview from '../components/LogoHeader/LogoHeaderView';
import { HTTP } from '../services/api';
import components from '../data/components.json';

async function fetchData() {
  const users = await HTTP.get('/presentations').catch(() => ({ data: components }));

  return users.data;
}

export function ACLandingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['landingpageAC'],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="imagem-fundo flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <LogoHeaderview data={data} />
        <Carouselview data={data} />
        <Cardsview data={data} />
        <CardConteudoview data={data} />
        <Videosview data={data} />
        <Comment data={data} />
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
