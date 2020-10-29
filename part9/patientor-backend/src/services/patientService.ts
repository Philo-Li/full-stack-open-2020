import patients from '../../data/patients';
import { Patient, Entry, NewPatient, NonSensitivePatientEntry, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

let savedPatients = [...patients];

const getPatients = (): NonSensitivePatientEntry[] => {
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

export default {
  getPatients,
  addPatient,
  getPublicPatient,
};