import { Card } from '@components/elements/cards';
import { OverflowScroll } from '@components/elements/styled-divs';
import { Button } from '@components/elements/button';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface IRawContentProps {
  content: unknown;
  title?: string;
}

export const RawContent = ({ content, title }: IRawContentProps) => {
  return (
    <Card>
      {title && <h3> {title}</h3>}
      <OverflowScroll>{JSON.stringify(content, null, 2)}</OverflowScroll>
    </Card>
  );
};

export const RawContentBtnLabel = () => {
  const { t } = useTranslation();
  return <>{t('components.raw_content.label')}</>;
};

export const RawContentBtn = (props: IRawContentProps) => {
  const [showRaw, setShowRaw] = useState(false);
  return (
    <>
      <Button small positive onClick={() => setShowRaw(!showRaw)}>
        <RawContentBtnLabel />
      </Button>
      {showRaw && <RawContent {...props} />}
    </>
  );
};
