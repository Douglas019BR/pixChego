import React, { useContext } from 'react';
import { WebhookContext } from '../../contexts/WebhookContext/index.jsx';

const WebhookEventList = () => {
    const { events } = useContext(WebhookContext);

    return (
        <div>
            <h2>Eventos Recebidos:</h2>
            {events.length === 0 ? (
                <p>Nenhum evento recebido ainda.</p>
            ) : (
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <strong>Tipo:</strong> {event.type || 'Não especificado'} <br />
                            <strong>Mensagem:</strong> {event.message} <br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WebhookEventList;
