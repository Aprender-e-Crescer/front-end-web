import { Dropdown, Navbar } from 'flowbite-react';

interface IItems {
  id: number;
  title: string;
}

interface Props {
  menu: (
    | {
        id: number;
        title: string;
        items: IItems[];
      }
    | {
        id: number;
        title: string;
        items?: undefined;
      }
  )[];
}

export function MenuFront({ menu }: Props) {
  return (
    <Navbar className="" fluid rounded>
      <div className="flex w-10 md:order-2">
        <Navbar.Collapse>
          {menu.map(({ id, title, items }) =>
            items !== undefined ? (
              <Dropdown key={id} inline label={title}>
                {items?.map(({ id: subItemId, title: subItemTitle }) => (
                  <Dropdown.Item key={subItemId}>{subItemTitle}</Dropdown.Item>
                ))}
              </Dropdown>
            ) : (
              <Navbar.Link key={id} href="#">
                {title}
              </Navbar.Link>
            ),
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
