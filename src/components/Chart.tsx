import { Doughnut } from 'react-chartjs-2';

const chartStyle = {
  backgroundColor: [
    'rgba(255, 99, 132, 8)',
    'rgba(255, 159, 64, 8)',
    'rgba(255, 206, 86, 8)',
    'rgba(0,0,205)',
    'rgba(153, 102, 255, 8)',
    'rgba(25,25,112)',
  ],
  borderColor: [
    'rgba(255, 99, 130, 8)',
    'rgba(255, 159, 64, 8)',
    'rgba(255, 206, 86, 8)',
    'rgba(0,0,205)',
    'rgba(153, 102, 255, 8)',
    'rgba(25,25,112)',
  ],
  borderWidth: 1,
};

interface Props {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export function Chart({ title, labels, datasets }: Props) {
  return (
    <>
      <h3 className="text-xl text-center">{title}</h3>
      <Doughnut
        data={{
          labels,
          datasets: datasets.map(dataset => ({
            ...dataset,
            ...chartStyle,
          })),
        }}
      />
    </>
  );
}
