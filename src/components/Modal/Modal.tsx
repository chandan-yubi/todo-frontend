// Modal.js
import React from 'react';
import styled, { css } from 'styled-components';

const ModalOverlay = styled.div<{$open: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  min-width: 400px;
  /* width: 100%; */
  max-height: 95vh;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent; /* Optional: remove scrollbar track */
  }
`;

const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 5px;
  font-size: 17px;
  border-radius: 50px;
  background-color: #4b4b4b;
  color: white;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChildrenContainer = styled.div`
    margin-top: 20px;
`;

const Modal = ({onClose, open, children}: any) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };
  return (
    <ModalOverlay $open={open} onClick={onClose}>
      <ModalContent onClick={handleOverlayClick}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ChildrenContainer>{children}</ChildrenContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
