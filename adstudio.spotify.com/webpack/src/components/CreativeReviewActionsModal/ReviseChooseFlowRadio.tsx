import React from 'react';
import styled from 'styled-components';

import { ReduxFormFieldHOC as reduxFormFieldHOC } from '@spotify-internal/adstudio-shared';
import { FormGroup } from '@spotify-internal/adstudio-tape';
import {
  cssColorValue,
  FormRadio,
  semanticColors,
  spacer4,
  spacer8,
  spacer16,
  spacer24,
  spacer32,
  Type,
} from '@spotify-internal/encore-web';

import { formRadioOverrides } from 'components/common/styles';

const Container = styled(FormGroup)`
  min-width: 400px;
  margin-top: ${spacer4};
`;

const OuterGrid = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-content: center;
  margin-top: ${spacer32};
`;

const Selector = styled.div`
  border-radius: ${spacer4};
  margin: 0 ${spacer24};
  box-shadow: 0 1px 3px 0
    ${cssColorValue(semanticColors.backgroundElevatedPress)};
  background-color: white;
  text-align: center;
  height: 240px;
  padding: ${spacer8} ${spacer16} 0;

  ${formRadioOverrides}
`;

const InternalGrid = styled.div`
  display: grid;
  justify-items: center;
  padding-top: ${spacer16};
  width: 220px;
  height: 220px;
`;

interface Option {
  key: string;
  'data-test'?: string;
  children: typeof React.Children;
  renderIcon: typeof React.Component;
  ctaText: string;
  subdescription: string;
  radioValue: string;
}

export interface InlineRadioSelectorProps {
  options: Array<Option>;
  value: string;
}

export class InlineRadioSelector extends React.Component<
  InlineRadioSelectorProps
> {
  render() {
    const { options, value, ...props } = this.props;

    return (
      <Container>
        <OuterGrid>
          {options.map(
            ({
              renderIcon: Icon,
              ctaText,
              subdescription,
              radioValue,
              ...rest
            }) => {
              const active = value === radioValue;
              return (
                <Selector key={`${radioValue}-selector`}>
                  <FormRadio
                    {...props}
                    checked={active}
                    value={radioValue}
                    key={radioValue}
                    id={radioValue}
                    data-test={rest['data-test']}
                  >
                    <InternalGrid>
                      <Icon
                        iconSize={48}
                        semanticColor={cssColorValue(
                          semanticColors.textBrightAccent,
                        )}
                      />
                      <Type.h3
                        weight={Type.bold}
                        variant={Type.body1}
                        semanticColor={semanticColors.textBase}
                        condensed
                      >
                        {ctaText}
                      </Type.h3>
                      <Type.p
                        weight={Type.book}
                        variant={Type.body2}
                        semanticColor={
                          active
                            ? semanticColors.textBase
                            : semanticColors.textSubdued
                        }
                        condensed
                      >
                        {subdescription}
                      </Type.p>
                    </InternalGrid>
                  </FormRadio>
                </Selector>
              );
            },
          )}
        </OuterGrid>
      </Container>
    );
  }
}

export default reduxFormFieldHOC(InlineRadioSelector);
