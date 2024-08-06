"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Types
interface Node {
  id: string;
  name: string;
  type: 'main' | 'api' | 'feature' | 'ux' | 'agent';
  position: THREE.Vector3;
  details: string;
  mesh?: THREE.Mesh;
}

interface Link {
  source: string;
  target: string;
  line?: THREE.Line;
}

interface ThreeDVisualizationProps {
  projectId: string;
}

// Utility functions
const getColorForNodeType = (type: Node['type']): number => {
  switch (type) {
    case 'main': return 0xff0000;
    case 'api': return 0x00ff00;
    case 'feature': return 0x0000ff;
    case 'ux': return 0xffff00;
    case 'agent': return 0xff00ff;
    default: return 0x0077ff;
  }
};

const createNodeGeometry = (type: Node['type']): THREE.BufferGeometry => {
  switch (type) {
    case 'main': return new THREE.SphereGeometry(15, 32, 32);
    case 'api': return new THREE.BoxGeometry(25, 25, 25);
    case 'feature': return new THREE.ConeGeometry(15, 30, 32);
    case 'ux': return new THREE.TorusGeometry(10, 3, 16, 100);
    case 'agent': return new THREE.DodecahedronGeometry(15);
    default: return new THREE.IcosahedronGeometry(15);
  }
};

const ThreeDVisualization: React.FC<ThreeDVisualizationProps> = ({ projectId }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [nodes, setNodes] = useState<Record<string, Node>>({});
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server-side
    if (!mountRef.current) return;

    // Scene setup
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    scene.background = new THREE.Color(0xeeeeee);
    camera.position.set(0, 400, 800);
    renderer.setSize(width, height);

    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;

    // Initialize nodes and links
    const initialNodes = parseMermaidDiagram(projectId);
    setNodes(initialNodes);
    const initialLinks = createLinks(initialNodes);
    setLinks(initialLinks);

    // Create visual elements
    createNodesAndLinks(initialNodes, initialLinks, scene);

    // Event listeners
    window.addEventListener('resize', handleResize);
    renderer.domElement.addEventListener('click', handleMouseClick);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleMouseClick);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [projectId]);

  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  const handleMouseClick = (event: MouseEvent) => {
    if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;

    const mouse = new THREE.Vector2(
      (event.clientX / mountRef.current.clientWidth) * 2 - 1,
      -(event.clientY / mountRef.current.clientHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);
    const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const clickedNode = Object.values(nodes).find(node => node.mesh === intersectedObject);
      if (clickedNode) {
        setSelectedNode(clickedNode);
        highlightNodeAndLinks(clickedNode);
      }
    } else {
      setSelectedNode(null);
      resetHighlights();
    }
  };

  const parseMermaidDiagram = (projectId: string): Record<string, Node> => {
    console.log(`Generating 3D visualization for project ${projectId}`);
    return {
      'A': { id: 'A', name: `Project ${projectId} Structure`, type: "main", position: new THREE.Vector3(0, 50, 0), details: "Main application structure and key features." },
      'B': { id: 'B', name: "User Interface", type: "ux", position: new THREE.Vector3(-100, 0, 50), details: "User interface components and design." },
      'C': { id: 'C', name: "API Integration", type: "api", position: new THREE.Vector3(100, 0, 50), details: "Integration with external APIs and services." },
      'D': { id: 'D', name: "Data Processing", type: "feature", position: new THREE.Vector3(0, -50, 100), details: "Data processing and analysis features." },
      'E': { id: 'E', name: "AI Agent", type: "agent", position: new THREE.Vector3(0, 100, -50), details: "AI-powered assistant and automation features." }
    };
  };

  const createLinks = (nodes: Record<string, Node>): Link[] => {
    return [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'A', target: 'D' },
      { source: 'A', target: 'E' },
      { source: 'B', target: 'C' },
      { source: 'C', target: 'D' },
      { source: 'D', target: 'E' }
    ];
  };

  const createNodesAndLinks = (nodes: Record<string, Node>, links: Link[], scene: THREE.Scene) => {
    // Create node meshes
    Object.values(nodes).forEach(node => {
      const geometry = createNodeGeometry(node.type);
      const material = new THREE.MeshBasicMaterial({ color: getColorForNodeType(node.type) });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(node.position);
      scene.add(mesh);
      node.mesh = mesh;
    });

    // Create link lines
    links.forEach(link => {
      const sourceNode = nodes[link.source];
      const targetNode = nodes[link.target];
      const geometry = new THREE.BufferGeometry().setFromPoints([sourceNode.position, targetNode.position]);
      const material = new THREE.LineBasicMaterial({ color: 0x000000 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      link.line = line;
    });
  };

  const highlightNodeAndLinks = (node: Node) => {
    resetHighlights();
    if (node.mesh) {
      node.mesh.material = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    }
    links.filter(link => link.source === node.id || link.target === node.id).forEach(link => {
      if (link.line) {
        link.line.material = new THREE.LineBasicMaterial({ color: 0xffa500 });
      }
      const connectedNodeId = link.source === node.id ? link.target : link.source;
      const connectedNode = nodes[connectedNodeId];
      if (connectedNode.mesh) {
        connectedNode.mesh.material = new THREE.MeshBasicMaterial({ color: 0xffa500 });
      }
    });
  };

  const resetHighlights = () => {
    Object.values(nodes).forEach(node => {
      if (node.mesh) {
        node.mesh.material = new THREE.MeshBasicMaterial({ color: getColorForNodeType(node.type) });
      }
    });
    links.forEach(link => {
      if (link.line) {
        link.line.material = new THREE.LineBasicMaterial({ color: 0x000000 });
      }
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full"></div>
      <div className="absolute top-0 left-0 p-4 bg-white bg-opacity-80">
        <h1 className="text-2xl font-bold mb-2">Project {projectId} Visualization</h1>
        <p className="mb-2">Use the slider to navigate through the project timeline</p>
        <input 
          type="range" 
          id="timeline" 
          min="0" 
          max="100" 
          defaultValue="0" 
          className="w-full"
          onChange={(e) => {
            // TODO: Implement timeline functionality
            console.log("Timeline value:", e.target.value);
          }}
        />
      </div>
      {selectedNode && (
        <div className="absolute bottom-0 right-0 p-4 bg-white bg-opacity-80 max-w-md">
          <h2 className="text-xl font-bold mb-2">{selectedNode.name}</h2>
          <p>{selectedNode.details}</p>
        </div>
      )}
    </div>
  );
};

export default ThreeDVisualization;