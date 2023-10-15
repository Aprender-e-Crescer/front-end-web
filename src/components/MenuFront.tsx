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
    <div className="px-4">
      <Navbar.Toggle className="lg:hidden" />
      <Navbar.Collapse className="[&>ul]:gap-2 md:gap-0">
        {items.map(({ id, title, subitems }) =>
          subitems !== undefined ? (
            <Dropdown key={id} inline label={title}>
              {subitems?.map(({ id: subItemId, title: subItemTitle }) => (
                <Dropdown.Item key={subItemId} className="text-black">
                  {subItemTitle}
                </Dropdown.Item>
              ))}
            </Dropdown>
          ) : (
            <Navbar.Link key={id} href="#" className="text-black m-0 p-0">
              {title}
            </Navbar.Link>
          ),
        )}
      </Navbar.Collapse>
    </div>
  );
}
