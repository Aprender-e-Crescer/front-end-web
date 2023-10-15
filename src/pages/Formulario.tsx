import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTTP } from '../services/api';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import { HeaderFront } from '../components/HeaderFront';
import FormViewer from '../components/FormViewer';

export function Formulario() {
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);

  const handleModalClose = () => {
    setOpenModal({ isModalOpen: false });
    navigate('/');
  };

  const [{ isModalOpen, modalTitle }, setOpenModal] = useState<{
    isModalOpen: boolean;
    modalTitle?: string;
    handleModalClose?: () => void;
  }>({
    isModalOpen: false,
    modalTitle: 'Formulário enviado com sucesso!',
    handleModalClose: () => {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await HTTP.get('api/form/ac');
      const result = response.data;
      setFields(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await HTTP.post('salva/dados', values);
      getData();
      setIsLoading(false);
      setOpenModal({ isModalOpen: true, modalTitle: 'Formulário enviado com sucesso!', handle });
    } catch (error) {
      setIsLoading(false);
      setOpenModal({ isModalOpen: true, modalTitle: 'Erro ao enviar formulário' });
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <FormViewer
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          modalTitle={modalTitle}
          fields={fields}
          mainTitle="Inscrever-se para o programa de qualificação Aprender e Crescer"
          srcMainImage="/img/aprendereCrescer2.png"
        />
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
