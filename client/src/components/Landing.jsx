import FeatureCard from "./FeatureCard";
import { Link } from "react-router";
export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <div className="text-3xl font-semibold text-white">Orbit</div>
          </Link>
          <div className="flex gap-3">
            <Link to="/users/signup">
              <button
                type="button"
                className="hover:bg-gray-700 text-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
              >
                Sign Up
              </button>
            </Link>
            <Link to="/users/login">
              <button className=" hover:bg-gray-700 text-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow">
                Sign In
              </button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
          Your Contacts, Organized
        </h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
          Streamline your connections. Elevate your networking. Experience
          Orbit, the future of contact management.
        </p>
        <Link to="/contacts">
          <button className=" hover:bg-gray-700 flex items-center justify-center text-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow ">
            Get Started
          </button>
        </Link>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <FeatureCard
            title="Centralize"
            description="Keep all your contacts in one secure, accessible place."
          />
          <FeatureCard
            title="Organize"
            description="Categorize and tag contacts for effortless management."
          />
          <FeatureCard
            title="Connect"
            description="Seamlessly integrate with your favorite tools and apps."
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 Orbit. All rights reserved.
          </p>
          <div className="space-x-6">
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
