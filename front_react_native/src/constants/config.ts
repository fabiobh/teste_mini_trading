/**
 * IMPORTANTE: Altere o IP abaixo para o IP local da sua máquina.
 * Você pode encontrá-lo usando 'ipconfig' (Windows) ou 'ifconfig' (Mac/Linux).
 */
const API_IP = '192.168.0.71'; 

export const CONFIG = {
    BASE_URL: `http://${API_IP}:8000/api`,
    TIMEOUT: 10000,
};
