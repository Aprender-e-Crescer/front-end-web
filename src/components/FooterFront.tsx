import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';

interface Props {
  leftItems: { title: string; items: string[] };
  rightItems: { title: string; items: string[] };
  subtitles: string[];
  logo: string;
}

export function FooterFront({ leftItems, rightItems, subtitles, logo }: Props) {
  return (
    <Footer container>
      <div className="w-full">
        <div className=" w-full justify-around sm:flex sm:justify-between md:flex md:grid-cols-2">
          <Footer.Brand alt="logo do site" href="#" src={logo} />
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6 ">
            <div>
              <Footer.Title title={leftItems.title} />
              <Footer.LinkGroup className="flex flex-col ">
                {leftItems.items.map(item => (
                  <Footer.Link href="#">{item}</Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title={rightItems.title} />
              <Footer.LinkGroup col>
                {rightItems.items.map(item => (
                  <Footer.Link href="#">{item}</Footer.Link>
                ))}
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col">
            {subtitles.map(subtitle => (
              <p>{subtitle}</p>
            ))}
          </div>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/sudotec/" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/sudotec/" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
