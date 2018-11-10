import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://css-helper.firebaseio.com/',
});

export default instance;