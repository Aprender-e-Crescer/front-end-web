import { Button } from 'flowbite-react';
import bttn from './botoes.json';

interface BotaoInfo {
  nome: string;
  links: string;
}

function NavigationButtons() {
  return (
    <div className="flex flex-col gap-9">
      {bttn.map(({ nome, links }: BotaoInfo) => (
        <Button className="w-[250px] h-[100px];" href={links} gradientDuoTone="pinkToOrange" outline>
          {nome}
        </Button>
      ))}
    </div>
  );
}

export default NavigationButtons;
