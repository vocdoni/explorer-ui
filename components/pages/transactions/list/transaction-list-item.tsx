import { TransactionCard } from '@components/blocks/card/transaction-card'
import { TxById } from '@lib/types'
import React from 'react'
import styled from 'styled-components'

interface IDashboardTransactionItemProps {
  transactionData: TxById
}

export const DashboardTransactionItem = ({
  transactionData,
}: IDashboardTransactionItemProps) => {
  return (
    <TransactionCard transactionData={transactionData} />
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
