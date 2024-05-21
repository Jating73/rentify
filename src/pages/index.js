import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('/api/properties');
      const data = await response.json()
      setProperties(data)
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="List of all properties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Properties</h1>
        <ul>
          {properties.map((property) => (
            <li key={property._id}>
              <Link href={`/property/${property._id}`}>
                <h2>{property.place}</h2>
                <p>{property.description}</p>
                <p>Area: {property.area} sq ft</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>Nearby Hospitals: {property.nearby_hospitals}</p>
                <p>Nearby Colleges: {property.nearby_colleges}</p>
                <img src={property.images[0]} alt={`Image of ${property.place}`} width="200" />
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Home;