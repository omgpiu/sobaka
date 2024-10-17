import { Card, Button, message, Collapse } from 'antd';
import styles from './styles.module.css';
import { ISingleTemplate } from '../../transport';
import { FC } from 'react';

interface IProps {
  template: ISingleTemplate
  isLoading: boolean
}


export const TemplateInfo:FC<IProps> = ({template,isLoading}) => {

  const handleDelete = async () => {
    message.warning('Тут будем удалять темплейт');
  };



  const content = (
    <Card className={ styles.cardContainer }>
      <div className={ styles.info }>
        <div className={ styles.image }>
          { template.url && <img src={ template.url } alt={'template_url'} className={styles.image}/>  }
        </div>
        <div className={ styles.templateInfo }>
          <p>TemplateId: { template.id }</p>
          <p>Template Hits : { template.hits }</p>
          <p>CreatedAt: { template.createdAt }</p>
          <p>imageSize: { template.imageSize }</p>
          <p>Template Y: { template.y }</p>
          <p>Template X: { template.x }</p>
        </div>
      </div>
      <Button
        className={ styles.buttonDelete }
        onClick={ handleDelete }
        loading={isLoading}
      >
        Delete
      </Button>
    </Card>)

  const label = <div className={ styles.collapsedHeader }>
    <div>Show Template Info: {template.id}</div>
  </div>


  const items = [
    {
      key: '1',
      children: content,
      label
    },
  ];

  return <Collapse items={ items } />
};