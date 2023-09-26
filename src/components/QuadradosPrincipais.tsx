interface QuadradosProps {
  texts: string[];
  span: string;
}

export default function QuadradosPrincipais({ texts, span }: QuadradosProps) {
  return (
    <div>
      {texts.map(text => (
        <div>
          <p>{text}</p>
          <p>{span}</p>
        </div>
      ))}
    </div>
  );
}
