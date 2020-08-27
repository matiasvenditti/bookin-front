import {baseURL} from "../../../src/services/EnvironmentService";
import axios, {AxiosResponse} from 'axios';

const instance = axios.create({baseUrl: baseURL})
