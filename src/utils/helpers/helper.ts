import Hashids from 'hashids';

export const recursivelyStripNullValues = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursivelyStripNullValues(value),
      ]),
    );
  }
  if (value !== null) {
    return value;
  }
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const getHashIds = () => {
  return new Hashids(
    process.env.HASHIDS_SALT,
    parseInt(process.env.HASHIDS_PADDING),
  );
};

export const encodeId = (id: number): string => {
  return getHashIds().encode(id);
};

export const decodeId = (encodedId: string): number => {
  return Number(getHashIds().decode(encodedId)[0]);
};
