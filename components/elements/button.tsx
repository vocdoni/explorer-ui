import React, { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { hexToRgbA } from '../../lib/util';
import { theme } from '../../theme';
import { colors } from 'theme/colors';
import { FakedButton } from './styled-divs';
import { Spinner } from '@chakra-ui/react';

// Div button with a <button> inside added to be accessible throught tab navigation
export const NavButton = ({ ...props }: ButtonProps) => {
  return (
    <Button {...props}>
      <FakedButton>{props.children}</FakedButton>
    </Button>
  );
};

export enum ButtonColor {
  Positive = 'positive',
  Negative = 'negative',
}

export enum LinkTarget {
  Blank = '_blank',
  Self = '_self',
}

type ButtonProps = {
  positive?: boolean;
  negative?: boolean;
  disabled?: boolean;
  large?: boolean;
  small?: boolean;
  verticalAlign?: boolean;
  /** Draws a gray border only in default buttons */
  border?: boolean;
  wide?: boolean;
  width?: number;
  justify?: JustifyContent;
  /** Text color to use (either a HEX color or "accent1" "accent2") */
  color?: ButtonColor | string;
  borderColor?: ButtonColor | string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  target?: LinkTarget;
  spinner?: boolean;
  onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Button = ({
  disabled,
  positive,
  negative,
  color,
  href,
  onClick,
  width,
  icon,
  wide,
  border,
  borderColor,
  justify,
  verticalAlign,
  large,
  small,
  spinner,
  children,
}: ButtonProps) => {
  let component: JSX.Element;
  const getButtonText = (): ReactNode =>
    spinner ? (
      <SpinnerContainer>
        <Spinner size="xs" />
      </SpinnerContainer>
    ) : (
      children
    );

  if (disabled) {
    return (
      <DisabledButton
        wide={wide}
        large={large}
        small={small}
        width={width}
        onClick={(ev) => (onClick && !disabled ? onClick(ev) : null)}
      >
        {icon ? (
          <ButtonContent color={theme.darkLightFg} justify={justify}>
            {icon}&nbsp; {getButtonText()}
          </ButtonContent>
        ) : (
          <ButtonContent color={theme.darkLightFg} verticalAlign={verticalAlign} justify={justify}>
            {getButtonText()}
          </ButtonContent>
        )}
      </DisabledButton>
    );
  }

  if (positive) {
    component = (
      <PositiveButton
        wide={wide}
        large={large}
        small={small}
        width={width}
        onClick={(ev) => (onClick && !disabled ? onClick(ev) : null)}
      >
        {icon ? (
          <ButtonContent color={theme.white} justify={justify}>
            {icon}&nbsp;{getButtonText()}
          </ButtonContent>
        ) : (
          <ButtonContent color={theme.white} verticalAlign={verticalAlign} justify={justify}>
            {getButtonText()}
          </ButtonContent>
        )}
      </PositiveButton>
    );
  } else if (negative) {
    component = (
      <NegativeButton
        wide={wide}
        large={large}
        small={small}
        width={width}
        onClick={(ev) => (onClick && !disabled ? onClick(ev) : null)}
      >
        {icon ? (
          <ButtonContent color={theme.white} justify={justify}>
            {icon}&nbsp;{getButtonText()}
          </ButtonContent>
        ) : (
          <ButtonContent color={theme.white} verticalAlign={verticalAlign} justify={justify}>
            {getButtonText()}
          </ButtonContent>
        )}
      </NegativeButton>
    );
  } else {
    component = (
      <DefaultButton
        wide={wide}
        border={border}
        borderColor={borderColor}
        large={large}
        small={small}
        width={width}
        onClick={(ev) => (onClick && !disabled ? onClick(ev) : null)}
      >
        {icon ? (
          <ButtonContent color={color} justify={justify}>
            {icon}&nbsp;{getButtonText()}
          </ButtonContent>
        ) : (
          <ButtonContent color={color} verticalAlign={verticalAlign} justify={justify}>
            {getButtonText()}
          </ButtonContent>
        )}
      </DefaultButton>
    );
  }

  if (href) {
    return <Link href={href}>{component}</Link>;
  }
  return component;
};

export const SquareButton = ({ icon, children, width, disabled, onClick }: ButtonProps) => (
  <Button onClick={onClick} disabled={disabled} width={width} border verticalAlign>
    <SquareButtonIconContainer>{icon}</SquareButtonIconContainer>
    {children}
  </Button>
);

const BaseButton = styled.div<{
  wide?: boolean;
  large?: boolean;
  small?: boolean;
  width?: number;
  border?: boolean;
  borderColor?: ButtonColor | string;
}>`
  ${(props) => (props.wide ? '' : 'display: inline-block;')}
  ${(props) => (props.width != undefined ? 'width: ' + props.width + 'px;' : '')}
${(props) => (props.large ? 'padding: 13px 25px;' : props.small ? 'padding: 8px 15px;' : 'padding: 11px 20px;')}

${(props) => (props.large ? 'font-size: 125%;' : props.small ? 'font-size: 85%;' : '')}

    background: ${(props) => props.theme.lightBg};
  box-shadow: 0px 6px 6px rgba(180, 193, 228, 0.35);
  border-radius: 8px;
  white-space: nowrap;
  user-select: none;
  box-sizing: border-box;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    white-space: normal;
  }
`;

const DisabledButton = styled(BaseButton)`
  cursor: no-drop;
`;

export const DefaultButton = styled(BaseButton)`
  cursor: pointer;
  ${({ border, borderColor, theme }) =>
    border ? 'border: 2px solid ' + (borderColor ? borderColor : theme.lightBorder) + ';' : ''}
  background: ${(props) => props.theme.white};

  // Compensate 2px border (if applicable)
  ${({ large, small, border }) =>
    large
      ? border
        ? 'padding: 11px 23px;'
        : 'padding: 13px 25px;'
      : small
      ? border
        ? 'padding: 6px 13px;'
        : 'padding: 8px 15px;'
      : border
      ? 'padding: 9px 18px;'
      : 'padding: 11px 20px;'}

  &:hover {
    background-color: ${(props) => props.theme.lightBg};
  }
  &:active {
    background-color: ${(props) => props.theme.lightBg2};
  }
`;

const SpinnerContainer = styled.div`
  position: relative;
  height: 16px;
`;
const PositiveButton = styled(BaseButton)`
  cursor: pointer;

  background: linear-gradient(
    106.26deg,
    ${(props) => hexToRgbA(props.theme.accent1B)} 5.73%,
    ${(props) => hexToRgbA(props.theme.accent1)} 93.83%
  );

  &:hover {
    background: linear-gradient(
      106.26deg,
      ${(props) => hexToRgbA(props.theme.accent1B, 0.9)} 5.73%,
      ${(props) => hexToRgbA(props.theme.accent1, 0.9)} 93.83%
    );
  }
  &:active {
    background: linear-gradient(
      106.26deg,
      ${(props) => hexToRgbA(props.theme.accent1B, 0.8)} 5.73%,
      ${(props) => hexToRgbA(props.theme.accent1, 0.8)} 93.83%
    );
  }
`;

const NegativeButton = styled(BaseButton)`
  cursor: pointer;

  background: linear-gradient(
    106.26deg,
    ${(props) => hexToRgbA(props.theme.accent2B)} 5.73%,
    ${(props) => hexToRgbA(props.theme.accent2)} 93.83%
  );

  &:hover {
    background: linear-gradient(
      106.26deg,
      ${(props) => hexToRgbA(props.theme.accent2B, 0.9)} 5.73%,
      ${(props) => hexToRgbA(props.theme.accent2, 0.9)} 93.83%
    );
  }
  &:active {
    background: linear-gradient(
      106.26deg,
      ${(props) => hexToRgbA(props.theme.accent2B, 0.8)} 5.73%,
      ${(props) => hexToRgbA(props.theme.accent2, 0.8)} 93.83%
    );
  }
`;

export enum JustifyContent {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

const ButtonContent = styled.div<{
  color?: ButtonProps['color'];
  justify?: JustifyContent;
  verticalAlign?: boolean;
}>`
  display: flex;
  flex-direction: ${({ verticalAlign }) => (verticalAlign ? 'column' : 'row')};
  justify-content: ${({ justify }) => (justify ? justify : JustifyContent.Center)};
  align-items: center;
  ${(props) =>
    props.color == 'positive'
      ? 'color: ' + props.theme.textAccent1 + ';'
      : props.color == 'negative'
      ? 'color: ' + props.theme.textAccent2 + ';'
      : props.color
      ? 'color: ' + props.color + ';'
      : ''}
`;

const SquareButtonIconContainer = styled.div`
  height: 66px;
  width: 66px;
  margin: 30px auto 16px;

  & > img {
    width: 100%;
  }
`;

export const LargeButtonText = styled.p`
  color: ${colors.blueText};
  font-size: 18px;
  font-weight: 500;
  margin: 0 20px;
`;

export const HomePageButton = styled.button`
  left: calc(50% - 160px / 2);
  top: 20px;
  padding: 12px 24px;

  /* SECONDARY */
  background: #46c4c2;
  box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.25);
  border-radius: 8px;
  color: white;
  border: none;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  a {
    color: white;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
  }

  &:hover,
  &:active {
    background: #0d4752;
    box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.25);
  }
`;
