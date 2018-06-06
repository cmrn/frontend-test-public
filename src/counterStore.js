import { store } from 'react-easy-state';
import { 
  addCounter, 
  getCounters, 
  incrementCounter, 
  decrementCounter, 
  deleteCounter
} from './api';

const counterStore = store({
  counters: {},
  async load() {
    const response = await getCounters();
    handleApiResponse(response);
  },
  reset() {
    counterStore.counters = {};
  },
  async add(title) {
    const response = await addCounter(title);
    handleApiResponse(response);
  },
  async increment(id) {
    const response = await incrementCounter(id);
    handleApiResponse(response);
  },
  async decrement(id) {
    const response = await decrementCounter(id);
    handleApiResponse(response);
  },
  async delete(id) {
    const response = await deleteCounter(id);
    handleApiResponse(response);
  },
});

function handleApiResponse(countersArray) {
  const countersObj = countersArray.reduce((acc, counter) => {
    acc[counter.id] = counter;
    return acc;
  }, {});
  counterStore.counters = countersObj;
};

export default counterStore;
