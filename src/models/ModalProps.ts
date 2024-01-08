import { ComponentType } from "react";

export interface ModalProps {
    Component: ComponentType<any> | null;
    items?: any;
    additionalProps?: any;
    closeModal: () => void;
}