import { Table } from 'antd';
import {
  ITemplate, useBanTemplateMutation,
  useDeleteTemplateMutation,
  useTemplateListQuery, useTemplateQuery, useUserBanMutation,
} from '../../../transport';
import { useMemo, useState } from 'react';
import { Empty } from '../../empty';
import { ConfirmationModal } from '../../confirmation-modal';
import styles from './styles.module.css'
import { AdditionalTemplateInfo } from './components';
import { usePagination } from '../../../hooks';

const handleAction = async (actionFn: (id: number) => Promise<void>, selectedRowKeys: Array<number | string>) => {
  for (const templateId of selectedRowKeys) {
    try {
      await actionFn(Number(templateId));
    } catch (error) {
    }
  }
};


export const TemplatesTable = () => {
  const { limit, offset, updatePagination } = usePagination(20);

  const { data = [] } = useTemplateListQuery(limit, offset)
  const { deleteTemplate, isPending: isDeletingTemplate } = useDeleteTemplateMutation(limit, offset)
  const { banTemplate, isPending: isBanningTemplate } = useBanTemplateMutation(limit, offset)
  const { getExtendedTemplateInfo, isLoading, templateInfo } = useTemplateQuery()
  const { banUser, isPending: isBannigUser } = useUserBanMutation()

  const [ selectedRowKeys, setSelectedRowKeys ] = useState<any>([]);

  const isRequestsRunning = isLoading || isBanningTemplate || isDeletingTemplate || isBannigUser

  const onDeleteHandlerBulk = async () => {
    await handleAction(deleteTemplate, selectedRowKeys);
    setSelectedRowKeys([])
  };

  const onBanHandlerBulk = async () => {
    await handleAction(banTemplate, selectedRowKeys);
    setSelectedRowKeys([])
  };

  const onDeleteHandlerSingle = async (templateId: string) => {
    await deleteTemplate(templateId)
  }

  const onBanHandlerSingle = async (templateId: number) => {
    await banTemplate(templateId)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

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
      render: (url: ITemplate['url']) => {
        const date = Date.now()
        return <img src={ url + `?time=${ date }` } alt="template_url" className={ styles.img }/>
      }
    },
    {
      title: 'Additional',
      key: 'additional',
      render: (record: ITemplate) => (
        <AdditionalTemplateInfo
          record={ record }
          getTemplateInfo={ getExtendedTemplateInfo }
          loading={ isRequestsRunning }
          banUser={ banUser }
        />)
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      align: 'center' as const,
      render: (record: ITemplate) => <div className={ styles.actions }>
        <ConfirmationModal
          onClick={ () => onDeleteHandlerSingle(record.templateId) }
          isLoading={ isRequestsRunning }/>
        <ConfirmationModal
          onClick={ () => onBanHandlerSingle(Number(record.templateId)) }
          mainButtonTitle={ 'Забанить' }
          confirmationText={ 'Забанить темплейт и создателя?' }
          modalTitle={ 'Подтверждение бана темплейта' }
          isLoading={ isRequestsRunning }/>
      </div>
    },
  ], [])


  const extendedDataSource = data.map(template => {
    if (templateInfo.id === Number(template.templateId)) {
      return {
        ...template,
        extended: templateInfo
      }
    }
    return template
  })

  return <div>
    <h2>Templates
      <ConfirmationModal
        onClick={ onDeleteHandlerBulk }
        isLoading={ isRequestsRunning }
        confirmationText={ 'Удалить темплейты?' }
        modalTitle={ 'Подтверждение удаления темплейтов' }
        disabled={ !selectedRowKeys.length }
      />
      <ConfirmationModal
        onClick={ onBanHandlerBulk }
        mainButtonTitle={ 'Забанить' }
        confirmationText={ 'Забанить темплейты и создателей?' }
        modalTitle={ 'Подтверждение бана темплейтов' }
        isLoading={ isRequestsRunning }
        disabled={ !selectedRowKeys.length }
      />
    </h2>
    <Table dataSource={ extendedDataSource } columns={ columns } rowKey={ 'templateId' }
           locale={ {
             emptyText: <Empty/>
           } }
           rowSelection={ rowSelection }
           pagination={ {
             current: Math.floor(offset / limit) + 1,
             pageSize: limit,
             total: 10000,
             showSizeChanger: true,
             pageSizeOptions: [ '20', '50', '100', '500' ],
           } }
           onChange={ (pagination) => {
             updatePagination(pagination.current ?? 0, pagination.pageSize ?? 0)
           } }
    />
  </div>
}