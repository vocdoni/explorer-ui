import { Tag, TagProps } from '@chakra-ui/tag';
import React, { PropsWithChildren } from 'react';

export const CustomTag = ({ children, ...rest }: PropsWithChildren<TagProps>) => (
  <Tag variant={'vocdoni'} {...rest}>
    {children}
  </Tag>
);
