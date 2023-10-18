import Logo from './LogoHeader';

function LogoHeaderview({data}) {
  const logo = data?.find?.(item => item.type === 'logo')?.content as string;

  if (!logo) return null;

  return <Logo logo={logo} />;
}

export default LogoHeaderview;
