import { Tag } from '@chakra-ui/tag';
import React, { ReactNode } from 'react';

type TagProps = React.ComponentProps<typeof Tag>;

export const CustomTag = ({ children, ...rest }: { children: ReactNode } & TagProps) => (
  <Tag variant={'vocdoni'} {...rest}>
    {children}
  </Tag>
);
