import { Table } from 'antd';
import {
  ITablePagination,
  ITemplate,
  useDeleteTemplateMutation,
  useTemplateListQuery,
} from '../../../transport';
import { FC, useMemo } from 'react';
import { Empty } from '../../empty';
import { ConfirmationModal } from '../../confirmation-modal';
import styles from './styles.module.css'

type Props = Omit<ITablePagination<[]>, 'dataSource'> & {
  onIdClick: (templateId: string) => void;
  isSingleTemplateLoading: boolean
}

export const TemplatesTable: FC<Props> = ({ onIdClick, isSingleTemplateLoading, offset, limit, updatePagination }) => {
  const { data } = useTemplateListQuery(limit, offset)
  const { deleteTemplate } = useDeleteTemplateMutation(limit, offset)

  const onCLickHandler = async (templateId: string) => {
    await deleteTemplate(templateId)
  }

  const handleClicked = (templateId: string) => () => {
    onIdClick(templateId)
  }


  const columns = useMemo(() => [
    {
      title: <div>
        <div>Template Id</div>
        <div>Click to get template</div>
      </div>,
      dataIndex: 'templateId',
      key: 'templateId',
      sorter: (a: ITemplate, b: ITemplate) => Number(a.templateId) - Number(b.templateId),
      width: 150,
      onCell: (record: ITemplate) => {
        return isSingleTemplateLoading
          ? {
            style: { cursor: 'not-allowed', opacity: 0.5 },
          }
          : {
            onClick: handleClicked(record.templateId),
            style: { cursor: 'pointer' },
          };
      },

    },
    {
      title: 'Subscribers',
      dataIndex: 'subscribers',
      key: 'subscribers',
      sorter: (a: ITemplate, b: ITemplate) => Number(a.subscribers) - Number(b.subscribers),
    },
    {
      title: 'Template Img',
      dataIndex: 'url',
      key: 'url',
      render: (url: ITemplate['url']) => <img src={ url } alt="template_url" className={ styles.img }/>
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      align: 'center' as const,
      render: (record: ITemplate) => <ConfirmationModal onClick={ () => onCLickHandler(record.templateId) }
                                                        isLoading={ isSingleTemplateLoading }/>
    },
  ], [])


  return <div>
    <h2>Templates</h2>
    <Table dataSource={ data ?? [] } columns={ columns } rowKey={ 'templateId' }
           locale={ {
             emptyText: <Empty/>
           } }
           pagination={ {
             current: Math.floor(offset / limit) + 1,
             pageSize: limit,
             total: 900,
             showSizeChanger: true,
             pageSizeOptions: [ '20', '50', '100' ],
           } }
           onChange={ (pagination) => {
             updatePagination(pagination.current ?? 0, pagination.pageSize ?? 0)
           } }
    />
  </div>
}