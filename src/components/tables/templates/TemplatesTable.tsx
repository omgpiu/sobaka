import { Button, message, Table } from 'antd';
import { TooltipClipBoard } from '../../tooltip';
import {
  ITemplate,
  useTemplateListQuery,
  useTemplateQuery,
} from '../../../transport';
import { useMemo } from 'react';
import { Empty } from '../../empty';


export const TemplatesTable = () => {
  // const { deleteTemplate, isError, isSuccess, isPending } = useDeleteTemplateMutation()
  const { data, offset, limit, updatePagination } = useTemplateListQuery()
  const { getSingleTemplate, data: template } = useTemplateQuery()

  console.log('template', template)
  console.log(getSingleTemplate, 'data')

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

  const columns = useMemo(() => [
    {
      title: 'Template Id',
      dataIndex: 'templateId',
      key: 'templateId',
      render: (id: ITemplate['templateId']) => <TooltipClipBoard title={ id } withCustomWidth/>,
      sorter: (a: ITemplate, b: ITemplate) => Number(a.templateId) - Number(b.templateId),
    },
    {
      title: 'Subscribers',
      dataIndex: 'subscribers',
      key: 'subscribers',
      sorter: (a: ITemplate, b: ITemplate) => Number(a.subscribers) - Number(b.subscribers),
    },
    {
      title: 'Template',
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
          // loading={ isPending }
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