import { Else, If, Then } from 'react-if';
import { Col, Row } from '@components/elements-v2';
import { NoResultsCard } from '@components/blocks/NoResultsCard';
import { useTranslation } from 'next-i18next';
import { QuestionResults } from '@components/blocks/question-results';
import useExtendedElection from '@hooks/use-extended-election';

export const ResultsCard = () => {
  const { election, results } = useExtendedElection();
  const questions = election.questions;

  const { t } = useTranslation();
  if (!questions) {
    return null;
  }

  return (
    <If condition={questions.length > 0}>
      <Then>
        <Row gutter="2xl">
          <Col xs={12}>
            <Row gutter="md">
              {questions.map((question, index: number) => (
                <Col xs={12} key={index}>
                  <QuestionResults
                    question={question}
                    results={results ? results[index] : []}
                    index={index}
                    key={index}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Then>
      <Else>
        <NoResultsCard title={t('vote.no_results_title')} subtitle={t('vote.no_questions_yet')} />
      </Else>
    </If>
  );
};
