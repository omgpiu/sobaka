import { Card, Collapse } from 'antd';
import styles from './styles.module.css';
import { ISingleTemplate, useDeleteTemplateMutation, UserExtracted, useUserBanMutation } from '../../transport';
import { FC } from 'react';
import { ConfirmationModal } from '../confirmation-modal';
import clsx from 'clsx';

interface IProps {
  template: ISingleTemplate
  isLoading: boolean
  user: UserExtracted
}


export const TemplateInfo: FC<IProps> = ({ template, isLoading, user }) => {
  const { deleteTemplate } = useDeleteTemplateMutation()
  const { banUser } = useUserBanMutation()
  const handleDelete = async () => {
    await deleteTemplate(template.id)
  };

  const handleBanUser = async () => {
    await banUser(template.id)
  }


  const content = (
    <Card className={ styles.cardContainer }>
      <div className={ styles.info }>
        <div className={ clsx(styles.image,styles.pixeled) }>
          { template.url && <img src={ template.url } alt={ 'template_url' } className={ styles.image }/> }
        </div>
        <div className={ styles.templateInfo }>
          <p> <span>TemplateId:</span> { template.id }</p>
          <p><span>Template Hits</span> : { template.hits }</p>
          <p> <span>CreatedAt:</span> { template.createdAt }</p>
          <p><span>imageSize:</span> { template.imageSize }</p>
          <p><span>Template Y:</span> { template.y }</p>
          <p><span>Template X:</span> { template.x }</p>
        </div>
      </div>
      <ConfirmationModal onClick={ handleDelete } isLoading={ isLoading } disabled={ !template.id }/>
      <hr style={{marginTop:'20px'}}/>
      <div className={ styles.info }>
        <div className={ styles.image }>
          { user.userPic && <img src={ user.userPic } alt={ 'userPic' } className={ styles.image }/> }
        </div>
        <div className={ styles.templateInfo }>
          <p><span>Name: </span>{ user.firstName }</p>
          <p><span>League:</span> { user.league }</p>
          <p><span>Comment:</span> { user.comment }</p>
        </div>

      </div>
      <ConfirmationModal
        onClick={ handleBanUser }
        isLoading={ isLoading }
        disabled={ !template.id || user.isBanned }
        confirmationText={ `Точно хотите забанить  ${user.firstName} ?` }
        mainButtonTitle={ user.isBanned ? 'Забанен' : 'Забанить?' }
        modalTitle={ `Время банить говнаря ${user.firstName}` }
      >
        <div className={ styles.image }>
          { user.userPic && <img src={ user.userPic } alt={ 'userPic' } className={ styles.image }/> }
        </div>
      </ConfirmationModal>
    </Card>)

  const label = <div className={ styles.collapsedHeader }>
    <div>Show Template Info: { template.id }</div>
  </div>


  const items = [
    {
      key: '1',
      children: content,
      label
    },
  ];

  return <Collapse items={ items }/>
};