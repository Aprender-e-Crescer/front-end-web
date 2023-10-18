import { Switch, Case } from 'react-if';
import { Tabs, Card } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueries } from 'react-query';
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
import answersData from '../data/answer_viewer_page_answers.json';
import { getFieldName } from '../utils/getFieldName';
import { HTTP } from '../services/api';

async function fetchQuestions() {
  const forms = await HTTP.get('/forms').catch(() => ({ data: { data: { questions: fields } } }));

  return forms.data.data.questions.filter(({ active }) => active);
}

async function fetchAnswers() {
  const answers = await HTTP.get('/answers').catch(() => ({ data: { data: { answers: answersData } } }));

  return answers.data.data.answers;
}

const reduceFormValues = (questions, answersData, currentAnswer) => {
  const newQuestions = questions.reduce((accumulator, field) => {
    return {
      ...accumulator,
      [getFieldName(field)]: answersData[currentAnswer].answers?.[0]?.[field._id],
    };
  }, {});

  return newQuestions;
};

export function AnswerViewer() {
  const [{ data: questions = [], isLoading: isLoadingQuestions }, { data: answers = [], isLoading: isLoadingAnswers }] =
    useQueries([
      { queryKey: ['questions'], queryFn: fetchQuestions },
      { queryKey: ['answers'], queryFn: fetchAnswers },
    ]);
  const navigate = useNavigate();

  const currentAnswer = useRef(0);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    if (questions.length === 0 && answers.length === 0) return;

    currentAnswer.current < answers.length && (currentAnswer.current += 1);

    const newFormValues = reduceFormValues(questions, answersData, currentAnswer.current);

    setFormValues(newFormValues);
  }, [answers, questions]);

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

  const handleGoToNext = () => {
    currentAnswer.current < answers.length - 1 && (currentAnswer.current += 1);

    setFormValues(reduceFormValues(questions, answersData, currentAnswer.current));
  };

  const handleGoToPrevious = () => {
    currentAnswer.current > 0 && (currentAnswer.current -= 1);
    setFormValues(reduceFormValues(questions, answersData, currentAnswer.current));
  };

  if (isLoadingQuestions || isLoadingAnswers) {
    return <p>Carregando...</p>;
  }

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
            <div className="flex mb-4">
              <button
                onClick={handleGoToPrevious}
                className="flex items-center justify-center px-3 h-8 ml-60 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Anterior
              </button>
              <button
                onClick={handleGoToNext}
                className="flex items-center justify-center px-3 h-8 ml-80 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Próximo
              </button>
            </div>
            <FormViewer
              handleModalClose={handleModalClose}
              isModalOpen={isModalOpen}
              modalTitle={modalTitle}
              fields={questions}
              mainTitle="Formulário respondido"
              hideActions
              isFieldsDisabled
              values={formValues}
            />
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
