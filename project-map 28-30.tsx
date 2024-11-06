import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Move, Compass, ArrowLeft, Heart, Map, FileText, Settings } from 'lucide-react';

const SafeHouse = () => {
  const [activeZone, setActiveZone] = useState('overview');
  
  const baseSkills = [
    {
      id: 'html-basics',
      name: 'HTML Fundamentals',
      type: 'foundational',
      difficulty: 'starter',
      description: 'Structure and semantics',
      icon: FileText
    },
    {
      id: 'css-basics',
      name: 'CSS Basics',
      type: 'foundational',
      difficulty: 'starter',
      description: 'Basic styling and layout',
      icon: Settings
    },
    {
      id: 'design-principles',
      name: 'Design Principles',
      type: 'foundational',
      difficulty: 'starter',
      description: 'Core visual concepts',
      icon: Map
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#1a1f2a] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-800 rounded-md">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-blue-400" />
            <span>Safe House - Skills Base</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Security Level: Starter</span>
          <button className="px-4 py-1.5 bg-gray-800 rounded-md">Preview</button>
          <button className="px-4 py-1.5 bg-gray-800 rounded-md">Code</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="flex flex-col gap-2 p-4 border-r border-gray-800">
          <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
            <Move className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
            <Compass className="w-5 h-5" />
          </button>
        </div>

        {/* Safe House Interior */}
        <div className="flex-1 relative">
          {/* Background Grid with Glow */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%">
              <defs>
                <radialGradient id="safeZone" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
                </radialGradient>
                <pattern id="smallGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#2a3144" strokeWidth="0.5" />
                </pattern>
                <pattern id="grid" width="150" height="150" patternUnits="userSpaceOnUse">
                  <rect width="150" height="150" fill="url(#smallGrid)" />
                  <path d="M 150 0 L 0 0 0 150" fill="none" stroke="#2a3144" strokeWidth="1" />
                </pattern>
              </defs>
              
              {/* Manhattan-style map layer */}
              <g className="map-base" opacity="0.3">
                {/* Main avenues */}
                <path d="M 200 0 L 200 1000 M 400 0 L 400 1000 M 600 0 L 600 1000" 
                      stroke="#0891b2" strokeWidth="1" />
                
                {/* Cross streets */}
                <path d="M 0 200 L 1000 200 M 0 400 L 1000 400 M 0 600 L 1000 600" 
                      stroke="#0891b2" strokeWidth="1" />
                
                {/* Diagonal routes */}
                <path d="M 100 0 L 500 900 M 300 0 L 700 900" 
                      stroke="#d946ef" strokeWidth="1" opacity="0.5" />
                
                {/* District boundaries */}
                <path d="M 150 100 Q 300 150 450 100 T 750 150" 
                      stroke="#0891b2" strokeWidth="1" fill="none" />
                <path d="M 50 300 Q 200 350 350 300 T 650 350" 
                      stroke="#0891b2" strokeWidth="1" fill="none" />
              </g>

              {/* Original grid overlay */}
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="50%" cy="50%" r="200" fill="url(#safeZone)" />
            </svg>
          </div>

          {/* Safe Zone Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 relative">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full border-2 border-blue-500 bg-blue-500 bg-opacity-10 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-blue-400" />
                </div>
              </div>

              {/* Base Skills */}
              {baseSkills.map((skill, index) => {
                const angle = (index * 2 * Math.PI) / baseSkills.length;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={skill.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  >
                    <div className="w-40 p-4 rounded-lg border border-blue-500 bg-gray-800 bg-opacity-90 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-blue-400">
                        <skill.icon className="w-4 h-4" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="text-sm mt-1 text-gray-400">{skill.description}</div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{skill.type}</span>
                        <button className="px-2 py-1 text-xs bg-blue-500 rounded">Start</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Safe House Info */}
        <div className="w-64 bg-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">Base of Operations</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-blue-400" />
                <span>Security Status</span>
              </div>
              <div className="text-xs mt-1 text-gray-400">Safe Zone Active</div>
              <div className="mt-2 h-1 bg-gray-600 rounded">
                <div className="h-full w-1/4 bg-blue-500 rounded" />
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-amber-400" />
                <span>Available Missions</span>
              </div>
              <div className="text-xs mt-1 text-gray-400">3 starter missions ready</div>
            </div>

            <div className="p-3 rounded-lg bg-gray-700">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                <span>Base Skills</span>
              </div>
              <div className="text-xs mt-1 text-gray-400">Foundation skills unlocked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 h-14 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Location: Skills Base</span>
          <span className="text-blue-400">Security Level: Safe</span>
        </div>
        <button className="px-4 py-1.5 bg-blue-500 rounded-md">Begin Training</button>
      </div>
    </div>
  );
};

export default SafeHouse;