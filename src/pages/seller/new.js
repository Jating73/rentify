import { useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

export default function NewProperty() {
    const [formData, setFormData] = useState({
        place: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: '',
        description: '',
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
        const response = await fetch('/api/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push('/seller/dashboard');
        } else {
            const data = await response.json();
            alert(data.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Post a New Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="place" className="form-label">Place</label>
                    <input type="text" className="form-control" id="place" name="place" value={formData.place} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="area" className="form-label">Area (sq ft)</label>
                    <input type="number" className="form-control" id="area" name="area" value={formData.area} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                    <input type="number" className="form-control" id="bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                    <input type="number" className="form-control" id="bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nearbyHospitals" className="form-label">Nearby Hospitals</label>
                    <input type="text" className="form-control" id="nearbyHospitals" name="nearbyHospitals" value={formData.nearbyHospitals} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="nearbyColleges" className="form-label">Nearby Colleges</label>
                    <input type="text" className="form-control" id="nearbyColleges" name="nearbyColleges" value={formData.nearbyColleges} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Post Property</button>
            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    return { props: { session } };
}
