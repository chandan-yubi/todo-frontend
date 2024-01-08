import { useState, ComponentType } from "react";
import Modal from "../components/Modal/Modal";
import { ModalProps } from "../models/ModalProps";


const useOpenModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<ModalProps>({
    Component: null,
    items: null,
    additionalProps: null,
    closeModal: () => {},
  });

  const openModal = (Component: ComponentType<any>, items?: any, additionalProps?: any) => {
    setModalComponent({
      Component,
      items,
      additionalProps,
      closeModal: closeModal,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalComponent({ Component: null, items: null, additionalProps: null, closeModal: () => {} });
  };

  const ModalWrapper = modalComponent.Component && (
    <Modal onClose={closeModal} open={modalOpen}>
      <modalComponent.Component items={modalComponent.items} additionalProps={modalComponent.additionalProps} closeModal={closeModal} />
    </Modal>
  );

  return {
    openModal,
    closeModal,
    ModalWrapper,
  };
};

export default useOpenModal;
