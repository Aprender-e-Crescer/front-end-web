import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import CardConteudo from '../components/CardsConteudos/CardConteudo';
import data from '../data/componentsIncubator.json';

export function IncubatorLandingPage() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <CardConteudo
          maxWidth="max-w-full"
          mainContent={data.find(item => item.type === 'title')?.content as string}
          subContent={data.find(item => item.type === 'main-content')?.content as string}
          buttons={
            data.find(item => item.type === 'content-buttons')?.content as {
              title: string;
              link: string;
            }[]
          }
        />
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
