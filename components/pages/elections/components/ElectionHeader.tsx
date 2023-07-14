import React from 'react';

import { FALLBACK_VOTE_HEADER_IMAGE } from '@const/vote';
import { ElectionHeader } from '@vocdoni/chakra-components';

export const CustomElectionHeader = () => <ElectionHeader fallbackSrc={FALLBACK_VOTE_HEADER_IMAGE} />;
