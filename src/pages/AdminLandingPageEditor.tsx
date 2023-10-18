import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { HeaderFront } from '../components/HeaderFront';
import { FooterFront } from '../components/FooterFront';
import headerData from '../data/header.json';
import footerData from '../data/footer.json';
import Header from '../components/EditorPage/HeaderEditor';
import CarouselComponent from '../components/EditorPage/CarouselImageEditor';
import LittleSquaresInfos from '../components/EditorPage/LittleSquaresInfos';
import CarouselDepoimentoEditor from '../components/EditorPage/CarouselOpinionsEditor';
import MainContent from '../components/EditorPage/MainContent';
import VideoEditor from '../components/EditorPage/VideosEditor';
import ButtonEditor from '../components/EditorPage/ButtonEditor';
import SubMainContent from '../components/EditorPage/SubMainContent';
import pages from '../data/pages.json';
import Title from '../components/EditorPage/Title';
import { HTTP } from '../services/api';
import { create } from 'zustand'
import { Spinner} from 'flowbite-react';



const usePageEditorStore = create((set) => ({
  page: null,
  setInitPage: (page) => set({ page }),
  updateField: (field) => set(({page}) => ({ page: {...page, content: [...page.content.filter(({ type }) => type !== field.type), field]} }))
}))

const fetchData = (id: number) => async () => {
  const { data } = await HTTP.get('/presentations').catch(() => ({ data: {data: { pages } } }));

  return data.data.pages.find(item => item._id == id);
};

const updateData = (id: number) => async values => {
  usePageEditorStore.getState().updateField(values);
    await HTTP.put(`/pages/${id}`, usePageEditorStore.getState().page  ).catch(() => ({ data: pages }));
};

export function AdminLandingPageEditor() {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const { id } = useParams();
  const { data: page, isLoading } = useQuery({
    queryKey: [`page${id}`],
    queryFn: fetchData(id),
  });
  const data = page?.content;

  const { mutate, isLoading: isLoadingUpdate } = useMutation({
    mutationKey: [`page${id}`],
    mutationFn: updateData(id),
  });

  useEffect(() => {
    usePageEditorStore.getState().setInitPage(page);
  }, [page]);

  if (isLoading && isLoadingUpdate) {
    return <div className='w-screen h-screen items-center flex justify-center'> <Spinner
    aria-label="Extra large spinner example"
    size="xl"
    color="success"
  />;
  </div>
  }

  if (!id) {
    return null;
  }

  if (!data) {
    return <div className='w-screen h-screen items-center flex justify-center'> <Spinner
    aria-label="Extra large spinner example"
    size="xl"
    color="success"
  />;
    </div>
  }
  
  const handleSubmit = (values) => {
    mutate(values)
    setOpenModal(!openModal)
  }

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <Header data={data} handleSubmit={handleSubmit} />
        <Title data={data} handleSubmit={handleSubmit} />
        <CarouselComponent data={data} handleSubmit={handleSubmit} />
        <LittleSquaresInfos data={data} handleSubmit={handleSubmit} />
        <MainContent data={data} handleSubmit={handleSubmit} />
        <SubMainContent data={data} handleSubmit={handleSubmit} />
        <ButtonEditor data={data} handleSubmit={handleSubmit} />
        <VideoEditor data={data} handleSubmit={handleSubmit} />
        <CarouselDepoimentoEditor data={data} handleSubmit={handleSubmit} />
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
