import { TemplateInfo, TemplatesTable } from '../../components';
import styles from './styles.module.css'

export const TemplatesPage = () => {

  return (
    <div className={ styles.root }>
      <TemplateInfo/>
      <TemplatesTable />
    </div>
  )
}