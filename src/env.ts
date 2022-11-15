declare global {
    interface Window {
        env: any
    }
}

// Override Edilecek Değişkenler'in tipi burada belirtilmeli.
type EnvType = {
    REACT_APP_BACKEND_API_URL: string,
    REACT_APP_BACKEND_API_PORT_URL: string,
}
export const env: EnvType = { ...process.env, ...window.env }