import axios from 'axios';

const axiosIntance = axios.create({});

axiosIntance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosIntance;