// Mock data for development
const mockNodes = [
  {
    id: 1,
    name: 'Node 1',
    status: 'active',
    energy: 75,
    demand: 50,
    location: 'Maharashtra'
  },
  {
    id: 2,
    name: 'Node 2',
    status: 'active',
    energy: 85,
    demand: 60,
    location: 'Gujarat'
  },
  {
    id: 3,
    name: 'Node 3',
    status: 'inactive',
    energy: 45,
    demand: 30,
    location: 'Karnataka'
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockSwarmApi = {
  getNodes: async () => {
    await delay(500); // Simulate network delay
    return mockNodes;
  },
  
  updateNode: async (nodeId, data) => {
    await delay(500);
    const node = mockNodes.find(n => n.id === nodeId);
    if (!node) {
      throw new Error('Node not found');
    }
    Object.assign(node, data);
    return node;
  },

  getNodeStats: async (nodeId) => {
    await delay(500);
    const node = mockNodes.find(n => n.id === nodeId);
    if (!node) {
      throw new Error('Node not found');
    }
    return {
      energy: {
        current: node.energy,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
      },
      demand: {
        current: node.demand,
        history: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
      }
    };
  }
};
