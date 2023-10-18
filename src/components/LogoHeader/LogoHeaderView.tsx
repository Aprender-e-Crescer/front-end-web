import Logo from './LogoHeader';

function LogoHeaderview({data}) {
  return <Logo logo={data.find(item => item.type === 'logo')?.content as string} />;
}

export default LogoHeaderview;
