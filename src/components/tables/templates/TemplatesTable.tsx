import { Button, message, Table } from 'antd';
import {
  ITemplate,
  useTemplateListQuery,
} from '../../../transport';
import { FC, useMemo } from 'react';
import { Empty } from '../../empty';

interface IProps {
  onIdClick: (templateId: string) => void;
  isSingleTemplateLoading: boolean
}

export const TemplatesTable: FC<IProps> = ({ onIdClick, isSingleTemplateLoading }) => {
  // const { deleteTemplate, isError, isSuccess, isPending } = useDeleteTemplateMutation()
  const { data, offset, limit, updatePagination } = useTemplateListQuery()


  const onCLickHandler = async (templateId: string) => {
    // await deleteTemplate(templateId)
    // if (isSuccess) {
    //   message.success('Refund transaction success: ' + templateId);
    // }
    // if (isError) {
    //   message.error('Refund transaction failed: ' + templateId);
    // }
    message.success('Будет удалять ' + templateId);

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
        return  isSingleTemplateLoading
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
      render: (url: ITemplate['url']) => <img src={ url } alt="template_url" style={ { width: 50, height: 50 } }/>
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      align: 'center' as const,
      render: (record: ITemplate) =>
        <Button
          onClick={ async () => {
            await onCLickHandler(record.templateId)
          } }
          loading={ isSingleTemplateLoading }
        >
          Delete
        </Button>
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