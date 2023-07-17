import { CustomTag } from '@components/elements/CustomTag';
import React, { ReactNode } from 'react';
import { colors } from '@theme/colors';

const ActiveBadge = ({ children }: { children: ReactNode }) => (
  <CustomTag bg={colors.accent1C} color={colors.text}>
    {children}
  </CustomTag>
);

const UpcomingBadge = ({ children }: { children: ReactNode }) => (
  <CustomTag bg={colors.accent1B} color={colors.text}>
    {children}
  </CustomTag>
);

export { ActiveBadge, UpcomingBadge };
