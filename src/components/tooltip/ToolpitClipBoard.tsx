import React from 'react';
import { Tooltip, message } from 'antd';
import styles from './styles.module.css'

interface Props {
  title: number | string
}

export const TooltipClipBoard: React.FC<Props> = ({title}) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Copied to clipboard!');
    }).catch(() => {
      message.error('Failed to copy!');
    });
  };

  return <Tooltip title={title}>
        <span
          onClick={() => copyToClipboard(title.toString())}
          className={styles.root}
        >
          {title}
        </span>
  </Tooltip>
}