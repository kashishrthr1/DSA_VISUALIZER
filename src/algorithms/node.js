export default class Node {
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
      this.height = 1; // Used specifically for AVL trees
    }
  }
  
  // Utility function to deep clone the tree state
  export function cloneTree(node) {
    if (!node) return null;
    const newNode = new Node(node.value);
    newNode.height = node.height; // Preserve height
    newNode.left = cloneTree(node.left);
    newNode.right = cloneTree(node.right);
    return newNode;
  }