import { Card, Collapse } from 'antd';
import styles from './styles.module.css';
import { ISingleTemplate, useDeleteTemplateMutation } from '../../transport';
import { FC } from 'react';
import { ConfirmationModal } from '../confirmation-modal';

interface IProps {
  template: ISingleTemplate
  isLoading: boolean
}


export const TemplateInfo:FC<IProps> = ({template,isLoading}) => {
  const { deleteTemplate } = useDeleteTemplateMutation()

  const handleDelete = async () => {
    await deleteTemplate(template.id)
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
      <ConfirmationModal onClick={handleDelete} isLoading={isLoading} disabled={!template.id}/>
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