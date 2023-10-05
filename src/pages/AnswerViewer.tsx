import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import { DateSelectViewer } from '../components/DateSelectViewer';
import { ShortAnswerViewer } from '../components/ShortAnswerViewer';
// import { Chart } from '../components/Chart';
// import chart from '../data/chart.json';
import days from '../data/days.json';
import short from '../data/short.json';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';

export function AnswerViewer() {
  return (
    <div>
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="">
        <ShortAnswerViewer title={short.title} answers={short.answers} />
        <DateSelectViewer dates={days.dates} title={days.title} />
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
