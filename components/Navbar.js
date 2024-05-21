import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand">Rentify</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/register" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login" className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
