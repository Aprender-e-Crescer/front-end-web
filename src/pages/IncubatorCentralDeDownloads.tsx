import { Link } from 'react-router-dom';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import data from '../data/componentsIncubatorCentralDeDownload.json';

export function IncubatorCentralDeDownloads() {
  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <div className="m-8">
          {data
            .find(item => item.type === 'links')
            ?.content.map(({ title, url }, index) => (
              <p>
                <a href={url} className="underline text-blue-600 hover:text-blue-800">
                  {title}
                </a>
              </p>
            ))}
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
