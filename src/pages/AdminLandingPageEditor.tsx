import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import Header from '../components/EditorPage/HeaderEditor';
import CarouselComponent from '../components/EditorPage/CarouselImageEditor';
import LittleSquaresInfos from '../components/EditorPage/LittleSquaresInfos';
import BigSquareInfos from '../components/EditorPage/BigSquareInfos';
import Button from '../components/EditorPage/ButtonEditor';
import VideosEditor from '../components/EditorPage/VideosEditor';
import CarouselVideoEditor from '../components/EditorPage/CarouselOpinionsEditor';

export function AdminLandingPageEditor() {
  return (
    <div>
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />

      <Header />
      <CarouselComponent />
      <LittleSquaresInfos />
      <BigSquareInfos />
      <Button />
      <VideosEditor />
      <CarouselVideoEditor />

      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
