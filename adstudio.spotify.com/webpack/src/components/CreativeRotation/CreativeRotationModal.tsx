import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Form } from 'react-final-form';
import { connect } from 'react-redux';
import { ValidationErrors } from 'final-form';
import arrayMutators from 'final-form-arrays';
import i18n from 'i18next';
import get from 'lodash/get';
import styled from 'styled-components';

import {
  spacer8,
  spacer16,
  spacer24,
} from '@spotify-internal/encore-foundation';
import {
  Backdrop,
  ButtonIcon,
  ButtonTertiary,
  DialogConfirmation,
  IconExclamationAlt,
  IconX,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import {
  EditFlightLinksPayload,
  FlightLinkParameters,
} from 'ducks/flightlinks/types';
import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { getAllCreatives } from 'ducks/creatives/actions';
import { editFlightLinks, resetFlightLinks } from 'ducks/flightlinks/actions';
import { displayNotification as displayNotificationAC } from 'ducks/notifications/actions';
import { getAccount } from 'ducks/account/selectors';
import { getCreativesState } from 'ducks/creatives/selectors';
import {
  getEditFlightLinkError,
  getEditFlightLinksPayload,
  getEditFlightLinkSuccess,
} from 'ducks/flightlinks/selectors';

import {
  AnalyticsContext,
  AnalyticsContextConsumer,
} from 'components/common/AnalyticsContext';
import { RemoteSubmitFormButton } from 'components/common/RemoteSubmitFormButton';

import { smoothScrollTo } from 'utils/smoothScrollTo';

import { ErrorText } from '../form-common/ErrorText';
import {
  CreativeRotationForm,
  CreativeRotationFormValues,
} from './CreativeRotationForm';

import {
  CreativeRotationFormData,
  CreativeRotationTypeOption,
  GA_EVENTS,
  GA_SELECTION_LABELS,
} from './constants';

import {
  CREATIVE_ROTATION_TYPE,
  CreativeRotationType,
} from 'types/common/state/api/creative';
import { CreativesCatalogueEntity } from 'types/common/state/api/creatives';

export const I18N_EDIT_CREATIVE_ROTATION_SUCCESS = i18n.t(
  'I18N_EDIT_CREATIVE_ROTATION_SUCCESS',
  'Ad rotation delivery updated.  Please wait 10 minutes for changes to take effect.',
);
const I18N_EDIT_AD_ROTATION = i18n.t(
  'I18N_EDIT_AD_ROTATION',
  'Edit ad rotation',
);
const I18N_SAVE = i18n.t('I18N_SAVE', 'Save');
const I18N_CANCEL = i18n.t('I18N_CANCEL', 'Cancel');

interface StateProps {
  initialValues: CreativeRotationFormValues;
  adAccountId: string;
  editFlightLinkSuccess: boolean;
  editFlightLinkError: string | boolean;
  editFlightLinksPayload: EditFlightLinksPayload | null;
}

interface DispatchProps {
  fetchAllCreatives: () => void;
  handleSubmitCreativeRotationForm: (
    formValues: CreativeRotationFormValues,
  ) => void;
  onSuccess: (gaCategory: string) => void;
  onFailure: (gaCategory: string) => void;
}

export interface OwnProps {
  flightId: string;
  onClose: () => void;
}

export type CreativeRotationModalProps = StateProps & DispatchProps & OwnProps;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
export const StyledDialogConfirmation = styled(DialogConfirmation as any)`
  width: 960px;
`;

const ModalBody = styled.div`
  user-select: none;
  position: relative;
  padding: 0 ${spacer24};
`;

const StyledSubmitButton = styled(RemoteSubmitFormButton)`
  // overriding a pesky setting in encore
  margin-left: 0 !important;
`;

const ErrorContainer = styled.div`
  flex-grow: 1;
  padding-left: ${spacer16};
`;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
const StyledErrorText = styled(ErrorText as any)`
  vertical-align: super;
  margin-left: ${spacer8};
`;

const HeaderContainer = styled.span`
  float: left;
  display: inline-block;
  max-width: 300px;
`;

// FIXME: the typecasting was required based on the versions of typescript and styled components (https://github.com/microsoft/TypeScript/issues/37597#). When we upgrade to styled components 5, "as TSFixMe" can be removed
const StyledButtonIcon = styled(ButtonIcon as any)`
  border: 0;
  outline: none;
  padding: 20px;
  float: right;
  position: relative;
  top: -${spacer8};
  right: 0;
  background: transparent;
  path {
    stroke: #535353;
  }
  &:hover {
    cursor: pointer;
    path {
      stroke: #777;
    }
  }
`;

export const CreativeRotationModal: FunctionComponent<CreativeRotationModalProps> = ({
  onClose,
  initialValues,
  handleSubmitCreativeRotationForm,
  editFlightLinkSuccess,
  editFlightLinkError,
  onSuccess,
  onFailure,
  fetchAllCreatives,
}) => {
  const { category } = useContext(AnalyticsContext);
  useEffect(() => {
    fetchAllCreatives();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (editFlightLinkSuccess) {
      onClose();
      onSuccess(category);
      smoothScrollTo(0, 0);
    }
    if (editFlightLinkError) {
      onFailure(category);
    }
  }, [
    onClose,
    onSuccess,
    onFailure,
    editFlightLinkSuccess,
    editFlightLinkError,
    category,
  ]);
  return (
    <Backdrop center>
      <AnalyticsContextConsumer>
        {({ logUserAction }) => (
          <Form
            keepDirtyOnReinitialize
            onSubmit={handleSubmitCreativeRotationForm}
            mutators={{ ...arrayMutators }}
            initialValues={initialValues}
            render={({ form, handleSubmit }) => {
              const formState = form.getState();
              const creativesError: ValidationErrors =
                formState.submitFailed &&
                formState.errors[CreativeRotationFormData.Fields.Creatives];
              return (
                <StyledDialogConfirmation
                  dialogTitle={
                    <div>
                      <HeaderContainer>
                        <Type as="h2" variant={Type.heading2}>
                          {I18N_EDIT_AD_ROTATION}
                        </Type>
                      </HeaderContainer>
                      <StyledButtonIcon
                        component="a"
                        onClick={() => {
                          logUserAction({
                            category,
                            label: GA_EVENTS.CLICK_X_AD_DELIVERY_POPUP,
                          });
                          onClose();
                        }}
                      >
                        <IconX data-test="x-close-creative-rotation-modal" />
                      </StyledButtonIcon>
                    </div>
                  }
                  body={
                    <ModalBody data-test="creative-rotation-modal">
                      <CreativeRotationForm
                        form={form}
                        handleSubmit={handleSubmit}
                      />
                    </ModalBody>
                  }
                  footer={
                    <>
                      {(creativesError || editFlightLinkError) && (
                        <ErrorContainer>
                          <IconExclamationAlt
                            semanticColor={semanticColors.textNegative}
                          />
                          <StyledErrorText
                            semanticColor={semanticColors.textNegative}
                            variant={Type.body2}
                          >
                            {creativesError ||
                              i18n.t(
                                'I18N_SOMETHING_WENT_WRONG_PLE1',
                                'Something went wrong. Please try again.',
                              )}
                          </StyledErrorText>
                        </ErrorContainer>
                      )}
                      <ButtonTertiary
                        onClick={() => {
                          logUserAction({
                            category,
                            label: GA_EVENTS.CANCEL_AD_DELIVERY_POPUP,
                          });
                          onClose();
                        }}
                        data-test="creative-rotation-modal-cancel-button"
                        buttonLegacy
                      >
                        {I18N_CANCEL}
                      </ButtonTertiary>
                      <StyledSubmitButton
                        htmlFormElementId={CreativeRotationFormData.id}
                        data-test="creative-rotation-modal-submit-button"
                      >
                        {I18N_SAVE}
                      </StyledSubmitButton>
                    </>
                  }
                />
              );
            }}
          />
        )}
      </AnalyticsContextConsumer>
    </Backdrop>
  );
};

export const getBffTypeFromUICreativeRotationType = (
  type: CreativeRotationTypeOption,
): CreativeRotationType => {
  switch (type) {
    case CreativeRotationTypeOption.SEQUENTIAL:
      return CREATIVE_ROTATION_TYPE.SEQUENTIAL;

    case CreativeRotationTypeOption.EVENLY:
    case CreativeRotationTypeOption.WEIGHTED:
      return CREATIVE_ROTATION_TYPE.WEIGHTED;

    case CreativeRotationTypeOption.UNKNOWN:
    default:
      return CREATIVE_ROTATION_TYPE.OPTIMIZED;
  }
};

export const formatFlightLinkParameters = (
  formValues: CreativeRotationFormValues,
) => {
  return formValues.creatives.map<FlightLinkParameters>(creative => {
    const flightLinkId = creative.flightLink && creative.flightLink.id!;
    if (!flightLinkId)
      throw new Error(
        `Cannot edit creative ${creative.name} (${creative.creativeId}) as it does not have a flightLink.`,
      );
    const isSequential =
      formValues.creativeRotationType === CreativeRotationTypeOption.SEQUENTIAL;
    const isEvenly =
      formValues.creativeRotationType === CreativeRotationTypeOption.EVENLY;
    const weight =
      formValues.creativeRotationType === CreativeRotationTypeOption.WEIGHTED
        ? creative.weight
        : undefined;
    const parameters: FlightLinkParameters = {
      flightLinkId,
      creativeRotationParameters: {
        rotationType: getBffTypeFromUICreativeRotationType(
          formValues.creativeRotationType,
        ),
        order: isSequential ? creative.order : undefined,
        weight: isEvenly ? 1.0 : weight,
      },
    };
    return parameters;
  });
};

export const getCreativeRotationTypeFromFlightLinkParameters = (
  flightLinks: FlightLinkParameters[] | undefined,
): CreativeRotationTypeOption => {
  if (!flightLinks) {
    return CreativeRotationTypeOption.UNKNOWN;
  }
  if (flightLinks.length === 0) {
    return CreativeRotationTypeOption.EVENLY;
  }
  const firstFlightLink = flightLinks[0];
  const bffCreativeRotationType = get(
    firstFlightLink,
    'creativeRotationParameters.rotationType',
    CREATIVE_ROTATION_TYPE.WEIGHTED,
  ) as CreativeRotationType;
  if (bffCreativeRotationType === CREATIVE_ROTATION_TYPE.WEIGHTED) {
    let isEvenlyWeighted = true;
    flightLinks.forEach(item => {
      if (
        item.creativeRotationParameters.weight !==
        firstFlightLink.creativeRotationParameters.weight
      ) {
        isEvenlyWeighted = false;
      }
    });
    return isEvenlyWeighted
      ? CreativeRotationTypeOption.EVENLY
      : CreativeRotationTypeOption.WEIGHTED;
  } else if (bffCreativeRotationType === CREATIVE_ROTATION_TYPE.SEQUENTIAL) {
    return CreativeRotationTypeOption.SEQUENTIAL;
  }
  return CreativeRotationTypeOption.UNKNOWN;
};

export const getCreativeRotationTypeFromCreatives = (
  creatives: CreativesCatalogueEntity[],
): CreativeRotationTypeOption => {
  const flightLinks: FlightLinkParameters[] = creatives.map<
    FlightLinkParameters
  >(creative => {
    return {
      flightLinkId: creative.flightLink!.id || '',
      creativeRotationParameters: creative.flightLink!
        .creativeRotationParameters,
    };
  });
  return getCreativeRotationTypeFromFlightLinkParameters(flightLinks);
};

export const mapStateToProps = (state: TSFixMe): StateProps => {
  const creativesCatalogueItems = getCreativesState(
    state,
  ).allCreatives.items.filter(creative => creative.flightLink);
  const creativeRotationType = getCreativeRotationTypeFromCreatives(
    creativesCatalogueItems,
  );
  return {
    initialValues: {
      creativeRotationType,
      creatives: creativesCatalogueItems,
    },
    adAccountId: getAccount(state).id,
    editFlightLinkSuccess: getEditFlightLinkSuccess(state),
    editFlightLinkError: getEditFlightLinkError(state),
    editFlightLinksPayload: getEditFlightLinksPayload(state),
  };
};

export const mergeProps = (
  stateProps: StateProps,
  { dispatch }: TSFixMe,
  ownProps: OwnProps,
): CreativeRotationModalProps => {
  return {
    ...ownProps,
    ...stateProps,
    onClose: () => {
      dispatch(resetFlightLinks());
      ownProps.onClose();
    },
    fetchAllCreatives: () => {
      dispatch(
        getAllCreatives({
          adAccountId: stateProps.adAccountId,
          flightId: ownProps.flightId,
        }),
      );
    },
    handleSubmitCreativeRotationForm: formValues => {
      const flightLinkParameters = formatFlightLinkParameters(formValues);
      const payload: EditFlightLinksPayload = {
        adAccountId: stateProps.adAccountId,
        flightLinks: flightLinkParameters,
      };
      dispatch(editFlightLinks(payload));
    },
    onSuccess: gaCategory => {
      const rotationType = getCreativeRotationTypeFromFlightLinkParameters(
        stateProps.editFlightLinksPayload?.flightLinks,
      );
      dispatch(
        logUserActionAC({
          category: gaCategory,
          label: GA_EVENTS.SAVE_AD_DELIVERY_OPTION_SUCCESS,
          params: GA_SELECTION_LABELS[rotationType],
        }),
      );
      dispatch(
        displayNotificationAC(I18N_EDIT_CREATIVE_ROTATION_SUCCESS, 'positive'),
      );
      dispatch(resetFlightLinks());
    },
    onFailure: gaCategory => {
      const rotationType = getCreativeRotationTypeFromFlightLinkParameters(
        stateProps.editFlightLinksPayload?.flightLinks,
      );
      dispatch(
        logUserActionAC({
          category: gaCategory,
          label: GA_EVENTS.SAVE_AD_DELIVERY_OPTION_FAILED,
          params: GA_SELECTION_LABELS[rotationType],
        }),
      );
    },
  };
};

export const ConnectedCreativeRotationModal = connect<
  StateProps,
  {},
  OwnProps,
  CreativeRotationModalProps
>(
  mapStateToProps,
  undefined,
  mergeProps,
)(CreativeRotationModal);

export default ConnectedCreativeRotationModal;
