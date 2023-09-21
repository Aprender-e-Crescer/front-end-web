import { useState } from 'react';

function App() {
  const [perguntaInput, SetperguntaInput] = useState([])

  return (
    <>

      <button className='rounded-full bg-blue-500 border-r-8'>+</button>
    </>
  );
}


export default App;

function perguntaRefresh({perguntaInput})
{
  perguntaInput.map(() => {
    <div className='bg-orange-500'>
      <h1>
        SLA
      </h1>
    </div>
  })
}

function AddPergunta(SetperguntaInput, perguntaInput){ 
  SetperguntaInput([...perguntaInput,1])
}





