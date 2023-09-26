interface CabecalhoProps {
  title: string;
  subtitle: string;
  imgUrl: string;
  imgAlt: string;
}

function Cabecalho({ title, subtitle, imgUrl, imgAlt }: CabecalhoProps) {
  return (
    <div>
      <img src={imgUrl} alt={imgAlt} />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default Cabecalho;
