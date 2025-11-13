// Binary Search Tree Node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// BST insertion
export function buildBST(values) {
  if (!values || values.length === 0) return null;

  const insert = (root, val) => {
    if (!root) return new TreeNode(val);
    if (val < root.value) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
  };

  let root = null;
  for (let v of values) root = insert(root, v);
  return root;
}

// Simple AVL example (balanced version)
export function buildAVL(values) {
  if (!values || values.length === 0) return null;

  const sorted = [...values].sort((a, b) => a - b);

  const build = (arr) => {
    if (!arr.length) return null;
    const mid = Math.floor(arr.length / 2);
    const node = new TreeNode(arr[mid]);
    node.left = build(arr.slice(0, mid));
    node.right = build(arr.slice(mid + 1));
    return node;
  };

  return build(sorted);
}
