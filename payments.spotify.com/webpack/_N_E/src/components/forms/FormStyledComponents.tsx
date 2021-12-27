import styled from 'styled-components';
import { color, gray80, screenSmMax, screenSmMin, spacer32, Type } from '@spotify-internal/encore-web';
import { HEADER_HEIGHT } from '../Header/RegistrationHeader';
import { FOOTER_HEIGHT } from './FormFooter';
import { ifDeviceBiggerThan, ifDeviceSmallerThan } from '../../helpers/device';

export const FormContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
  margin: 0 16px;

  ${ifDeviceBiggerThan(screenSmMin)} {
    margin: auto;
    width: 430px;
  }
`;

export const StepViewerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 10;
`;

export const FormWrapper = styled.div`
  width: inherit;
  position: relative;
`;

export const StepViewerSideBar = styled.div`
  width: 35vw;
  padding: 116px ${spacer32} 0 ${spacer32};
  border-right: 1px solid ${gray80};
  z-index: 10;

  ${ifDeviceSmallerThan(screenSmMax)} {
    display: none;
  }
`;

export const FormCategoryTitle = styled(Type.h2).attrs(() => ({
  as: 'h2',
  variant: 'heading2',
}))`
  font-size: 1em;
  margin-top: 32px;

  ${ifDeviceBiggerThan(screenSmMin)} {
    margin-top: 124px;
  }
`;

export const FormTitle = styled(Type.h3).attrs(() => ({
  as: 'h3',
  variant: 'heading3',
}))`
  font-size: 3em;
  margin: 0;
`;

export const FormDescription = styled(Type.p).attrs(() => ({
  as: 'p',
  variant: 'body1',
}))`
  font-size: 0.875em;
  color: ${color.gray50};
  margin-bottom: ${spacer32};
`;
