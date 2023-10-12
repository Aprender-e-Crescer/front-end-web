import { Switch, Case } from 'react-if';
import { Card } from 'flowbite-react';
import { DateSelectViewer } from '../components/DateSelectViewer';
import { ShortAnswerViewer } from '../components/ShortAnswerViewer';
import { Chart } from '../components/Chart';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import pageData from '../data/answer_viewer_page.json';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';

export function AnswerViewer() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center pt-10">
        <Card>
          <h3 className="text-3xl text-bold">{pageData[0].data.answers?.length || 0} Respostas</h3>
        </Card>
        {pageData.map(({ type, data }) => (
          <Switch>
            <Case condition={type === 'ShortAnswersViewer'}>
              <ShortAnswerViewer {...data} />
            </Case>
          </Switch>
        ))}
        {pageData.map(({ type, data }) => (
          <Switch>
            <Case condition={type === 'DateSelectViewer'}>
              <DateSelectViewer {...data} />
            </Case>
          </Switch>
        ))}
        {pageData.map(({ type, data }) => (
          <Switch>
            <Case condition={type === 'Chart'}>
              <Chart {...data} />
            </Case>
          </Switch>
        ))}
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
