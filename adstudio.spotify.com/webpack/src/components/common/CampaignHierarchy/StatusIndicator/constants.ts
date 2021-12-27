import i18n from 'i18next';

import {
  gold as needsattention,
  gray85,
} from '@spotify-internal/encore-foundation';
import { cssColorValue, semanticColors } from '@spotify-internal/encore-web';

import { EntityState as APIEntityState } from 'types/common/state/api';

type INCOMPLETE = 'INCOMPLETE';

export enum EntityType {
  Flight,
  Creative,
  Campaign,
}

export type EntityState = APIEntityState | INCOMPLETE;

export const STATUS_COLOR_MAP = {
  ACTIVE: cssColorValue(semanticColors.textPositive),
  READY: cssColorValue(semanticColors.textPositive),
  COMPLETED: gray85,
  STOPPED: gray85,
  PENDING_APPROVAL: needsattention,
  APPROVED: cssColorValue(semanticColors.textPositive),
  REJECTED: cssColorValue(semanticColors.textNegative),
  PAUSED: gray85,
  PROCESSING: gray85,
  UNKNOWN: gray85,
  INCOMPLETE: needsattention,
};

const Active = i18n.t('I18N_ENTITY_STATE_ACTIVE', 'Active');
const Ready = i18n.t('I18N_ENTITY_STATE_READY', 'Ready');
const Completed = i18n.t('I18N_ENTITY_STATE_COMPLETED', 'Completed');
const Archived = i18n.t('I18N_ENTITY_STATE_ARCHIVED', 'Archived');
const Stopped = i18n.t('I18N_ENTITY_STATE_STOPPED', 'Stopped');
const PendingApproval = i18n.t(
  'I18N_ENTITY_STATE_PENDING_APPROVAL',
  'Pending approval',
);
const Approved = i18n.t('I18N_ENTITY_STATE_APPROVED', 'Approved');
const Rejected = i18n.t('I18N_ENTITY_STATE_REJECTED', 'Rejected');
const Paused = i18n.t('I18N_ENTITY_STATE_PAUSED', 'Paused');
const Processing = i18n.t('I18N_ENTITY_STATE_PROCESSING', 'Processing');
const Unknown = i18n.t('I18N_ENTITY_STATE_UNKNOWN', 'Unknown');
const Incomplete = i18n.t('I18N_ENTITY_STATE_INCOMPLETE', 'Incomplete');

export type StatusText =
  | typeof Active
  | typeof Ready
  | typeof Completed
  | typeof Archived
  | typeof Stopped
  | typeof PendingApproval
  | typeof Approved
  | typeof Rejected
  | typeof Paused
  | typeof Incomplete
  | typeof Processing;

export const STATUS_TEXT_MAP: Record<EntityState, StatusText> = {
  ACTIVE: Active,
  READY: Ready,
  COMPLETED: Completed,
  STOPPED: Stopped,
  PENDING_APPROVAL: PendingApproval,
  APPROVED: Approved,
  REJECTED: Rejected,
  PAUSED: Paused,
  PROCESSING: Processing,
  UNKNOWN: Unknown,
  INCOMPLETE: Incomplete,
};

export const getStatusText = (entityState: EntityState): StatusText =>
  STATUS_TEXT_MAP[entityState];
