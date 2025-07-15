"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from './components/Loader';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const DarkModeToggle = () => {
  const toggle = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <label className="absolute top-6 right-6 inline-flex items-center cursor-pointer z-10">
      <input type="checkbox" onChange={toggle} className="sr-only peer" />
      <div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-purple-600 relative transition-all duration-300">
        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1 peer-checked:translate-x-6 transform transition-transform" />
      </div>
    </label>
  );
};

export default function Home() {
  const [blog, setBlog] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const wordCount = blog.trim().split(/\s+/).filter(Boolean).length;
  const summaryWordCount = summary.trim().split(/\s+/).filter(Boolean).length;

  const handleSummarise = async () => {
    if (!blog.trim()) {
      setSummary("⚠️ Please paste blog content first!");
      return;
    }

    if (wordCount > 1000) {
      setSummary("⚠️ Blog content exceeds 1000 words. Please shorten it.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/summarise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: blog }),
      });

      const data = await response.json();

      if (!data.summary) {
        setSummary("⚠️ No summary returned. Please try again.");
      } else {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error(error);
      setSummary("❌ Could not connect to backend or API failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBlog('');
    setSummary('');
  };

  return (
    <main className={`min-h-screen ${inter.className} bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] dark:from-[#0a0a0a] dark:to-[#0a0a0a] text-white font-sans transition-all duration-500`}>
      <DarkModeToggle />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 py-16"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl p-8 space-y-8 text-center ring-1 ring-purple-500/30"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* ✅ Lottie Animation (No TS Error) */}
          <div className="flex justify-center">
            {typeof window !== 'undefined' &&
              React.createElement('lottie-player', {
                src: 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json',
                background: 'transparent',
                speed: '1',
                loop: true,
                autoplay: true,
                style: { width: '180px', height: '180px' },
              })}
          </div>

          <motion.h1
            className="text-5xl font-extrabold tracking-tight relative after:block after:w-24 after:h-1 after:bg-purple-500 after:mx-auto after:mt-3 drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            📝 Blog Summariser
          </motion.h1>

          <motion.textarea
            placeholder="Paste your blog content here..."
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
            className="w-full h-64 p-5 sm:p-6 border border-purple-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white/10 dark:bg-gray-900 resize-none text-base sm:text-lg placeholder:italic placeholder:text-gray-300 text-white focus:scale-[1.01] transition-transform duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          <div className="text-sm sm:text-base text-purple-200">
            📊 Word Count: {wordCount} / 1000
          </div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleSummarise}
              disabled={wordCount > 1000}
              className={`w-full sm:w-auto min-h-[44px] px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-gradient-to-br transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                wordCount > 1000 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? '⏳ Summarising...' : '✨ Summarise'}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleClear}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 border border-gray-400 dark:border-gray-600 text-white bg-transparent font-medium rounded-xl shadow hover:bg-white/20 hover:border-purple-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              ❌ Clear Input
            </motion.button>
          </motion.div>

          {loading && <Loader />}

          {summary && !loading && (
            <motion.div
              className="mt-10 pt-8 border-t p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/40 shadow-xl text-gray-100 text-left transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-3 text-center">🧾 Summary:</h2>
              <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>

              <p className="mt-4 text-right text-purple-300 text-sm">📌 Summary Word Count: {summaryWordCount}</p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigator.clipboard.writeText(summary)}
                className="mt-5 block mx-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                📋 Copy Summary
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        <footer className="mt-10 text-sm text-center text-gray-400">
          🚀 Powered by Transformers & Next.js
        </footer>
      </motion.div>
    </main>
  );
}
