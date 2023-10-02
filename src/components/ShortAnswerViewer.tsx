interface Props {
  title: string;
  answers: string[];
}

export function ShortAnswerViewer({ title, answers }: Props) {
  return (
    <div className="bg-white p-5 flex flex-col gap-3 rounded">
      <div>
        <h5 className="text-xl">{title}</h5>
        <p>{answers.length} respostas</p>
      </div>
      <div className="flex flex-col gap-2">
        {answers.map(answer => (
          <p className="bg-gray-200 rounded p-2">{answer}</p>
        ))}
      </div>
    </div>
  );
}
