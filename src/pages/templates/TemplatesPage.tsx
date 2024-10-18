import { TemplateInfo, TemplatesTable } from '../../components';
import styles from './styles.module.css'
import { useTemplateQuery } from '../../transport';

export const TemplatesPage = () => {
  const { getSingleTemplate,  template,user, isLoading } = useTemplateQuery()

  return (
    <div className={ styles.root }>
      <TemplateInfo template={template} user={user} isLoading={isLoading}/>
      <TemplatesTable  onIdClick={getSingleTemplate} isSingleTemplateLoading={isLoading}/>
    </div>
  )
}