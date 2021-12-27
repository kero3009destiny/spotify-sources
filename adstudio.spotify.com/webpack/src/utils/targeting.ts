import { fromPairs, isArray } from 'lodash';

import { ALL_GENDERS_VALUE } from 'config';

import { Target } from 'types/common/state/api/flight';

export function platformFill(platforms: string[] = []) {
  return fromPairs(
    ['android', 'ios', 'desktop'].map(p => [p, platforms.includes(p)]),
  );
}

export function segmentsFill(segments: string[] = []) {
  return segments.reduce((obj, id) => {
    (obj as TSFixMe)[id] = true;
    return obj;
  }, {});
}

export function momentsFill(moments: Target[] = []) {
  return moments.reduce((obj, m: TSFixMe) => {
    (obj as TSFixMe)[m.id] = true;
    return obj;
  }, {});
}

export function genderFill(genders: string[] = []) {
  return genders.length === 1 ? genders[0] : ALL_GENDERS_VALUE;
}

export const limitDecimals = (value: Number, fixed = 2) => value.toFixed(fixed);

export function pickIdsFromObjectArray<ObjectType>(
  array: ObjectType[],
  idField: string = 'id',
): any[] {
  if (isArray(array)) {
    return array.map(e => e[idField as keyof ObjectType]);
  }
  return [];
}
