import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import { FormUpSert } from './FormUpSert';

export function Main() {
  return (
    <div>
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <FormUpSert />
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
