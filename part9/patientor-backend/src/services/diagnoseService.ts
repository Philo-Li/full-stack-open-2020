// import diagnoseData from '../../data/diagnoses.json'
import diagnoses from '../../data/diagnosesTS'
import { DiagnoseEntry } from '../types';

// const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = (): Array<DiagnoseEntry> => {
  console.log(diagnoses)
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};