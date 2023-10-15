import { Button, Modal } from 'flowbite-react';

interface Props {
  openModal: boolean;
  handleClose?: () => void;
  title?: string;
  buttonColor?: 'success' | 'failure';
}

export function FormModal({ handleClose, openModal, title = '', buttonColor }: Props) {
  return (
    <Modal show={openModal} size="md" popup onClose={handleClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex justify-center gap-4">
            <Button color={buttonColor} onClick={handleClose}>
              OK
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
