import { useState } from 'react';
import { Modal, Card } from 'flowbite-react';

export function PopUpModal({ buttonText, businessName, imageSrc, mainText }: PopUpModalProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();

  return (
    <>
    <Card
    onClick={() => setOpenModal('pop-up')}
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={imageSrc}
       
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>
          Sudotec
        </p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>
          Fechar
        </p>
      </p>
    </Card>
      <Modal className='[&>div]:max-w-full' show={openModal === 'pop-up'} size="md" popup onClose={() => setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body className='flex flex-col gap-8'>
          <div className='flex flex-1 justify-center'>
            <img src="" alt="" />
          </div>
          <div className="text-center">
            <div className="flex flex-col justify-center gap-4">
                <p>Teste</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
