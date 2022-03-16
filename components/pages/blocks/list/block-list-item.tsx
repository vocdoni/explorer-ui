import { BlockCard } from '@components/blocks/card/block-card'
import { StatusCard } from '@components/elements/cards'
import { BlockInfo } from '@lib/types'
import React from 'react'
import styled from 'styled-components'

interface IDashboardBlockItemProps {
  blockData: BlockInfo
}

export const DashboardBlockItem = ({
  blockData,
}: IDashboardBlockItemProps) => {
  return (
    <BlockCard blockData={blockData} />
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
