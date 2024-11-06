import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Move, Compass, ArrowLeft, Star, Map } from 'lucide-react';

const ProjectMapBuilder = () => {
  const [currentLocation] = useState('Landing Page');
  const [featuresUnlocked] = useState(2);
  
  const locations = [
    {
      id: 'landing',
      title: 'Landing Page',
      description: 'Where our story begins',
      feature: 'Dynamic Welcome',
      status: 'active',
      x: 300,
      y: 300
    },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      description: 'Visual memories unfold',
      feature: 'Image Grid System',
      status: 'unlocked',
      x: 600,
      y: 300
    },
    {
      id: 'blog',
      title: 'Blog Section',
      description: 'Tales from the journey',
      feature: 'Content Management',
      status: 'locked',
      x: 900,
      y: 300
    }
  ];

  const storylines = [
    {
      id: 'main',
      title: 'Main Quest',
      progress: '2 of 4 locations discovered',
      active: true
    },
    {
      id: 'side',
      title: 'Side Story',
      progress: 'New path available',
      active: false
    },
    {
      id: 'skill',
      title: 'Skill Path',
      progress: 'New path available',
      active: false
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
          <span>Interactive Project Map Builder</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Current Storyline: Main Quest</span>
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

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Grid Background */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%">
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2a3144" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Location Cards */}
          <div className="absolute inset-0">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-64 ${
                  location.status === 'active' ? 'border-blue-500 text-blue-400' :
                  location.status === 'unlocked' ? 'border-amber-500 text-amber-400' :
                  'border-gray-600 text-gray-400'
                }`}
                style={{ left: location.x, top: location.y }}
              >
                <div className={`border rounded-lg p-4 backdrop-blur-sm ${
                  location.status === 'active' ? 'bg-blue-500 bg-opacity-5 border-blue-500' :
                  location.status === 'unlocked' ? 'bg-amber-500 bg-opacity-5 border-amber-500' :
                  'bg-gray-800 border-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{location.title}</span>
                  </div>
                  <div className="mt-1 text-sm opacity-75">{location.description}</div>
                  <div className="mt-2 text-xs flex items-center gap-2">
                    <Map className="w-3 h-3" />
                    <span>{location.feature}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-gray-800 p-4">
          <h2 className="text-lg font-medium mb-4">Scout's Journal</h2>
          <div className="space-y-3">
            {storylines.map((storyline) => (
              <div
                key={storyline.id}
                className={`p-3 rounded-lg ${
                  storyline.active ? 'bg-blue-500 bg-opacity-20' : 'bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  <span>{storyline.title}</span>
                </div>
                <div className="text-xs mt-1 text-gray-400">{storyline.progress}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 h-14 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Current Location: {currentLocation}</span>
          <span className="text-blue-400">Features Unlocked: {featuresUnlocked}</span>
        </div>
        <button className="px-4 py-1.5 bg-blue-500 rounded-md">Mark Location</button>
      </div>
    </div>
  );
};

export default ProjectMapBuilder;