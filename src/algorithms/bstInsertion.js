import Node, { cloneTree } from "./node";

export function bstInsertion(arr) {
  const steps = [];
  let root = null;
  const insertionSequence = [...arr].filter((v, i, a) => a.indexOf(v) === i); // Ensure unique values

  // Step 1: Handle first insertion
  if (insertionSequence.length > 0) {
    root = new Node(insertionSequence[0]);
    steps.push({
      root: cloneTree(root),
      visiting: insertionSequence[0],
      comparing: [],
      line: 3 
    });
  }

  // Step 2: Insert the remaining nodes
  for (let i = 1; i < insertionSequence.length; i++) {
    const value = insertionSequence[i];
    let current = root;
    let parent = null;
    let line = 5;

    while (current) {
      parent = current;

      // 1. Comparison step
      steps.push({
        root: cloneTree(root),
        visiting: value,
        comparing: [current.value],
        line: line
      });

      if (value < current.value) {
        current = current.left;
        line = 9;
      } else {
        current = current.right;
        line = 11;
      }
    }

    // 2. Insert step
    const newNode = new Node(value);
    if (value < parent.value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }

    steps.push({
      root: cloneTree(root),
      visiting: value,
      comparing: [parent.value], // Highlight where it was inserted
      line: 13 
    });
  }

  return steps;
}

export const bstInsertionCode = `
function insertBST(root, value) {
  if (!root) { // 2
    return new Node(value); // 3
  }

  let current = root;
  while (current) { // 5
    if (value < current.value) { // 7
      if (!current.left) {
        current.left = new Node(value); // 8
        break;
      }
      current = current.left; // 9
    } else { // 10
      if (!current.right) {
        current.right = new Node(value); // 11
        break;
      }
      current = current.right; // 12
    }
  }
}
`;