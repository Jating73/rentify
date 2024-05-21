import { useState, useEffect } from 'react';

export default function BuyerDashboard() {
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        place: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
    });

    useEffect(() => {
        fetch('/api/properties')
            .then((res) => res.json())
            .then((data) => setProperties(data));
    }, []);

    const handleInterest = (sellerId) => {
        // Show seller details
        fetch(`/api/users/${sellerId}`)
            .then((res) => res.json())
            .then((data) => alert(`Seller Details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredProperties = properties.filter((property) => {
        return (
            (!filters.place || property.place.includes(filters.place)) &&
            (!filters.bedrooms || property.bedrooms == filters.bedrooms) &&
            (!filters.bathrooms || property.bathrooms == filters.bathrooms) &&
            (!filters.area || property.area == filters.area)
        );
    });

    return (
        <div className="container mt-5">
            <h2>All Properties</h2>
            <div className="mb-3">
                <input type="text" name="place" placeholder="Place" value={filters.place} onChange={handleFilterChange} className="form-control" />
                <input type="number" name="bedrooms" placeholder="Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className="form-control" />
                <input type="number" name="bathrooms" placeholder="Bathrooms" value={filters.bathrooms} onChange={handleFilterChange} className="form-control" />
                <input type="number" name="area" placeholder="Area" value={filters.area} onChange={handleFilterChange} className="form-control" />
            </div>
            <div className="list-group">
                {filteredProperties.map((property) => (
                    <div key={property._id} className="list-group-item">
                        <h5>{property.place}</h5>
                        <p>{property.description}</p>
                        <button onClick={() => handleInterest(property.sellerId)} className="btn btn-primary">I'm Interested</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
