import { useState } from 'react';

function App() {

  return (
    <>
      <MinhaPergunta />
    </>
  );
}
//teste
export default App;

function MinhaPergunta(){
  return(
    <div className='bg-blue-200 flex flex-col w-fit text-center font-bold rounded-lg py-4 px-4'>
      <h1>Digite sua pergunta:</h1>
      <input className='rounded-full' type="text" />
    </div>
    )
}