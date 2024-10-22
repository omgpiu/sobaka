import { Table } from 'antd';
import {
  ITablePagination,
  ITemplate,
  useDeleteTemplateMutation,
  useTemplateListQuery,
} from '../../../transport';
import { FC, useMemo, useState } from 'react';
import { Empty } from '../../empty';
import { ConfirmationModal } from '../../confirmation-modal';
import styles from './styles.module.css'

type Props = Omit<ITablePagination<[]>, 'dataSource'> & {
  onIdClick: (templateId: string) => void;
  isSingleTemplateLoading: boolean
  banTemplate: (id: number) => Promise<void>
}

const handleAction = async (actionFn: (id: number) => Promise<void>, selectedRowKeys: Array<number | string>) => {
  for (const templateId of selectedRowKeys) {
    try {
      await actionFn(Number(templateId));
    } catch (error) {
    }
  }
};


export const TemplatesTable: FC<Props> = ({
  onIdClick,
  isSingleTemplateLoading,
  offset,
  limit,
  updatePagination,
  banTemplate
}) => {
  const { data } = useTemplateListQuery(limit, offset)
  const { deleteTemplate } = useDeleteTemplateMutation(limit, offset)
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<any>([]);

  const onDeleteHandlerBulk = async () => {
    await handleAction(deleteTemplate, selectedRowKeys);
    setSelectedRowKeys([])
  };

  const onBanHandlerBulk = async () => {
    await handleAction(banTemplate, selectedRowKeys);
    setSelectedRowKeys([])
  };

  const handleClicked = (templateId: string) => () => {
    onIdClick(templateId)
  }

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

    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log('Selected all rows:', selectedRows, selected, changeRows);
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
      render: (record: ITemplate) => <div className={ styles.actions }>
        <ConfirmationModal
          onClick={ () => onDeleteHandlerSingle(record.templateId) }
          isLoading={ isSingleTemplateLoading }/>
        <ConfirmationModal
          onClick={ () => onBanHandlerSingle(Number(record.templateId)) }
          mainButtonTitle={ 'Забанить' }
          confirmationText={ 'Забанить темплейт и создателя?' }
          modalTitle={ 'Подтверждение бана темплейта' }
          isLoading={ isSingleTemplateLoading }/>
      </div>
    },
  ], [])


  return <div>
    <h2>Templates
      <ConfirmationModal
        onClick={ onDeleteHandlerBulk }
        isLoading={ isSingleTemplateLoading }
        confirmationText={ 'Удалить темплейты?' }
        modalTitle={ 'Подтверждение удаления темплейтов' }
        disabled={!selectedRowKeys.length}
      />
      <ConfirmationModal
        onClick={ onBanHandlerBulk }
        mainButtonTitle={ 'Забанить' }
        confirmationText={ 'Забанить темплейты и создателей?' }
        modalTitle={ 'Подтверждение бана темплейтов' }
        isLoading={ isSingleTemplateLoading }
        disabled={!selectedRowKeys.length}
      />
    </h2>
    <Table dataSource={ data ?? [] } columns={ columns } rowKey={ 'templateId' }
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