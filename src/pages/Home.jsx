import { ConnectButton, useConnection } from "@arweave-wallet-kit/react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const { connected } = useConnection();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background pt-16">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-4">
        <h2 className="text-4xl font-bold mb-8 text-secondary">Welcome to WeaveNet!</h2>
        <p className="text-lg mb-4 text-accent">Connect with your Arweave wallet to start creating and viewing posts.</p>
        {connected ? (
          <Link to="/view" className="px-6 py-3 bg-primary text-white rounded-full text-lg hover:bg-primary-dark">View Posts</Link>
        ) : (
          <ConnectButton />
        )}
      </main>
    </div>
  );
};

export default Home;
