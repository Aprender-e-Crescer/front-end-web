import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import { PopUpModal } from '../components/PopUpModal';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import popUpModalData from '../data/popUpModal.json';

export function BusinessIncubated() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popUpModalData.map(({ businessName, buttonText, imageSrc, mainText }) => 
            <PopUpModal
              businessName={businessName}
              buttonText={buttonText}
              imageSrc={imageSrc}
              mainText={mainText}
            />
          )}
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
