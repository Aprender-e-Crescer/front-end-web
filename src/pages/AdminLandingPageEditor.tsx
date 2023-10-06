import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import Header from '../components/EditorPage/HeaderEditor';
import CarouselComponent from '../components/EditorPage/CarouselImageEditor';
import LittleSquaresInfos from '../components/EditorPage/LittleSquaresInfos';
import CarouselDepoimentoEditor from '../components/EditorPage/CarouselOpinionsEditor';
import SubContent from '../components/EditorPage/SubContent';
import VideoEditor from '../components/EditorPage/VideosEditor';
import Button from '../components/EditorPage/ButtonEditor';

export function AdminLandingPageEditor() {
  return (
    <div>
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <Header />
      <CarouselComponent />
      <LittleSquaresInfos />
      <SubContent />
      <VideoEditor />
      <Button />
      <CarouselDepoimentoEditor />
      <FooterFront
        leftItems={footerData.leftItems}
        rightItems={footerData.rightItems}
        logo={footerData.logo}
        subtitles={footerData.subtitles}
      />
    </div>
  );
}
