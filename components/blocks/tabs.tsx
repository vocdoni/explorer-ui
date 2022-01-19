import styled from 'styled-components'
import { Button } from '@components/elements/button'
import { useState, ReactElement, ReactNode } from 'react'

interface TabButtonProps {
  activeTab: string
  label: string
  onClick: () => void
}

export const TabButton = ({ activeTab, label, onClick }: TabButtonProps) => {
  return (
    <Button onClick={() => onClick()} small positive>
      {label}
    </Button>
  )
}

interface TabProps {
  label: string
  children: ReactElement
}

export const Tab = ({ children }: TabProps) => {
  return children
}

interface TabsProps {
  children: ReactElement<TabProps>[]
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState('')

  return (
    <>
      <DivWithMarginChildren>
        {children?.map?.((tab: ReactElement<TabProps>, index: number) => (
          <span key={index}>
            <TabButton
              label={tab.props.label}
              activeTab={activeTab}
              onClick={() => setActiveTab(tab.props.label)}
            ></TabButton>
          </span>
        ))}
      </DivWithMarginChildren>
      <ContentDiv>
      {children?.map?.((tab: ReactElement<TabProps>, index: number) => {
        if (tab.props.label !== activeTab) return undefined
        return tab.props.children
      })}
      </ContentDiv>
    </>
  )
}

const DivWithMarginChildren = styled.div`
  & > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
`

const ContentDiv = styled.div`
  & > * {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`