import { Col, Row } from '@components/elements-v2/grid';
import { Spacer } from '@components/elements-v2/spacer';
import { Text } from '@components/elements-v2/text';
import { theme } from '@theme/global';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useIsMobile } from '@hooks/use-window-size';
import { BigNumber } from 'ethers';
import { colorsV2 } from '@theme/colors-v2';
import { BreakWord } from '@components/elements/styled-divs';
import { Progress } from '@chakra-ui/react';
import { ProgressProps } from '@chakra-ui/progress/dist/progress';
import useExtendedElection from '@hooks/use-extended-election';
import { ElectionStatus, IChoice, IQuestion, formatUnits } from '@vocdoni/sdk';

export type QuestionsResultsProps = {
  question: IQuestion;
  results: Array<BigNumber>;
  index: number;
};
type StyledProgressBarProps = ProgressProps & { disabled: boolean };
type StyledCardProps = {
  isMobile: boolean;
};

type ChoiceResult = {
  title: IChoice['title'];
  votes: BigNumber;
};

export const QuestionResults = (props: QuestionsResultsProps) => {
  const { i18n } = useTranslation();
  // const [sortedChoices, setSortedChoices] = useState<ChoiceResult[]>([]);
  // const [hasWinner, setHasWinner] = useState<boolean>(false);
  const isMobile = useIsMobile();
  // const [showResults, setSetShowResults] = useState(false);

  const { votesWeight, liveResults, election } = useExtendedElection();
  const status = election.status;

  let sortedChoices: ChoiceResult[];
  if (!props.results.length) {
    // If not results yet, show the questions without results
    sortedChoices = props.question.choices.map((a) => {
      return {
        title: a.title,
        votes: undefined,
      };
    });
  } else {
    // sort all the responses by number of votes higher to lower
    sortedChoices = props.question.choices
      .map((a, i) => {
        return {
          title: a.title,
          votes: props.results[i],
        };
      })
      .sort((a, b) => {
        const diff = b.votes.sub(a.votes);
        if (b.votes.eq(a.votes)) return 0;
        else if (diff.lt(0)) return -1;
        return 1;
      });
  }

  let hasWinner = false;
  // Check if is one response that is winning
  if (props.results.length > 0 && sortedChoices.length > 1) {
    hasWinner = !sortedChoices[0]?.votes.eq(sortedChoices[1]?.votes);
  }

  const showResults =
    (status === ElectionStatus.ENDED || status === ElectionStatus.RESULTS || liveResults) &&
    props.results !== undefined;

  const decimals = (election.meta as any)?.token?.decimals || 0;
  return (
    <Card isMobile={isMobile}>
      {/* TITLE */}
      <Row gutter="none">
        <Col xs={12}>
          <Row gutter="xs">
            <Col xs={12}>
              <Text size="md" color="primary" weight="bold">
                {i18n.t('vote.results_question', { index: props.index + 1 })}
              </Text>
            </Col>
            <Col xs={12}>
              <Text size="2xl" color="dark-blue" weight="bold">
                {props.question.title?.default}
              </Text>
            </Col>
            {props.question.description && (
              <Col xs={12}>
                <Text size="sm" color="dark-gray" weight="regular">
                  {props.question.description?.default}
                </Text>
              </Col>
            )}
          </Row>
        </Col>
        {/* SPACING */}
        <Col xs={12}>
          <Spacer direction="vertical" size={isMobile ? 'lg' : 'xl'} />
        </Col>
        <Col xs={12}>
          <Spacer direction="vertical" size={isMobile ? 'lg' : 'xl'} />
        </Col>
        {/* QUESTIONS */}
        <Col xs={12}>
          <Row gutter="lg">
            {sortedChoices.map((choice: ChoiceResult, index: number) => (
              <Col xs={12} key={index}>
                <Row gutter={isMobile ? 'xs' : 'lg'} align="center">
                  <Col xs={10} md={4}>
                    <Text size="lg" weight={index === 0 && hasWinner ? 'bold' : 'regular'} color="dark-blue">
                      {choice.title?.default}
                    </Text>
                  </Col>
                  {/* SHOW RESULTS */}
                  {showResults ? (
                    <>
                      <Col hiddenSmAndDown md={2}>
                        <Text size="lg" weight="bold" color="dark-blue">
                          {getStringPercent(getPercent(choice.votes, votesWeight))}%
                        </Text>
                        <Text size="sm" color="dark-gray" weight="regular">
                          <BreakWord>
                            {i18n.t('vote.vote_count', {
                              count: getResults(choice.votes, decimals).toString() as never,
                            })}
                          </BreakWord>
                        </Text>
                      </Col>
                      <Col xs={12} md={6}>
                        <StyledProgressBar
                          value={getBarPercent(choice.votes, votesWeight)}
                          size={isMobile ? 'sm' : 'md'}
                          style={{ background: colorsV2.neutral[100] }}
                          disabled={choice.votes.eq(0)}
                        />
                      </Col>
                      <Col xs={12} hiddenSmAndUp>
                        <Row align="end" gutter="md">
                          <Col>
                            <Text size="lg" weight="bold" color="dark-blue">
                              {getStringPercent(getPercent(choice.votes, votesWeight))}%
                            </Text>
                          </Col>
                          <Col>
                            <Text size="sm" color="dark-gray" weight="regular">
                              <BreakWord>
                                {i18n.t('vote.vote_count', {
                                  count: getResults(choice.votes, decimals).toString() as never,
                                })}
                              </BreakWord>
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  ) : (
                    // NO RESULTS YET
                    <Col xs={12} md={6} justify="end">
                      <Text size={isMobile ? 'sm' : 'xl'} color="dark-gray" align="right">
                        {status !== ElectionStatus.ENDED && !liveResults
                          ? i18n.t('vote.no_results_live')
                          : i18n.t('vote.loading_results')}
                      </Text>
                    </Col>
                  )}
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};
const getResults = (result: BigNumber, decimals?: number) =>
  decimals ? parseInt(formatUnits(result, decimals), 10) : result;
const getBarPercent = (votes: BigNumber, totalVotes: BigNumber): number => {
  if (votes.eq(0)) {
    return 1.5;
  }
  return getPercent(votes, totalVotes);
};
const getPercent = (votes: BigNumber, resultsWeight: BigNumber): number => {
  if (!resultsWeight || resultsWeight.isZero()) return 0;

  // used to avoid losing decimal precision
  const ratio = votes.mul(10000);
  return ratio.div(resultsWeight).div(100).toNumber();
};
const getStringPercent = (percent: number): string => {
  const decimal = percent % 1;
  if (decimal == 0) {
    return percent.toFixed(0);
  }
  return percent.toFixed(2);
};
const getBarColor = (props: StyledProgressBarProps) => {
  if (props.disabled) {
    return '#52606D';
  }
  return theme.accent1;
};
const getPadding = (props: StyledCardProps) => {
  if (props.isMobile) {
    return '24px 24px 32px';
  }
  return '40px';
};
const cosmeticProps = ['isMobile'];
const styledConfig = {
  shouldForwardProp: (prop) => !cosmeticProps.includes(prop),
};
const Card = styled.div.withConfig(styledConfig)<StyledCardProps>`
  border-radius: 16px;
  background: ${theme.background};
  padding: ${getPadding};
`;
const StyledProgressBar = styled(Progress)<StyledProgressBarProps>`
  background: #e4e7eb;
  & > span {
    background: ${getBarColor};
  }
`;
