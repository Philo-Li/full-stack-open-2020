import diagnoses from '../../data/diagnosesTS';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

export default {
  getEntries
};