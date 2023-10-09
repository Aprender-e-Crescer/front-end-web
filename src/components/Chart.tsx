import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const chartStyle = {
  backgroundColor: [
    'rgba(255,0,0)',
    'rgba(255,140,0)',
    'rgba(255,165,0)',
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

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart({ title, labels, datasets }: Props) {
  return (
    <>
      <h3 className="text-xl p-5">{title}</h3>
      <div className="h-[500px] flex justify-center">
        <Doughnut
          data={{
            labels,
            datasets: datasets.map(dataset => ({
              ...dataset,
              ...chartStyle,
            })),
          }}
        />
      </div>
    </>
  );
}
