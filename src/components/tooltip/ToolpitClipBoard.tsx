import React from 'react';
import { Tooltip, message } from 'antd';
import styles from './styles.module.css'
import clsx from 'clsx';

interface Props {
  title: number | string
  withCustomWidth?: boolean
}

export const TooltipClipBoard: React.FC<Props> = ({title,withCustomWidth}) => {

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
          className={clsx(styles.root,{[styles.customWidth]:withCustomWidth})}
        >
          {title}
        </span>
  </Tooltip>
}