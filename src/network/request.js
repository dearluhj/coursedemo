import axios from 'axios';
import store from '../store';

const BASE_URL = '/api';
// const BASE_URL = 'http://127.0.0.1';

export default function instance(config) {
	return new Promise((resolve, reject) => {
		const as = axios.create({
			baseURL: BASE_URL,
			withCredentials: true,
			crossDomain: true
		});

		//拦截器
		//请求拦截
		as.interceptors.request.use(config => {
			if (store.state.token) {
				config.headers.Authorization = sessionStorage.getItem('token');
			}
			return config;
		}, err => {
			return Promise.reject(err)
		})
		// //响应拦截
		// as.interceptors.response.use(res => {
		// 	// console.log(res);
		// 	return res.data
		// }, err => {
		// 	// console.log(err);
		// })


		as(config)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	})
}