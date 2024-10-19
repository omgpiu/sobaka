import { TemplateInfo, TemplatesTable } from '../../components';
import styles from './styles.module.css'
import { useTemplateQuery } from '../../transport';
import { usePagination } from '../../hooks';

export const TemplatesPage = () => {
  const { getSingleTemplate, template, user, isLoading } = useTemplateQuery()
  const { limit, offset, updatePagination } = usePagination(20);
  return (
    <div className={ styles.root }>
      <TemplateInfo
        template={ template }
        user={ user }
        isLoading={ isLoading }
        offset={ offset }
        limit={ limit }/>
      <TemplatesTable
        onIdClick={ getSingleTemplate }
        isSingleTemplateLoading={ isLoading }
        offset={ offset }
        limit={ limit }
        updatePagination={ updatePagination }/>
    </div>
  )
}