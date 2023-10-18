import { useEffect } from 'react';
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
import Button from '../components/EditorPage/ButtonEditor';
import SubMainContent from '../components/EditorPage/SubMainContent';
import pages from '../data/pages.json';
import Title from '../components/EditorPage/Title';
import { HTTP } from '../services/api';
import { create } from 'zustand'

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

  return await HTTP.put(`/pages/${id}`, usePageEditorStore.getState().page  ).catch(() => ({ data: pages }));
};

export function AdminLandingPageEditor() {
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
    return <p>Carregando...</p>;
  }

  if (!id) {
    return null;
  }

  if (!data) {
    return <p>Página não encontrada</p>;
  }

  return (
    <div className="flex flex-col">
      <HeaderFront phone={headerData.phone} logo={headerData.logo} />
      <div className="w-full md:w-[80%] self-center">
        <Header data={data} handleSubmit={mutate} />
        <Title data={data} handleSubmit={mutate} />
        <CarouselComponent data={data} handleSubmit={mutate} />
        <LittleSquaresInfos data={data} handleSubmit={mutate} />
        <MainContent data={data} handleSubmit={mutate} />
        <SubMainContent data={data} handleSubmit={mutate} />
        <Button data={data} handleSubmit={mutate} />
        <VideoEditor data={data} handleSubmit={mutate} />
        <CarouselDepoimentoEditor data={data} handleSubmit={mutate} />
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
