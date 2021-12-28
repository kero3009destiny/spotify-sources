import React from 'react';
import styled from 'styled-components';
import { Heading2Styles } from '../../client/01_atoms/heading';
import { ExtraSmallTextStyles } from '../../common/01_atoms/text';
import fluidScale from '../../../styled-lib/fluidScale'

interface IAgencyStatsProps {
  company: any;
}

const StyledStatWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledStatBlock = styled.div`
  background-color: var(--color-DARKNESS);
  flex: 1;
  margin-right: 20px;
  text-align: right;
  padding: 50px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledStatNumber = styled.div`
  ${Heading2Styles}
  color: var(--color-PRIMARY);
`;

const StyledStatLabel = styled.div`
  ${ExtraSmallTextStyles}
  color: var(--color-DIRTY-SNOW);
`;

const AgencyStats = ({ company }: IAgencyStatsProps) => {
  if (company.members === undefined) {
    return null;
  }

  // Should there be any rounding here?
  let totalHours = (company.total_completed / 4)
    .toLocaleString('en-US', { useGrouping: true});

  let members = company.members
    .toLocaleString('en-US', { useGrouping: true});

  return <StyledStatWrapper>
    <StyledStatBlock>
      <StyledStatNumber>{members}</StyledStatNumber>
      <StyledStatLabel>Members</StyledStatLabel>
    </StyledStatBlock>

    <StyledStatBlock>
      <StyledStatNumber>{company.avg_completion}%</StyledStatNumber>
      <StyledStatLabel>Overall Completion</StyledStatLabel>
    </StyledStatBlock>

    <StyledStatBlock>
      <StyledStatNumber>{totalHours}</StyledStatNumber>
      <StyledStatLabel>Total hours viewed</StyledStatLabel>
    </StyledStatBlock>
  </StyledStatWrapper>
}

export default AgencyStats
