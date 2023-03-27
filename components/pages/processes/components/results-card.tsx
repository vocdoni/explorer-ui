import { If, Then, Else } from 'react-if';
import { Row, Col } from '@components/elements-v2';
import { NoResultsCard } from '@components/blocks/NoResultsCard';
import { useTranslation } from 'react-i18next';
import { QuestionResults } from '@components/blocks/question-results';
import useExtendedElection from '@hooks/use-extended-election';

export const ResultsCard = () => {
  const { election, results } = useExtendedElection();
  const questions = election.questions;

  const { i18n } = useTranslation();
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
        <NoResultsCard title={i18n.t('vote.no_results_title')} subtitle={i18n.t('vote.no_questions_yet')} />
      </Else>
    </If>
  );
};
