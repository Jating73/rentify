import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        user_type: 'buyer', // default to buyer
        password: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            router.push('/login');
        } else {
            const data = await response.json();
            alert(data.message);
        }
    };

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <div className="container mt-5">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="user_type" className="form-label">Register as</label>
                        <select className="form-control" id="user_type" name="user_type" value={formData.user_type} onChange={handleChange} required>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </>
    );
}
