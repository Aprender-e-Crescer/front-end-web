import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import horizontalCardData from '../data/horizontalCard.json';
import HorizontalCardProps from '../pages/HorizontalCardProps.tsx';



export function MentorNetwork() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <div className="mt-8 grid grid-cols-1">
        {horizontalCardData.map(({ imgSrc, title, content }) => 
            <HorizontalCardProps
              imgSrc={imgSrc}
              title={title}
              content={content}
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
