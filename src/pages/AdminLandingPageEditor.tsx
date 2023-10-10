import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import Header from '../components/EditorPage/HeaderEditor';
import CarouselComponent from '../components/EditorPage/CarouselImageEditor';
import LittleSquaresInfos from '../components/EditorPage/LittleSquaresInfos';
import CarouselDepoimentoEditor from '../components/EditorPage/CarouselOpinionsEditor';
import MainContent from '../components/EditorPage/MainContent';
import VideoEditor from '../components/EditorPage/VideosEditor';
import Button from '../components/EditorPage/ButtonEditor';
import SubMainContent from '../components/EditorPage/SubMainContent'

export function AdminLandingPageEditor() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <Header />
        <CarouselComponent />
        <LittleSquaresInfos />
        <MainContent/>
        <SubMainContent/>
        <Button/>
        <VideoEditor/>
        <CarouselDepoimentoEditor/>

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
