"use client";

import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Calendar,
  Users,
  BookOpen,
  PencilRuler,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex h-16 items-center justify-between text-black">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              Orbit
            </Link>
            <div className="flex items-center gap-8">
              <Link
                href="/pricing"
                className="text-sm hover:text-black/50 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/labs"
                className="text-sm hover:text-black/50 transition-colors"
              >
                Labs
              </Link>
              <Link
                to="/users/login"
                className="text-sm px-4 py-2 bg-black text-white hover:bg-black/80 transition-colors rounded-full"
              >
                Log In
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-16">
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-black">
              Prepare. <span className="inline-block">Practice. </span>
              <span className="inline-block">Succeed.</span>
            </h1>
            <p className="text-xl text-black/60 max-w-2xl mx-auto mb-12">
              Your comprehensive platform for mastering technical interviews,
              organizing study materials, and tracking your progress.
            </p>
            <Link
              to="/users/signup"
              className="group inline-flex items-center gap-2 text-lg px-8 py-4 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
          >
            <LandingFeatureCard
              icon={<Code2 />}
              title="LeetCode Tracker"
              description="Track your progress across problems and topics. Review patterns and solutions."
            />
            <LandingFeatureCard
              icon={<Calendar />}
              title="Interview Calendar"
              description="Schedule and prepare for interviews. Set reminders and track application status."
            />
            <LandingFeatureCard
              icon={<Users />}
              title="Network Manager"
              description="Organize contacts, referrals, and connections throughout your job search."
            />
            <LandingFeatureCard
              icon={<BookOpen />}
              title="Solution Library"
              description="Build your personal library of solutions with detailed explanations."
            />
            <LandingFeatureCard
              icon={<PencilRuler />}
              title="Canvas Notes"
              description="Create interactive study notes with our powerful canvas system."
            />
            <div className="relative group p-8 rounded-3xl bg-black text-white overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
              <div className="relative">
                <h3 className="text-xl font-medium mb-4">
                  More Features Coming
                </h3>
                <p className="text-white/60">
                  Stay tuned for new features and improvements.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-32 py-32 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-8">Join the Beta</h2>
              <p className="text-white/60 max-w-xl mx-auto mb-12">
                Experience our new state-of-the-art system for interview
                preparation and CS learning. Limited spots available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
                >
                  Read the Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Watch Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-32 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          ></motion.div>
        </section>
      </main>

      <footer className="mt-32 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black/40">
              © {new Date().getFullYear()} Orbit. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link
                href="/privacy"
                className="text-sm text-black/40 hover:text-black transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-black/40 hover:text-black transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LandingFeatureCard({ icon, title, description }) {
  return (
    <div className="group relative p-8 rounded-3xl bg-black/[0.02] hover:scale-105 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent group-hover:from-black/[0.02] group-hover:to-transparent rounded-3xl transition-colors" />
      <div className="relative">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black text-white mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-4">{title}</h3>
        <p className="text-black/60">{description}</p>
      </div>
    </div>
  );
}
