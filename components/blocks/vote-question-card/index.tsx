import React from 'react'
import i18n from '@i18n'
import styled from 'styled-components'
import { SingleChoiceQuestionResults, VochainProcessStatus } from 'dvote-js'
import { colors } from 'theme/colors'
import { Question } from '@lib/types'
import { Card } from '@components/elements/cards'
import { SectionText, SectionTitle, TextSize } from '@components/elements/text'
import { Column, Grid } from '@components/elements/grid'
import {
  FlexContainer,
  FlexDirection,
  FlexJustifyContent,
} from '@components/elements/flex'

import { QuestionResults } from './question-results'
import { QuestionNoResultsAvailable } from './question-no-results-available'
import { Else, If, Then } from 'react-if'
import { BigNumber } from 'ethers'

type IVoteQuestionCardProps = {
  question: Question
  questionIdx: number
  resultsWeight: BigNumber
  result?: SingleChoiceQuestionResults
}

export const VoteQuestionCard = ({
  question,
  questionIdx,
  resultsWeight,
  result,
}: IVoteQuestionCardProps) => {

  return (
    <Grid>
      <Card>
        <QuestionContainer>
          <Grid>
            <Column md={8} sm={12}>
              <SectionText>
                {i18n.t('vote_question_card.question', { number: questionIdx + 1 })}
              </SectionText>

              <SectionText size={TextSize.Big}>
                {question.title.default}
              </SectionText>

              <DescriptionText color={colors.lightText}>
                {question.description.default}
              </DescriptionText>
            </Column>

            <Column md={4} sm={12}>
              <FlexContainer
                height="100%"
                direction={FlexDirection.Column}
                justify={FlexJustifyContent.Center}
              >
                <If condition={result && !!result.voteResults}>
                  <Then>
                    <QuestionResults
                      question={question}
                      result={result}
                      resultsWeight={resultsWeight}
                    />
                  </Then>
                  <Else>
                    <QuestionNoResultsAvailable question={question} />
                    <NoResultsAvailableText>
                      {i18n.t('vote_question_card.no_results_available')}
                    </NoResultsAvailableText>
                  </Else>
                </If>
              </FlexContainer>
            </Column>
          </Grid>
        </QuestionContainer>
      </Card>
    </Grid>
  )
}

const DescriptionText = styled(SectionText)`
  white-space: pre-wrap;
`

const QuestionContainer = styled.div`
  padding: 12px 20px;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    padding: 6px 8px;
  }
`

const QuestionTitle = styled(SectionTitle)`
  font-size: 33px;
  margin-bottom: 10px;
`

const NoResultsAvailableText = styled(SectionText)`
  padding-top: 12px;
`
