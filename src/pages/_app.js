import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

// Components
import Navbar from '../../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
