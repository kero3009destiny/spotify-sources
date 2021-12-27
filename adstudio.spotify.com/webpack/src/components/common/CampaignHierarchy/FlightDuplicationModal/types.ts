import { FormatType } from 'types/common/state/api/format';

export interface FlightDuplicationModalProps {
  onClose: () => void;
  flightId: string;
  campaignId: string;
  adAccountId: string;
  format: FormatType;
}

export enum FlightDuplicationOptions {
  DUPLICATE_WITH_CREATIVES = 'DUPLICATE_WITH_CREATIVES',
  DUPLICATE_WITHOUT_CREATIVES = 'DUPLICATE_WITHOUT_CREATIVES',
}

export interface FlightDuplicationOptionValues {
  duplicationOption: FlightDuplicationOptions;
}
