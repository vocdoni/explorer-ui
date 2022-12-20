import { Card } from '@components/elements/cards'
import {
  BlockLink,
  EnvelopeLink,
  TransactionLink,
} from '@components/pages/app/components/get-links'
import { useTranslation } from 'react-i18next'
import React, { ReactNode } from 'react'
import { IconContext } from 'react-icons'
import { BiEnvelope } from 'react-icons/bi'
import styled from 'styled-components'
import { SkeletonOnlyBones } from '@components/blocks/skeleton'
import { EnvelopeMeta } from '@lib/types'


export const renderCardSkeleton = (skeletonItems) => {
    return (
      <>
        {Array(skeletonItems)
          .fill(0)
          .map((value, index: number) => (
            <EnvelopeCardSkeleton key={index}>
              <SkeletonOnlyBones />
            </EnvelopeCardSkeleton>
          ))}
      </>
    )
  }

  const EnvelopeCardSkeleton = ({ children }: { children: ReactNode }) => (
    <Card md={6} lg={3} xl={3}>
      {children}
    </Card>
  )

  export const EnvelopeCard = ({
    envelope,
    idx,
  }: {
    envelope: EnvelopeMeta
    idx: number
  }) => {
    const { i18n } = useTranslation()

    return (
      <EnvelopeCardSkeleton>
        <TopDiv>
          <strong>
            {i18n.t('processes.envelope_explorer.envelope_n', {
              number: idx, // Is not showing tx index, instead show index of map itself
            })}
          </strong>
          <RightIcon>
            <IconContext.Provider
              value={{
                color: 'gray',
                size: '1.5em',
                style: { paddingLeft: '10px', cursor: 'pointer' },
              }}
            >
              <div>
                <BiEnvelope />
              </div>
            </IconContext.Provider>
          </RightIcon>
        </TopDiv>
        <p>
          <BlockLink blockHeight={envelope.height}>
            {i18n.t('processes.envelope_explorer.block', {
              block: envelope.height || 0,
            })}
          </BlockLink>
        </p>
        <p>
          <TransactionLink
            blockHeight={envelope.height.toString()}
            index={envelope.txIndex.toString()}
          >
            {i18n.t('processes.envelope_explorer.tx_number', {
              txNumber: envelope.txIndex || 0,
            })}
          </TransactionLink>
        </p>
        <p>
          <EnvelopeLink nullifier={envelope.nullifier}>
            {i18n.t('processes.envelope_explorer.details')}
          </EnvelopeLink>
        </p>
      </EnvelopeCardSkeleton>
    )
  }

  const TopDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
  `
  const RightIcon = styled.div`
    line-height: 20px;
  `
