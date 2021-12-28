import { pick } from 'lodash';

export const getCertificationsByStatus = (state, status) => Object.values(pick(
  state.certifications.certifications, state.certifications.filters[status],
)) || [];

