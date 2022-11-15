import * as auth from "../../app/modules/auth/redux/AuthRedux";
import {env} from "../../env";
import SweetAlert2Confirm from "../../_metronic/partials/common/SweetAlert2Confirm";

export default function setupAxios(axios: any, store: any) {
    axios.defaults.headers.Accept = 'application/json'

    // Access Token varsa direkt kullan.
    axios.interceptors.request.use(
        (config: any) => {
            const {auth: {accessToken},} = store.getState()

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        },
        (err: any) => {
            Promise.reject(err);
        }
    )

    const {dispatch} = store;
    let isRefreshing = false;
    let failedRequestQueue: any[] = [];
    const processFailedRequestsQueue = (error: any, accessToken : any) => {
        failedRequestQueue.forEach(req => {
            if (error) {
                req.reject(error);
            } else {
                req.resolve(accessToken);
            }
        })

        failedRequestQueue = [];
    }

    axios.interceptors.response.use(function (response: any) {
        return response;
    }, function (error: { config: any; response: { status: number; }; }) {

        if (typeof error.response === 'undefined') {
            dispatch(auth.actions.logout())
            SweetAlert2Confirm(false, "SWEETALERT.COMMON.CONNECTION_ERROR");
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        // 401 veya 403 yanıt gelirse istekleri kuyruğa push et.
        if (error.response.status === (401 || 403) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedRequestQueue.push({resolve, reject})
                }).then(accessToken => {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const {auth: {refreshToken}} = store.getState()
            // Refresh token isteğinde bulun. Başarılı olursa orjinal isteği ve kuyruktaki istekleri tekrarla.
            return new Promise(function (resolve, reject) {
                axios.post(`${env.REACT_APP_BACKEND_API_URL}/refresh_token`, JSON.stringify({"refreshToken": refreshToken}), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res: any) => {
                        dispatch(auth.actions.refreshToken(res.data.accessToken, res.data.refreshToken))
                        axios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`
                        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
                        processFailedRequestsQueue(null, res.data.accessToken);
                        resolve(axios(originalRequest));
                    })
                    .catch((err: any) => {
                        dispatch(auth.actions.logout())
                        processFailedRequestsQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            })
        }

        return Promise.reject(error);
    });
}
