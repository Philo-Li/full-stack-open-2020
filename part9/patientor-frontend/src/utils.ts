import { Gender, Entry, Patient } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseToString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(
      `Incorrect or missing ${paramName}: ${param}`
    );
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error(`Incorrect or missing gender: ${gender}`);
  } 
  return gender;
};

const isArrayOfEntries = (param: any[]): param is Entry[] => {
  return true;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries) || !isArrayOfEntries(entries)) {
    throw new Error(
      `Incorrect or missing entries: ${JSON.stringify(entries)}`
    );
  }
  return entries;
};

export const toPatient = (object: any): Patient => {
  return {
    name: parseToString(object.name, "name"),
    occupation: parseToString(object.occupation, "occupation"),
    gender: parseGender(object.gender),
    ssn: parseToString(object.ssn, "ssn"),
    dateOfBirth: parseDate(object.dateOfBirth),
    id: parseToString(object.id, "id"),
    entries: parseEntries(object.entries),
  };
};

export default toPatient;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};