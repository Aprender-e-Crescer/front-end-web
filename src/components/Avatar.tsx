import { Avatar, Dropdown } from 'flowbite-react';
export default function UserDropdown() {
    return (
        <Dropdown
            inline
            label={<Avatar alt="User settings" img='' rounded />}
            >
            <Dropdown.Header>
                <span className="text-sm">
                    Leonardo Martins
                </span>
                <span className="block text-sm font-medium">
                    martins.moreira.leonardo@escola.pr.gov.br
                </span>
            </Dropdown.Header>
            <Dropdown.Divider  />
            <button className='flex p-2 gap-1 text-lg items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
                Sair
            </button>
        </Dropdown>

    )
}


