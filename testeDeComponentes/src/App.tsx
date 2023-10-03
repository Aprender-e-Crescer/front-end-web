import bttn from "./components/botoes.json"
import { Button } from 'flowbite-react';
interface BotaoInfo {
  nome: string;
  links: string;
}

function App() {
  return (
    <>
    <div className="flex flex-col gap-9">
      {bttn.map(({nome, links}: BotaoInfo) => (
         <Button className='w-[250px] h-[100px];' href={links}
         gradientDuoTone="pinkToOrange"
         outline
       >
        {nome}
         </Button>

      
      ))}
      </div>

    </>
  );
}

export default App;
