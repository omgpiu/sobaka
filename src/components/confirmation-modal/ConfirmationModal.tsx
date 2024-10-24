import React from 'react';
import { Button, Modal } from 'antd';
import { useModal } from '../../hooks';

interface IProps {
  isLoading?: boolean;
  onClick: () => void;
  mainButtonTitle?: string;
  confirmationText?: string;
  modalTitle?: string;
  disabled?:boolean;
  children?: React.ReactNode;

}


export const ConfirmationModal: React.FC<IProps> = ({
  onClick,
  confirmationText,
  isLoading,
  mainButtonTitle,
  modalTitle,
  disabled,
  children
}) => {
  const { isModalVisible, showModal, hideModal } = useModal();

  const handleOnClick = () => {
    onClick()
    hideModal();
  };

  return (
    <div>
      <Button type="primary" onClick={ showModal } disabled={disabled}>
        { mainButtonTitle ?? "Удалить" }
      </Button>

      <Modal
        title={ modalTitle ?? "Подтверждение удаления" }
        open={ isModalVisible }
        onCancel={ hideModal }
        footer={ [
          <Button key="no" onClick={ hideModal } loading={ isLoading }>
            Нет
          </Button>,
          <Button key="yes" type="primary" onClick={ handleOnClick } loading={ isLoading }>
            Да
          </Button>,
        ] }
      >
        <p style={{paddingBottom:'10px'}}>{ confirmationText ?? "Вы точно хотите удалить данный Темплейт?" }</p>
        {children}
      </Modal>
    </div>
  );
};

