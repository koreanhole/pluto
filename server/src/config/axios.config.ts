import axios from 'axios';

const TIME_OUTS = 5000;

export const axiosInstance = axios.create({
  timeout: TIME_OUTS,
  timeoutErrorMessage: `axios timeout ${TIME_OUTS}ms exceed`,
});
