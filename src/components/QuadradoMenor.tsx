interface QuadradosProps {
  texts: string[];
}

export default function QuadradoMenor({ texts }: QuadradosProps) {
  return (
    <div>
      {texts.map(text => (
        <div>
          <p>{texts}</p>
        </div>
      ))}
    </div>
  );
}
