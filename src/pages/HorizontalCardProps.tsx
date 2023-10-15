import { Card } from 'flowbite-react'

interface HorizontalCardProps {
  imgSrc: string;
  title: string;
  content: string;
}

const HorizontalCard: React.FC<HorizontalCardProps> = ({ imgSrc, title, content }) => {
  return (
    <Card className='gap-2 m-10'
      horizontal
      imgSrc={imgSrc}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>
      <div className="flex flex-col justify-center gap-4">
              {content.split('\n').map(str => <p>{str}</p>)}
            </div>
    </Card>
  );
}

export default HorizontalCard;
