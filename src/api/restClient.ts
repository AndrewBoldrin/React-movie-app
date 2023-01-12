import axios from 'axios';
import { API } from './config';

export const restClient = axios.create({baseURL: API.baseURL});