import { io } from 'socket.io-client';

const URL = 'http://18.119.165.24/:80';

export const socket = io(URL);