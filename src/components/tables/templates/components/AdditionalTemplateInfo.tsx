import { ISingleTemplate, ITemplate, UserExtracted } from '../../../../transport';
import { FC } from 'react';
import { Button } from 'antd';
import styles from './styles.module.css';
import { ConfirmationModal } from '../../../confirmation-modal';

type Extended = ITemplate & {
  extended?: ISingleTemplate & UserExtracted
}


interface IProps {
  record: Extended
  getTemplateInfo: (templateId: string) => void
  loading: boolean
  banUser: (id: number) => void
}

export const AdditionalTemplateInfo: FC<IProps> = ({ record, getTemplateInfo, loading, banUser }) => {
  const handleRequestClick = () => getTemplateInfo(record.templateId)
  const handleUserBaned = () => banUser(Number(record.templateId))
  if (record?.extended) {
    const {
      id,
      hits,
      createdAt,
      imageSize,
      y,
      x,
      firstName,
      league,
      comment,
      isContractor,
      userPic,
      isBanned
    } = record.extended

    return <div className={ styles.cardContainer }>
      <div className={ styles.info }>
        <div className={ styles.templateInfo }>
          <p><span>TemplateId:</span> { id }</p>
          <p><span>Template Hits</span> : { hits }</p>
          <p>
            <span>CreatedAt:</span> { createdAt && new Date(createdAt * 1000).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }) }
          </p>
          <p><span>imageSize:</span> { imageSize }</p>
          <p><span>Template Y:</span> { y }</p>
          <p><span>Template X:</span> { x }</p>
          <p><span>Name: </span>{ firstName }</p>
          <p><span>League:</span> { league }</p>
          <p><span>Comment:</span> { comment }</p>
          <p><span>isContractor:</span> { String(isContractor) }</p>
        </div>
      </div>
      <ConfirmationModal
        onClick={ handleUserBaned }
        isLoading={ loading }
        disabled={ !id || isBanned }
        confirmationText={ `Точно хотите забанить  ${ firstName } ?` }
        mainButtonTitle={ isBanned ? 'Забанен' : `Забанить ${ firstName ?? '' } ` }
        modalTitle={ `Время банить говнаря ${ firstName }` }
      >
        <div className={ styles.image }>
          { userPic && <img src={ userPic } alt={ 'userPic' } className={ styles.image }/> }
        </div>
      </ConfirmationModal>
    </div>
  }

  return <Button onClick={ handleRequestClick }  type={ 'primary' }>Темлейт дата</Button>


}