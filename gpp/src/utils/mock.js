import mockAdapter from 'axios-mock-adapter'; 
import axios from './axios';

const instance = new mockAdapter(axios, {delayResponse: 0 });

export default instance;
