import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import { FormUpdateAdmin } from '../components/FormUpdateAdmin';

export function FormUpSert() {
  return (
    <div>
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <FormUpdateAdmin />
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
