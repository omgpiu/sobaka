import { Card, Button, message, Collapse, Input } from 'antd';
import styles from './styles.module.css';
import { useTemplateQuery } from '../../transport';
import { useState } from 'react';


export const TemplateInfo = () => {
  const { getSingleTemplate, data: template, isLoading } = useTemplateQuery()
  const [ templateId, setTemplateId ] = useState('')

  const handleDelete = async () => {
    message.warning('Тут будем удалять темплейт');
  };

  const handleGetTemplate = (e: any) => {
    e.stopPropagation();
    getSingleTemplate(templateId)
  }

  const handleInputChange = (e: any) => {
    setTemplateId(e.target.value);
  };


  const content = (
    <Card className={ styles.cardContainer }>
      <div className={ styles.info }>
        <div className={ styles.image }>
          { template?.url && <img src={ template?.url } alt={'template_url'} className={styles.image}/>  }
        </div>
        <div className={ styles.templateInfo }>
          <p>TemplateId: { template?.id }</p>
          <p>Template Hits : { template?.hits }</p>
          <p>CreatedAt: { template?.createdAt }</p>
          <p>imageSize: { template?.imageSize }</p>
          <p>Template Y: { template?.y }</p>
          <p>Template X: { template?.x }</p>
        </div>
      </div>
      <Button
        className={ styles.buttonDelete }
        onClick={ handleDelete }
      >
        Delete
      </Button>
    </Card>)

  const label = <div className={ styles.collapsedHeader }>
    <div>Show Template Info</div>
    <Input
      className={ styles.input }
      placeholder="Template Id"
      value={ templateId }
      onChange={ handleInputChange }
      disabled={ isLoading }
      onClick={e=>{
        e.stopPropagation();
      }}
    />
    <Button
      type="primary"
      onClick={ handleGetTemplate }
      loading={ isLoading }
    >
      Get Template
    </Button>
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