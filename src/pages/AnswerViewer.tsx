import { Switch, Case } from 'react-if';
import { Tabs, Card } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateSelectViewer } from '../components/DateSelectViewer';
import { ShortAnswerViewer } from '../components/ShortAnswerViewer';
import { Chart } from '../components/Chart';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import pageData from '../data/answer_viewer_page.json';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import FormViewer from '../components/FormViewer';
import fields from '../data/answer_viewer_page_form.json';
import { getFieldName } from '../utils/getFieldName';

export function AnswerViewer() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    [getFieldName(fields[0])]: 'Jonatann',
    [getFieldName(fields[1])]: '2021-03-12',
    [getFieldName(fields[2])]: 'Rua tal',
    [getFieldName(fields[3])]: 'Ensino Médio',
  });

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

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(false);
      setOpenModal({ isModalOpen: true, modalTitle: 'Formulário enviado com sucesso!', handleModalClose });
    } catch (error) {
      setIsLoading(false);
      setOpenModal({ isModalOpen: true, modalTitle: 'Erro ao enviar formulário', handleModalClose });
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center pt-10">
        <h3 className="text-3xl text-bold">{pageData[0].data.answers?.length || 0} Respostas</h3>
        <Tabs.Group aria-label="Pills">
          <Tabs.Item title="Resumo">
            <div className="flex flex-col gap-4">
              {pageData.map(({ type, data }) => (
                <Switch>
                  <Case condition={type === 'ShortAnswersViewer'}>
                    <Card>
                      <ShortAnswerViewer {...data} />
                    </Card>
                  </Case>
                </Switch>
              ))}
              {pageData.map(({ type, data }) => (
                <Switch>
                  <Case condition={type === 'DateSelectViewer'}>
                    <Card>
                      <DateSelectViewer {...data} />
                    </Card>
                  </Case>
                </Switch>
              ))}
              {pageData.map(({ type, data }) => (
                <Switch>
                  <Case condition={type === 'Chart'}>
                    <Card>
                      <Chart {...data} />
                    </Card>
                  </Case>
                </Switch>
              ))}
            </div>
          </Tabs.Item>
          <Tabs.Item title="Individual">
            <FormViewer
              handleModalClose={handleModalClose}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isModalOpen={isModalOpen}
              modalTitle={modalTitle}
              fields={fields}
              mainTitle="Formulário respondido"
              hideActions
              isFieldsDisabled
              values={formValues}
            />
            <div className="flex">
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-60 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Anterior
              </a>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-80 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Próximo
              </a>
            </div>
          </Tabs.Item>
        </Tabs.Group>
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
