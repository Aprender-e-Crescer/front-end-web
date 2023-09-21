
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag } from 'react-icons/hi';


export default function MultiLevelDropdown() {
	return (
		<Sidebar aria-label="Sidebar with multi-level" className='text-white'>
			<Sidebar.Items className='bg-blue-700 h-screen rounded-none'>
				<Sidebar.ItemGroup >
					<Sidebar.Item
						href="#"
						icon={HiChartPie}
						className='text-white font-medium hover:bg-blue-400 rounded-none'>
						<p>Dashboard</p>
					</Sidebar.Item>
					<Sidebar.Collapse
						icon={HiShoppingBag}
						label="Editar Conteúdos"
						className='text-white font-medium hover:bg-blue-400 rounded-none'
					>
						<Sidebar.Item href="#" className='text-white font-normal hover:bg-blue-400 rounded-none'>
							Home
						</Sidebar.Item>

						<Sidebar.Item href="#" className='text-white font-normal hover:bg-blue-400 rounded-none'>
							Vídeos
						</Sidebar.Item>

						<Sidebar.Item href="#" className='text-white font-normal hover:bg-blue-400 rounded-none'>
							Carrossel
						</Sidebar.Item>

						<Sidebar.Item href="#" className='text-white font-normal hover:bg-blue-400 rounded-none'>
							Depoimentos
						</Sidebar.Item>
					</Sidebar.Collapse>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	)
}


