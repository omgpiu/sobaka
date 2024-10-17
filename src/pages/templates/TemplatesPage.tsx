import { TemplatesTable } from '../../components';
import styles from './styles.module.css'

export const TemplatesPage = () => {

  return (
    <div className={ styles.root }>
      <TemplatesTable />
    </div>
  )
}