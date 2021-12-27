import React from 'react';
import { ButtonTertiary, color, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';

const Section = styled.section`
  border: 1px solid ${color.gray75};
  padding: 30px;
  margin: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const EditButton = styled(ButtonTertiary).attrs(() => ({
  semanticColor: 'textBase',
}))`
  display: flex;
  flex-direction: row;
  padding: 0;
  cursor: pointer;
`;

type Props = {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
};

export const EditContainer = ({ title, onEdit, children }: Props) => (
  <Section>
    <Row>
      <Type as="p" variant="violaBold">
        {title}
      </Type>
      <EditButton onClick={onEdit}>Edit</EditButton>
    </Row>
    {children}
  </Section>
);
