import React from 'react';
import { Network, Brain, Database, GitBranch } from 'lucide-react';

const WreckLogo = () => (
  <div className="relative w-24 h-24">
    <div className="absolute inset-0 border-4 border-blue-500 transform rotate-3" />
    <div className="absolute inset-0 border-4 border-red-500 transform -rotate-2 opacity-50" />
    <div className="absolute inset-0 border-4 border-green-500 transform rotate-1 opacity-50" />
    <div className="absolute inset-2 bg-black flex items-center justify-center">
      <span className="text-white font-bold text-xl">W</span>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center mb-16">
          <WreckLogo />
          <h1 className="mt-8 text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Wrecktangle
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Deconstructing Knowledge Networks
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Network Analysis */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <Network className="h-8 w-8 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Network Analysis</h2>
            </div>
            <p className="text-gray-300">
              Explore interconnected research concepts through dynamic 3D visualization
            </p>
          </div>

          {/* AI Integration */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="h-8 w-8 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">AI Integration</h2>
            </div>
            <p className="text-gray-300">
              Intelligent agents guiding your exploration through vast knowledge spaces
            </p>
          </div>

          {/* Data Processing */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <Database className="h-8 w-8 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Data Processing</h2>
            </div>
            <p className="text-gray-300">
              Automated extraction and analysis of research documents
            </p>
          </div>

          {/* Graph Analytics */}
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-orange-500 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <GitBranch className="h-8 w-8 text-orange-400" />
              <h2 className="text-xl font-semibold text-white">Graph Analytics</h2>
            </div>
            <p className="text-gray-300">
              Deep insights through advanced graph algorithms and metrics
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}