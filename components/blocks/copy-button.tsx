import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { useTranslation } from 'next-i18next';
import { IoCopy } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import styled from 'styled-components';

export const CopyButton = ({
  toCopy,
  text,
  size,
  style,
  color = 'inherit',
  copyMessage,
}: {
  toCopy: string;
  text: string;
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  copyMessage?: string;
}) => {
  const { t } = useTranslation();
  const { setCopiedMessage, message } = useCopiedMessage();
  const handleCopy = (e) => {
    e.cancelBubble = true;
    e.stopPropagation();
    e.preventDefault();
    e.target.focus();
    copy(toCopy);
    setCopiedMessage(copyMessage ?? t('copy.copied_to_the_clipboard'));
  };

  return (
    <>
      <div onClick={handleCopy} style={{ width: 'fit-content' }}>
        <IconContext.Provider
          value={{
            color: color,
            size: size ?? '1em',
            style: style ?? { paddingLeft: '10px', cursor: 'pointer' },
          }}
        >
          <TextAndIcon color={color}>
            {text}
            <AlertWrapper>
              <IoCopy />
              <CopiedAlert message={message} />
            </AlertWrapper>
          </TextAndIcon>
        </IconContext.Provider>
      </div>
    </>
  );
};

export const ReducedTextAndCopy = ({
  text,
  toCopy,
  copyMessage,
}: {
  text: string;
  toCopy: string;
  copyMessage?: string;
}) => {
  const entityTxt =
    text.length < 13 ? text : text.substring(0, 5) + '...' + text.substring(text.length - 4, text.length);
  return <CopyButton toCopy={toCopy} text={entityTxt} copyMessage={copyMessage} />;
};

function useCopiedMessage() {
  const [message, setMessage] = useState('');
  const [timeout, setTimeoutTracker] = useState(null);

  const setCopiedMessage = (msg: string, seconds = 4) => {
    if (timeout) clearTimeout(timeout);

    setMessage(msg);
    const newTo = setTimeout(() => {
      clearAlert();
      setTimeoutTracker(null);
    }, 1000 * seconds);
    setTimeoutTracker(newTo);
  };
  const clearAlert = () => setMessage('');

  return { message, setCopiedMessage, clearAlert };
}

const CopiedAlert = ({ message }: { message: string }) => {
  return (
    <AlertContainer visible={!!message?.length}>
      <TextContainer>{message || 'The link has been copiet to the clipboard'}</TextContainer>
    </AlertContainer>
  );
};

const TextAndIcon = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${({ color }) => color};
`;

const AlertWrapper = styled.div`
  position: relative;
`;

const AlertContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  top: -45px;
  right: 25px;
  z-index: 5010;
  font-size: 12px;
  background-color: ${({ theme }) => theme.lightBg};
  border: 1px solid ${({ theme }) => theme.lightBorder};
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  box-shadow: 0px 6px 6px rgba(180, 193, 228, 0.35);
  transition: opacity 0.1s ease-out;
  width: max-content;
`;

const TextContainer = styled.p`
  margin: 0;
  max-width: 100%;
`;
