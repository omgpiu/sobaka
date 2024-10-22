import { TemplateInfo, TemplatesTable } from '../../components';
import styles from './styles.module.css'
import { useBanTemplateMutation, useTemplateQuery } from '../../transport';
import { usePagination } from '../../hooks';

export const TemplatesPage = () => {
  const { getSingleTemplate, template, user, isLoading } = useTemplateQuery()
  const { limit, offset, updatePagination } = usePagination(20);
  const { banTemplate } = useBanTemplateMutation(limit, offset)

  return (
    <div className={ styles.root }>
      <TemplateInfo
        banTemplate={ banTemplate }
        template={ template }
        user={ user }
        isLoading={ isLoading }
        offset={ offset }
        limit={ limit }/>
      <TemplatesTable
        banTemplate={banTemplate}
        onIdClick={ getSingleTemplate }
        isSingleTemplateLoading={ isLoading }
        offset={ offset }
        limit={ limit }
        updatePagination={ updatePagination }/>
    </div>
  )
}