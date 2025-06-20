import { DorksHeaders, Methods, ContentTypes } from './types';
import { DEFAULT_HEADERS, API_URL, WEBSOCKET_URL } from '../constants';
import { generateDeviceId, generateSignature } from '../utils/helpers';
import { getDorksErrorByStatus } from './errors';

export class Client {
    userId?: string;
    sessionId?: string;
    deviceId: string;
    dorksHeaders: DorksHeaders;

    constructor(sessionId?: string, userId?: string, deviceId?: string) {
        this.userId = userId;
        this.deviceId = deviceId || generateDeviceId();
        this.sessionId = sessionId;
        this.dorksHeaders = { ...DEFAULT_HEADERS }
    }

    private configureHeaders(payload?: Record<string, any>, contentType?: ContentTypes): DorksHeaders {
        let configuredHeaders = { ...this.dorksHeaders }
        configuredHeaders['Content-Type'] = contentType || 'application/json';

        if (payload) {
            payload['timestamp'] = Math.floor(Date.now() / 1000) * 1000;
            configuredHeaders['NDC-MSG-SIG'] = generateSignature(JSON.stringify(payload));
        }

        return configuredHeaders;
    }

    async makeRequest(method: Methods, endpoint: string, payload?: Record<string, any>, contentType?: ContentTypes): Promise<any> {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: method,
            headers: this.configureHeaders(payload, contentType),
            body: JSON.stringify(payload)
        })
        
        return response.ok ? await response.json() : getDorksErrorByStatus(response.status, await response.text())
    }

    async connectWebSocket() {
        // TODO: make connect with websocket from core.sockets.ts
    }

}