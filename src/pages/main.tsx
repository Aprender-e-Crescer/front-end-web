import { MenuFront } from '../components/MenuFront';
import menuData from '../data/menu.json';

export function Main() {
  return <MenuFront menu={menuData} />;
}
