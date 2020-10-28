import patients from '../../data/patientsTS'
import { PatientEntry, NewPatientEntry, NonSensitivePatientEntry, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getPublicPatient = (id: string): PublicPatient => {
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error('Incorrect or missing patient: ' + patient);
} 
  const result = {...patient, entries: []};
  return result;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  getPublicPatient,
};