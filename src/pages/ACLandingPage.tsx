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

async function fetchData() {
  const users = await HTTP.get('/pages');

  return users.data;
}

import { useQuery } from '@tanstack/react-query';
import { HTTP } from '../services/api';


export function ACLandingPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['landingpageAC'],
    queryFn: fetchData,

});

console.log(data);

if (isLoading) {
    return <p>Carregando...</p>
}

  return (
    <div className="imagem-fundo flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <LogoHeaderview />
        <Carouselview />
        <Cardsview />
        <CardConteudoview />
        <Videosview />
        <Comment />
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
