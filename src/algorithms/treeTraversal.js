import Node, { cloneTree } from "./node.js";

// Helper to build a basic balanced binary tree from a sorted array for traversal
function buildBalancedBST(arr, start, end) {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const node = new Node(arr[mid]);
  node.left = buildBalancedBST(arr, start, mid - 1);
  node.right = buildBalancedBST(arr, mid + 1, end);
  return node;
}

export function treeTraversal(arr) {
  const steps = [];
  // 1. Sort input array and build the initial tree
  const sortedArr = [...arr].sort((a, b) => a - b);
  const initialRoot = buildBalancedBST(sortedArr, 0, sortedArr.length - 1);
  
  // Array to track the order of visited nodes
  const path = []; 

  // Recursive traversal helper
  function inorder(node) {
    if (!node) {
      steps.push({
        root: cloneTree(initialRoot),
        visiting: null,
        path: [...path],
        line: 2 // Base case check
      });
      return;
    }

    // Step 1: Visit left subtree (line 3)
    steps.push({
      root: cloneTree(initialRoot),
      visiting: node.value,
      path: [...path],
      line: 3
    });
    inorder(node.left);

    // Step 2: Process current node (line 4)
    path.push(node.value);
    steps.push({
      root: cloneTree(initialRoot),
      visiting: node.value,
      path: [...path],
      line: 4
    });

    // Step 3: Visit right subtree (line 5)
    steps.push({
      root: cloneTree(initialRoot),
      visiting: node.value,
      path: [...path],
      line: 5
    });
    inorder(node.right);
  }

  inorder(initialRoot);
  
  // Final state
  steps.push({
    root: cloneTree(initialRoot),
    visiting: null,
    path: [...path],
    line: 7
  });

  return steps;
}

export const treeTraversalCode = `
function inorderTraversal(node) {
  if (!node) {
    return; // 2
  }
  inorderTraversal(node.left); // 3
  console.log(node.value); // 4
  inorderTraversal(node.right); // 5
}
`;``