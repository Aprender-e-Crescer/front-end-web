import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import { TesteLogin } from '../components/TesteLogin';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';

export function Main() {
  return (
    <div>
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <TesteLogin/>
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
