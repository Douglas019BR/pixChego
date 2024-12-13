import React, { useState } from 'react';

const PaymentForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        externalReference: '',
        title: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log('Payment created:', result);
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    return (
        <div>
            <button
                style={{ marginTop: '20px', backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}
                onClick={() => setShowForm(!showForm)}
            >
                Novo Pagamento
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="externalReference"
                        placeholder="External Reference"
                        value={formData.externalReference}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                        Enviar
                    </button>
                </form>
            )}
        </div>
    );
};

export default PaymentForm;
