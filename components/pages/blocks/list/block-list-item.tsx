import { BlockCard } from '@components/blocks/card/block-card';
import { BlockInfo } from '@lib/types';
import React from 'react';

interface IDashboardBlockItemProps {
  blockData: BlockInfo;
}

export const DashboardBlockItem = ({ blockData }: IDashboardBlockItemProps) => {
  return <BlockCard blockData={blockData} />;
};
