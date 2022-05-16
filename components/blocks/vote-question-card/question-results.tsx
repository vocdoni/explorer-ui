import React from 'react'
import styled from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import { SingleChoiceQuestionResults } from 'dvote-js'

import { useTranslation } from 'react-i18next'
import { colors } from 'theme/colors'

import { Choice, Question } from '@lib/types'

import { FlexContainer } from '@components/elements/flex'
import { SectionText } from '@components/elements/text'
import { BigNumber } from 'ethers'


interface IQuestionResultsProps {
  question: Question
  result: SingleChoiceQuestionResults
  resultsWeight: BigNumber
}
export const QuestionResults = ({
  question,
  result,
  resultsWeight,
}: IQuestionResultsProps) => {
  const { i18n } = useTranslation()

  const getOptionResult = (index: number) =>
    result?.voteResults[index].votes

  const getOptionPercentage = (index: number) => {
    if (!resultsWeight || resultsWeight.isZero()) return 0

    return getOptionResult(index).mul(10000).div(resultsWeight).toNumber() / 100
  }

  return (
    <>
      {question.choices.map((choice: Choice, index: number) => (
        <FlexContainer key={index}>
          <ProgressBarContainer>
            <CircularProgressbar
              styles={buildGraphStyle(getOptionPercentage(index))}
              value={getOptionPercentage(index)}
              text={`${getOptionPercentage(index).toFixed(1)}%`}
            />
          </ProgressBarContainer>
          <div>
            <DescriptionContainer>{choice.title.default}</DescriptionContainer>
            <SectionText color={colors.lightText}>
              {i18n.t('components.question_results.number_votes', {
                number: getOptionResult(index).toString(),
              })}
            </SectionText>
          </div>
        </FlexContainer>
      ))}
    </>
  )
}

const buildGraphStyle = (percent: number) => {
  const mainColor = percent < 50 ? '#FC8B23' : colors.accent1
  return {
    text: {
      fill: mainColor,
      fontSize: '26px',
    },
    path: {
      stroke: mainColor,
    },
  }
}

const ProgressBarContainer = styled.div`
  width: 60px;
  min-width: 60px;
  margin-right: 12px;

  & > svg > text {
    font-size: 24px !important;
    text-anchor: middle;
    dominant-baseline: central;
  }
`

const DescriptionContainer = styled(SectionText)`
  font-size: 24px;
`
