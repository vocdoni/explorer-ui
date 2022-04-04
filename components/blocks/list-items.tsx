import styled from 'styled-components'
import Link from 'next/link'
import { Column, ColumnProps } from '../elements/grid'
import { ReactNode } from 'react'
// import { SHOW_PROCESS_PATH } from "../../const/routes"
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
} from '../elements/flex'
import { VoteStatus } from '@lib/util'
import { ProcessStatusLabel } from '@components/blocks/process-status-label'
// import { MarkDownViewer } from "./mark-down-viewer"
import React from 'react'
import { EntityLink } from '@components/pages/app/components/get-links'

export const GenericListItemWithBadge = ({
  title,
  dateText,
  link,
  topLeft,
  badge,
  children,
  span,
  sm,
  md,
  lg,
  xl,
}: ColumnProps & {
  title?: string
  dateText?: string
  link?: string
  topLeft: ReactNode
  badge: ReactNode
  children?: ReactNode
}) => {
  const childrenData = () => {
    return (
      <ListItemDiv>
        <TopDiv>
          <FlexContainer
            alignItem={FlexAlignItem.Center}
            justify={FlexJustifyContent.Center}
          >
            {topLeft}
          </FlexContainer>
          {badge}
        </TopDiv>

        {title ? <VoteListItemTitle>{title}</VoteListItemTitle> : null}
        {dateText ? <VoteListItemDate>{dateText}</VoteListItemDate> : null}
        {children ? children : null}
      </ListItemDiv>
    )
  }

  return (
    <Column {...{ span, sm, md, lg, xl }}>
      {link ? (
        <Link href={link ?? ''} passHref>
          {childrenData()}
        </Link>
      ) : 
        childrenData()
      }
    </Column>
  )
}

/** Same as VoteListItem but with a browsawle entity link and other properties to
 * show for the elections list page
 */
type ProcessSummaryProps = ColumnProps & {
  icon: ReactNode
  link: string
  entityName: string
  entityId: string
  title: string
  description: string
  status: VoteStatus
  dateText: string
}

export const ProcessSummaryListItem = ({
  icon,
  entityName,
  entityId,
  link,
  title,
  description,
  status,
  dateText,
}: ProcessSummaryProps) => {
  return (
    <GenericListItemWithBadge
      title={title}
      dateText={dateText}
      link={link}
      topLeft={
        <>
          {icon}
          <EntityLink entityId={entityId}>{entityName}</EntityLink>
        </>
      }
      badge={<ProcessStatusLabel status={status}></ProcessStatusLabel>}
    ></GenericListItemWithBadge>
  )
}

// Styles

const ListItemDiv = styled.div`
  width: 100%;
  padding: 20px 20px 10px;
  background: ${(props) => props.theme.white};
  box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.35);
  border-radius: 16px;
  box-sizing: border-box;

  &:hover {
    background-color: ${(props) => props.theme.lightBg};
  }
  &:active {
    background-color: ${(props) => props.theme.lightBg2};
  }
`

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
const EntityNameDiv = styled.div``
const EntityName = styled.h5`
  display: inline-block;
  margin: 0 6px 0px;
  font-weight: normal;
  font-size: 90%;
  color: ${(props) => props.theme.text};
`

const VoteListItemTitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 6px;
  color: ${(props) => props.theme.text};
  font-weight: normal;
`
const VoteListItemDescription = styled.p`
  margin: 6px 0 6px;
  color: ${(props) => props.theme.darkLightFg};
  font-size: 85%;
`
const VoteListItemDate = styled.p`
  color: ${(props) => props.theme.lightText};
  font-size: 80%;
`
const VotingStatus = styled.div``
