/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';

const NetworkVisualization = () => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.4 });
  const svgRef = useRef(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  const rawData = `Column1\tColumn2\tColumn3\tColumn4\tColumn5
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tDistrict Zoning\tData Visualization Quarter
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tDistrict Zoning\tFuture Expansion Zones
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tDistrict Zoning\tInnovation Hub
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tDistrict Zoning\tUX Research District
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tIsometric Perspective\t3D visualization with subtle tilt
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tIsometric Perspective\tLayered elements creating depth
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t1. Spatial Hierarchy\tIsometric Perspective\tRising structural elements suggesting content density
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tActive Content\tBright, energized nodes
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tActive Content\tClear wayfinding markers
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tActive Content\tNeon-lit pathways
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tFuture Expansions\tArchitectural suggestions of growth
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tFuture Expansions\tGhost structures
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tFuture Expansions\tUnlit network extensions
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tLocked Content\tDarkened structures
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tLocked Content\tLock icons indicating forthcoming access
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t2. Navigation States\tLocked Content\tVisible but inactive pathways
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tBackground Layer\tDensity mapping
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tBackground Layer\tDistrict boundary lines
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tBackground Layer\tInfrastructure suggestions
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tBackground Layer\tTechnical grid patterns
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tLighting System\tActive path illumination
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tLighting System\tAmbient glow effects
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tLighting System\tDistrict-specific color coding
Design Brief: Wrecktangle Experience Navigation System\tCore Visual Elements\t3. Environmental Design\tLighting System\tState-based highlighting
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t1. User Experience\tCreate intuitive navigation through complex content\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t1. User Experience\tEncourage exploration and discovery\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t1. User Experience\tMaintain professional portfolio context\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t1. User Experience\tProvide clear progression paths\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t2. Visual Identity\tBlend cyberpunk aesthetics with professional presentation\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t2. Visual Identity\tCreate memorable, unique navigation experience\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t2. Visual Identity\tMaintain clear information hierarchy\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t2. Visual Identity\tSupport content without overshadowing it\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t3. Technical Excellence\tMaintainable codebase\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t3. Technical Excellence\tProgressive enhancement\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t3. Technical Excellence\tScalable architecture\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Goals\t3. Technical Excellence\tSmooth, responsive performance\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Philosophy\tInterface encourages exploration and discovery\t\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Philosophy\tProject access follows skill tree progression logic\t\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Philosophy\tThe navigation system reimagines portfolio exploration as a journey through a digital cityscape, where:\tUser experiences are mapped as districts and zones\t
Design Brief: Wrecktangle Experience Navigation System\tDesign Philosophy\tVisual language borrows from tactical urban mapping\t\t
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t1. Progression System\tNavigation States\tCurrently accessible
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t1. Progression System\tNavigation States\tFuture expansion zones
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t1. Progression System\tNavigation States\tSoon-to-be-unlocked
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t1. Progression System\tSkill Tree Logic\tAchievement-based progression
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t1. Progression System\tSkill Tree Logic\tPrerequisite pathing
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t1. Progression System\tSkill Tree Logic\tSequential unlocking mechanism
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tInformation Display\tAchievement markers
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tInformation Display\tContextual tooltips
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tInformation Display\tProgress tracking
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tInformation Display\tProject previews
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tPrimary Navigation\tDistrict selection
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tPrimary Navigation\tPath highlighting
Design Brief: Wrecktangle Experience Navigation System\tInteraction Model\t2. User Interface\tPrimary Navigation\tPoint of interest markers
Design Brief: Wrecktangle Experience Navigation System\tNext Steps\tComponent architecture design\t\t
Design Brief: Wrecktangle Experience Navigation System\tNext Steps\tDetailed technical specification\t\t
Design Brief: Wrecktangle Experience Navigation System\tNext Steps\tImplementation timeline\t\t
Design Brief: Wrecktangle Experience Navigation System\tNext Steps\tInteraction pattern documentation\t\t
Design Brief: Wrecktangle Experience Navigation System\tNext Steps\tTesting protocol\t\t
Design Brief: Wrecktangle Experience Navigation System\tNext Steps\tVisual style guide\t\t
Design Brief: Wrecktangle Experience Navigation System\tProject Overview\tDevelopment of an interactive navigation system for Wrecktangle.com that merges skill tree progression mechanics with urban mapping aesthetics to create an innovative UX portfolio exploration experience.\t\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 1: Core Implementation\tBasic skill tree functionality\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 1: Core Implementation\tEssential visual elements\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 1: Core Implementation\tPrimary navigation structure\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 2: Enhanced Visualization\t3D perspective implementation\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 2: Enhanced Visualization\tAdvanced lighting effects\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 2: Enhanced Visualization\tDistrict differentiation\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 3: Content Integration\tAchievement system\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 3: Content Integration\tPortfolio content mapping\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 3: Content Integration\tProgress tracking\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 4: Polish & Optimization\tAnimation refinement\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 4: Polish & Optimization\tPerformance optimization\t
Design Brief: Wrecktangle Experience Navigation System\tProject Phases\tPhase 4: Polish & Optimization\tUser testing & iteration\t
Design Brief: Wrecktangle Experience Navigation System\tSuccess Metrics\tClear content organization\t\t
Design Brief: Wrecktangle Experience Navigation System\tSuccess Metrics\tContent accessibility\t\t
Design Brief: Wrecktangle Experience Navigation System\tSuccess Metrics\tEngaging interaction patterns\t\t
Design Brief: Wrecktangle Experience Navigation System\tSuccess Metrics\tIntuitive user navigation\t\t
Design Brief: Wrecktangle Experience Navigation System\tSuccess Metrics\tMemorable user experience\t\t
Design Brief: Wrecktangle Experience Navigation System\tSuccess Metrics\tTechnical performance\t\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t1. Core Technologies\tCSS for styling and animations\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t1. Core Technologies\tReact.js for component architecture\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t1. Core Technologies\tSVG for primary visualization\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t1. Core Technologies\tTailwind for utility classes\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t2. Key Features\tDynamic content loading\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t2. Key Features\tInteractive elements\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t2. Key Features\tResponsive scaling\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t2. Key Features\tSmooth transitions\t
Design Brief: Wrecktangle Experience Navigation System\tTechnical Implementation\t2. Key Features\tState management for progression\t`;

  const categories = {
    'Core Visual Elements': { color: 'rgb(14 165 233)', level: 1 },
    'Design Philosophy': { color: 'rgb(168 85 247)', level: 1 },
    'Interaction Model': { color: 'rgb(34 197 94)', level: 1 },
    'Technical Implementation': { color: 'rgb(239 68 68)', level: 1 },
    'Design Goals': { color: 'rgb(234 179 8)', level: 1 },
    'Project Phases': { color: 'rgb(56 189 248)', level: 1 },
    'Success Metrics': { color: 'rgb(236 72 153)', level: 1 },
    'Next Steps': { color: 'rgb(168 162 158)', level: 1 }
  };

  const calculatePosition = (index, total, radius = 350, centerX = 400, centerY = 400) => {
    const angle = (index * 2 * Math.PI / total);
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const calculateSecondaryPosition = (parentPos, index, total, radius = 120) => {
    const baseAngle = Math.atan2(parentPos.y - 400, parentPos.x - 400);
    const spread = Math.PI / 2;
    const angle = baseAngle - spread/2 + (spread * index / Math.max(1, total-1));
    return {
      x: parentPos.x + Math.cos(angle) * radius,
      y: parentPos.y + Math.sin(angle) * radius
    };
  };

  const calculateTertiaryPosition = (parentPos, index, total, radius = 60) => {
    const baseAngle = Math.atan2(parentPos.y - 400, parentPos.x - 400);
    const spread = Math.PI / 3;
    const angle = baseAngle - spread/2 + (spread * index / Math.max(1, total-1));
    return {
      x: parentPos.x + Math.cos(angle) * radius,
      y: parentPos.y + Math.sin(angle) * radius
    };
  };

  const calculateLeafPosition = (parentPos, index, total, radius = 40) => {
    const baseAngle = Math.atan2(parentPos.y - 400, parentPos.x - 400);
    const spread = Math.PI / 4;
    const angle = baseAngle - spread/2 + (spread * index / Math.max(1, total-1));
    return {
      x: parentPos.x + Math.cos(angle) * radius,
      y: parentPos.y + Math.sin(angle) * radius
    };
  };

  useEffect(() => {
    const processData = (rawData) => {
      const lines = rawData.split('\n').slice(1); // Skip header
      const parsed = lines.map(line => {
        const [root, category, subcategory, tertiary, leaf] = line.split('\t');
        return { root, category, subcategory, tertiary, leaf };
      });

      const nodes = [];
    const links = [];

    nodes.push({
      id: 'design-brief',
      label: 'Design Brief',
      x: 400,
      y: 400,
      size: 40,
      level: 0,
      color: 'white'
    });

    const categoryOrder = [
      'Core Visual Elements',
      'Design Philosophy',
      'Interaction Model',
      'Technical Implementation',
      'Design Goals',
      'Project Phases',
      'Success Metrics',
      'Next Steps'
    ];

    categoryOrder.forEach((category, index) => {
      const pos = calculatePosition(index, categoryOrder.length);
      const categoryId = _.kebabCase(category);

      nodes.push({
        id: categoryId,
        label: category,
        ...pos,
        size: 25,
        level: 1,
        color: categories[category].color
      });

      links.push({
        source: 'design-brief',
        target: categoryId,
        strength: 2,
        color: categories[category].color
      });

      // Process subcategories
      const subcategories = [...new Set(
        parsed
          .filter(row => row.category === category)
          .map(row => row.subcategory)
      )].filter(Boolean);

      subcategories.forEach((subcategory, subIndex) => {
        const subPos = calculateSecondaryPosition(pos, subIndex, subcategories.length);
        const subId = _.kebabCase(subcategory);

        nodes.push({
          id: subId,
          label: subcategory,
          ...subPos,
          size: 15,
          level: 2,
          color: categories[category].color,
          parentId: categoryId
        });

        links.push({
          source: categoryId,
          target: subId,
          strength: 1.5,
          color: categories[category].color
        });

        // Process tertiary items
        const tertiaryItems = [...new Set(
          parsed
            .filter(row => row.category === category && row.subcategory === subcategory)
            .map(row => row.tertiary)
        )].filter(Boolean);

        tertiaryItems.forEach((tertiary, tertiaryIndex) => {
          const tertiaryPos = calculateTertiaryPosition(subPos, tertiaryIndex, tertiaryItems.length);
          const tertiaryId = _.kebabCase(tertiary);

          nodes.push({
            id: tertiaryId,
            label: tertiary,
            ...tertiaryPos,
            size: 8,
            level: 3,
            color: categories[category].color,
            parentId: subId,
            grandParentId: categoryId
          });

          links.push({
            source: subId,
            target: tertiaryId,
            strength: 1,
            color: categories[category].color
          });

          // Process leaf nodes
          const leafItems = parsed
            .filter(row =>
              row.category === category &&
              row.subcategory === subcategory &&
              row.tertiary === tertiary &&
              row.leaf
            )
            .map(row => row.leaf)
            .filter(Boolean);

          leafItems.forEach((leaf, leafIndex) => {
            const leafPos = calculateLeafPosition(tertiaryPos, leafIndex, leafItems.length);
            const leafId = `${tertiaryId}-${leafIndex}`;

            nodes.push({
              id: leafId,
              label: leaf,
              ...leafPos,
              size: 4,
              level: 4,
              color: categories[category].color,
              parentId: tertiaryId,
              grandParentId: subId,
              rootParentId: categoryId
            });

            links.push({
              source: tertiaryId,
              target: leafId,
              strength: 0.5,
              color: categories[category].color,
              dashed: true
            });
          });
        });
      });
    });

    return { nodes, links };
  };

    const { nodes: generatedNodes, links: generatedLinks } = processData(rawData);
    setNodes(generatedNodes);
    setLinks(generatedLinks);
}, []);
  const handleNodeHover = (nodeId) => {
    setHoveredNode(nodeId);
    setTooltipVisible(true);
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    setTooltipVisible(false);
  };

  const handleMouseMove = (e) => {
    if (hoveredNode) {
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    setTooltipVisible(false);
  };
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const scaleChange = delta > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(2, transform.scale * scaleChange));

    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTransform(prev => ({
      scale: newScale,
      x: x - (x - prev.x) * scaleChange,
      y: y - (y - prev.y) * scaleChange
    }));
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePanMove = (e) => {
    if (isDragging.current) {
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;

      setTransform(prev => ({
        ...prev,
        x: prev.x + dx,
        y: prev.y + dy
      }));

      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="bg-gray-950 relative rounded-lg overflow-hidden border border-gray-800 w-full" style={{ height: '90vh' }}>
      <svg
          ref={svgRef}
          className="w-full h-full touch-none"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid meet"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handlePanMove}
          onMouseUp={handlePanEnd}
          onMouseLeave={handlePanEnd}
      >
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <pattern id="concentricCircles" width="1000" height="800" patternUnits="userSpaceOnUse">
              {[100, 200, 300].map((radius, i) => (
                  <circle
                      key={`circle-${i}`}
                      cx="400"
                      cy="400"
                      r={radius}
                      fill="none"
                      stroke="rgb(51 65 85)"
                      strokeWidth="0.5"
                      opacity="0.2"
                  />
              ))}
            </pattern>

            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgb(51 65 85)"
                  strokeWidth="0.5"
                  opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#grid)"/>
          <rect width="800" height="800" fill="url(#concentricCircles)"/>

          {links.map((link, i) => {
            const source = nodes.find(n => n.id === link.source);
            const target = nodes.find(n => n.id === link.target);

            if (!source || !target) return null;

            return (
                <line
                    key={`link-${i}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={link.color}
                    strokeWidth={link.strength}
                    opacity={
                      hoveredNode ?
                          (hoveredNode === source.id || hoveredNode === target.id ? 0.8 : 0.1)
                          : 0.4
                    }
                    strokeDasharray={link.dashed ? "4,4" : "none"}
                />
            );
          })}

          {nodes.map((node) => (
              <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => handleNodeHover(node.id)}
                  onMouseLeave={handleNodeLeave}
              >
                <circle
                    r={node.size + 4}
                    fill={`${node.color}33`}
                    filter="url(#glow)"
                />

                <circle
                    r={node.size}
                    fill={node.color}
                    stroke={hoveredNode === node.id ? 'white' : 'rgb(51 65 85)'}
                    strokeWidth="2"
                    className="transition-all duration-300"
                />

                <text
                    y={node.size + 20}
                    textAnchor="middle"
                    fill="white"
                    className="text-sm font-medium pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
          ))}
        </g>
      </svg>

      {tooltipVisible && hoveredNode && (
          <div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-600 pointer-events-none"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              {nodes.find(n => n.id === hoveredNode)?.label}
            </h3>
            <div className="text-slate-300 font-mono text-sm space-y-1">
            <p>ID: {hoveredNode}</p>
            <p>Position: ({Math.round(nodes.find(n => n.id === hoveredNode)?.x || 0)},
                         {Math.round(nodes.find(n => n.id === hoveredNode)?.y || 0)})</p>
            <p>Level: {nodes.find(n => n.id === hoveredNode)?.level}</p>
            <p>Parent: {nodes.find(n => n.id === hoveredNode)?.parentId || 'none'}</p>
            {nodes.find(n => n.id === hoveredNode)?.parentPos && (
              <p>Parent Pos: ({Math.round(nodes.find(n => n.id === hoveredNode)?.parentPos?.x || 0)},
                             {Math.round(nodes.find(n => n.id === hoveredNode)?.parentPos?.y || 0)})</p>
            )}
            {nodes.find(n => n.id === hoveredNode)?.grandParentId && (
              <p>Grand Parent: {nodes.find(n => n.id === hoveredNode)?.grandParentId}</p>
            )}
            {nodes.find(n => n.id === hoveredNode)?.rootParentId && (
              <p>Root: {nodes.find(n => n.id === hoveredNode)?.rootParentId}</p>
            )}
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className="p-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700"
          onClick={() => setTransform(prev => ({ ...prev, scale: Math.min(2, prev.scale * 1.2) }))}
        >
          +
        </button>
        <button
          className="p-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700"
          onClick={() => setTransform(prev => ({ ...prev, scale: Math.max(0.1, prev.scale * 0.8) }))}
        >
          -
        </button>
        <button
          className="p-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700"
          onClick={() => setTransform({ x: 0, y: 0, scale: 0.4 })}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default NetworkVisualization;

