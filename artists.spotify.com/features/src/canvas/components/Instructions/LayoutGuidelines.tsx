import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FormToggle,
  IconHelpAlt,
  Type,
  ButtonTertiary,
  Popover,
  PopoverTrigger,
  spacer20,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

const Center = styled.div`
  display: flex;
  align-items: center;
`;

type Props = {
  enabled?: boolean;
  toggle: () => void;
};

export function LayoutGuidelines({ enabled, toggle }: Props) {
  const t = useT();
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Center>
      <FormToggle
        checked={enabled}
        onChange={toggle}
        data-testid="canvas-instructions--guidelines-toggle"
      >
        <Type semanticColor="textSubdued" condensed>
          {t(
            'CANVAS_LAYOUT_GUIDELINE_1',
            'Preview for iPhone X',
            'Change the view of the Canvas to simulate the iPhone X',
          )}
        </Type>
      </FormToggle>
      <PopoverTrigger
        style={{ marginLeft: `-${spacer20}` }}
        placement={PopoverTrigger.topLeft}
        onShow={() => setShowPopover(true)}
        onHide={() => setShowPopover(false)}
        hideCloseButton
        overlay={
          showPopover && (
            <Popover
              id="canvas-guidelines-tooltip"
              arrow={Popover.bottomRight}
              data-testid="canvas-instructions--guidelines-tooltip"
              large
            >
              {t(
                'CANVAS_LAYOUT_GUIDELINE_TOOLTIP',
                'The sides of your Canvas will be hidden on narrower phones such as the iPhone X or Samsung S9.',
                'Some phone models will hide parts of the Canvas',
              )}
            </Popover>
          )
        }
      >
        <ButtonTertiary
          aria-label={t('CANVAS_HELP_ICON', 'Help', 'Display a help message')}
          aria-expanded={showPopover}
          iconOnly={IconHelpAlt}
          buttonSize="sm"
          condensed
          data-testid="canvas-instructions--guidelines-help"
        />
      </PopoverTrigger>
    </Center>
  );
}
