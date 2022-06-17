
import { If, Then, Else } from "react-if"
import { VoteStatus } from "@lib/util"
import { Row, Col } from "@components/elements-v2"
import { TotalVotesCard } from "@components/blocks/total-votes-card"
import { useProcessWrapper } from "@hooks/use-process-wrapper"
import { Question } from "@lib/types"
import { useUrlHash } from "use-url-hash"
import { NoResultsCard } from "@components/blocks/NoResultsCard"
import { useTranslation } from "react-i18next"
import { QuestionResults } from "@components/blocks/question-results"
import { SingleChoiceQuestionResults } from "dvote-js"

export const ResultsCard = () => {
  const processId = useUrlHash().slice(1) // Skip "/"
  const { status, liveResults, votesWeight, questions, results } = useProcessWrapper(processId)
  const { i18n } = useTranslation()
  if (!questions) {
    return null
  }

  console.debug("status:", status, "liveResults:", liveResults)
  console.debug( "votesWeight:", votesWeight, "results:", results)
  console.debug("questions:", questions,)
  
  return (
    <If condition={(status === VoteStatus.Ended || liveResults) && votesWeight && votesWeight.gt(0) && questions.length > 0}>
      <Then>
        <Row gutter='2xl'>
          <Col xs={12}>
            <TotalVotesCard />
          </Col>
          <Col xs={12}>
            <Row gutter="md">
              {results?.questions.map(
                (results: SingleChoiceQuestionResults, index: number) =>
                  <Col xs={12} key={index}>
                    <QuestionResults
                      question={questions[index]}
                      results={results}
                      index={index}
                      key={index}
                    />
                  </Col>
              )}
            </Row>
          </Col>
        </Row>
       </Then>
       <Else>
         <NoResultsCard
           title={i18n.t('vote.no_results_title')}
           subtitle={liveResults ? i18n.t('vote.no_results_subtitle_live') : i18n.t('vote.no_results_subtitle_end')}
         />
       </Else>
     </If>
  )
}
