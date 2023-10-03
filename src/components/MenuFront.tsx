import { Dropdown, Navbar } from 'flowbite-react';

interface IItems {
  id: number;
  title: string;
}

interface Props {
  items: (
    | {
        id: number;
        title: string;
        subitems: IItems[];
      }
    | {
        id: number;
        title: string;
        subitems?: undefined;
      }
  )[];
}

export function MenuFront({ items }: Props) {
  return (
    <Navbar className="" fluid rounded>
      <div className="flex w-10 md:order-2">
        <Navbar.Collapse>
          {items.map(({ id, title, subitems }) =>
            subitems !== undefined ? (
              <Dropdown key={id} inline label={title}>
                {subitems?.map(({ id: subItemId, title: subItemTitle }) => (
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
