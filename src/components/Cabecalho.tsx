interface CabecalhoProps {
  title: string;
  subtitle: string;
}

function Cabecalho({ title, subtitle, logoUrl }: CabecalhoProps) {
  return (
    <div>
      <img src={logoUrl} alt="" />
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default Cabecalho;
