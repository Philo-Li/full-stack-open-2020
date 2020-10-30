import diagnoses from '../../data/diagnosesTS'
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};