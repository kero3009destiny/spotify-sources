// ignore-string-externalization
// https://ghe.spotify.net/mad-props/remote-configuration-js-sdk/blob/master/packages/resolver/src/define.ts
import { RCPublishProperty } from '@spotify-internal/remote-config-properties';

type StringEnum = {
  [id: string]: string;
};

type BoolDef = Readonly<{
  name: string;
  description: string;
  default: boolean;
}>;

type IntDef = Readonly<{
  name: string;
  description: string;
  upper: number;
  lower: number;
  default: number;
}>;

type EnumDef<T extends StringEnum> = Readonly<{
  name: string;
  description: string;
  values: T;
  default: T[keyof T];
}>;

export type PropertyRef<T> = string & { _type: T };

export const properties: RCPublishProperty[] = [];

function defineProperty(spec: RCPublishProperty): PropertyRef<unknown> {
  properties.push(spec);
  return spec.name as PropertyRef<unknown>;
}

export function defineEnum<T extends StringEnum>({
  name,
  description,
  values,
  default: def,
}: EnumDef<T>): PropertyRef<T[keyof T]> {
  return defineProperty({
    name,
    description,
    enumSpec: {
      values: Object.values(values),
      default: def,
    },
  }) as PropertyRef<T[keyof T]>;
}

export function defineBool({
  name,
  description,
  default: def,
}: BoolDef): PropertyRef<boolean> {
  return defineProperty({
    name,
    description,
    boolSpec: {
      default: def,
    },
  }) as PropertyRef<boolean>;
}

export function defineInt({
  name,
  description,
  upper,
  lower,
  default: def,
}: IntDef): PropertyRef<number> {
  return defineProperty({
    name,
    description,
    intSpec: {
      upper,
      lower,
      default: def,
    },
  }) as PropertyRef<number>;
}
