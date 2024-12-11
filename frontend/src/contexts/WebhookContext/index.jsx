import React, { createContext, useState, useEffect, useCallback } from 'react';

export const WebhookContext = createContext();

export const WebhookProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        return storedEvents;
    });

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addEvent = useCallback((event) => {
        console.log("Adicionando evento:", event);
        setEvents((prevEvents) => [event, ...prevEvents]);
    }, []);

    // Adiciona a lógica de reconexão ao WebSocket
    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:8080');

            ws.onopen = () => {
                console.log("Conexão WebSocket estabelecida!");
            };

            ws.onmessage = (message) => {
                const event = JSON.parse(message.data);
                console.log("Novo evento recebido via WebSocket:", event);
                addEvent(event);
            };

            ws.onclose = (event) => {
                console.log("WebSocket desconectado", event);
                setTimeout(connectWebSocket, 3000); // Reconectar após 3 segundos
            };

            ws.onerror = (error) => {
                console.error("Erro no WebSocket:", error);
            };

            return ws;
        };

        const ws = connectWebSocket();

        return () => ws.close(); // Fecha o WebSocket ao desmontar o componente
    }, [addEvent]);

    return (
        <WebhookContext.Provider value={{ events, addEvent }}>
            {children}
        </WebhookContext.Provider>
    );
};
