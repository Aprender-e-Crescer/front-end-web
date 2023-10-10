import Logo from './LogoHeader';
import data from '../../data/components.json';

function LogoHeaderview() {
  return <Logo logo={data.find(item => item.type === 'logo')?.content as string} />;
}

export default LogoHeaderview;
