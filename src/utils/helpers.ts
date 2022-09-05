import { BaseResponse } from './base-response';

import { codeMapping } from './code-mapping';
export const baseResponse = (data: any, options?: any) => {
  return new BaseResponse(data, options);
};

export const baseResponseCreate = (data: any, module?: string) => {
  const message = `success create ${module || ''}`.trim();
  const code = codeMapping.CREATED;
  return baseResponse(data, { code, message });
};

export const baseResponseList = (data: any, options?: any) => {
  const message = options?.message || `list data`;
  const meta = options?.meta || null;
  const code = codeMapping.SUCCESS_LIST;

  console.log(options);

  return baseResponse(data, { code, message, meta });
};

export const baseResponseRead = (data: any, module?: string) => {
  const message = `read ${module || ''}`.trim();
  const code = codeMapping.SUCCESS_READ;
  return baseResponse(data, { code, message });
};

export const baseResponseUpdate = (data: any, module?: string) => {
  const message = `success update ${module || ''}`.trim();
  const code = codeMapping.SUCCESS_UPDATE;
  return baseResponse(data, { code, message });
};

export const baseResponseDelete = (data: any, module?: string) => {
  const message = `success delete ${module || ''}`.trim();
  const code = codeMapping.SUCCESS_DELETE;
  return baseResponse(data, { code, message });
};

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

export const encodeId = (id: number): string => {
  return `${id}`;
};

export const decodeId = (encodedId: string): number => {
  return parseInt(encodedId);
};
