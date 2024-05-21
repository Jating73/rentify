import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SellerDashboard() {
    const [properties, setProperties] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            fetch('/api/properties/seller')
                .then((res) => res.json())
                .then((data) => setProperties(data));
        }
    }, [session]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this property?')) {
            await fetch(`/api/properties/${id}`, { method: 'DELETE' });
            setProperties(properties.filter((property) => property._id !== id));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Your Properties</h2>
            <div className="list-group">
                {properties.map((property) => (
                    <div key={property._id} className="list-group-item">
                        <h5>{property.place}</h5>
                        <p>{property.description}</p>
                        <button onClick={() => router.push(`/seller/edit/${property._id}`)} className="btn btn-primary">Edit</button>
                        <button onClick={() => handleDelete(property._id)} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
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