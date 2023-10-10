import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import { DateSelectViewer } from '../components/DateSelectViewer';
import { ShortAnswerViewer } from '../components/ShortAnswerViewer';
import { Chart } from '../components/Chart';
import chart from '../data/chart.json';
import days from '../data/days.json';
import short from '../data/short.json';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';

export function AnswerViewer() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <Chart title={chart.title} labels={chart.labels} datasets={chart.datasets} />
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
