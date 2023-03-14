import { If, Then, Else } from 'react-if';
import { Row, Col } from '@components/elements-v2';
import { useProcessWrapper } from '@hooks/use-process-wrapper';
import { Question } from '@lib/types';
import { useUrlHash } from 'use-url-hash';
import { NoResultsCard } from '@components/blocks/NoResultsCard';
import { useTranslation } from 'react-i18next';
import { QuestionResults } from '@components/blocks/question-results';

export const ResultsCard = () => {
  const processId = useUrlHash().slice(1); // Skip "/"
  const { questions, results } = useProcessWrapper(processId);
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
              {questions.map((question: Question, index: number) => (
                <Col xs={12} key={index}>
                  <QuestionResults question={question} results={results?.questions[index]} index={index} key={index} />
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
