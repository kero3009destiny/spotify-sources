interface UnknownObject {
  [key: string]: any;
}

type ArrayOfUnknownObjects = UnknownObject[];

export function getPropertyWithHighestValue(
  arrayOfObjects: ArrayOfUnknownObjects,
  key: string
): UnknownObject {
  return arrayOfObjects.reduce((prev, current) =>
    prev[key] > current[key] ? prev : current
  );
}
