interface Props {
  title: string;
  dates: {
    [key: string]: number[];
  };
}

export function DateSelectViewer({ title, dates }: Props) {
  return (
    <div className="bg-white p-5 flex flex-col gap-3 rounded">
      <div>
        <h5 className="text-xl">{title}</h5>
        <p>{dates.length} respostas</p>
      </div>
      <div className="flex flex-col gap-2">
        {Object.keys(dates).map(date => (
          <div className="flex bg-blue-100">
            <p className="rounded pr-2">{date}</p>-
            {dates[date].map(day => (
              <p className="rounded px-2">{day}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
