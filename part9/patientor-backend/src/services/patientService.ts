import patients from '../../data/patients';
import { Patient, Entry, NewPatient, PublicPatient, NewEntry, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

let savedPatients = [...patients];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const findById = (id: any): Patient | undefined => {
  const patient = savedPatients.find((p) => p.id === id);
  return patient;
};

const getPatients = (): NonSensitivePatient[] => {
  return savedPatients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return { id, name, dateOfBirth, gender, occupation, entries };
    }
  );
};

const getPublicPatient = (id: string): PublicPatient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    throw new Error('Incorrect or missing patient: ' + patient);
  } 
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid(), entries: [] as Entry[] };
  savedPatients = savedPatients.concat(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry = {...newEntry, id: uuid()};
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
  savedPatients = savedPatients.map((p) =>
    p.id === savedPatient.id ? savedPatient : p
  );
  return savedPatient;
};

export default {
  findById,
  getPatients,
  addPatient,
  getPublicPatient,
  addEntry,
};