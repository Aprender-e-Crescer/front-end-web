import React from 'react';

const MeuComponente = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="h-60 w-3/5 border-8 border-orange-500 mb-4"><b className='text-blue-950 text-xl'>O Projeto Aprender & Crescer foi criado pela Sudotec em 2006 e desde então vem atuando como um agente <br />de qualificação profissional na região Sudoeste do Paraná. Desde então, foram realizadas quinze edições <br /> somente na cidade de Dois Vizinhos e outras seis em outros municípios paranaense, beneficiando mais <br /> de 1200 jovens.</b></div>
            <div className="flex">
                <div className="w-3/12 border-8 border-orange-500 ml-96">
                    <b className='text-blue-950 text-lg'>A Sudotec em parceria com a Prefeitura Municipal de Dois Vizinhos abriu inscrições para mais uma seletiva. A Capacitação acontecerá no município de Dois Vizinhos, com início no dia 03 de Março de 2023.Objetivo: Capacitar jovens com idade mínima de 16 anos na área de desenvolvimento de software.</b>
                </div>
                <button className="h-12 w-52 absolute rounded-lg mt-12 top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-2">
                    Incrições
                </button>
            </div>
        </div>
    );
};

export default MeuComponente;