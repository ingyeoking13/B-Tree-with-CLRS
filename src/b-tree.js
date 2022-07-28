class Node {
  constructor() {
    this.n = 0;
    this.keys = [];
    this.children = []; // children = keys + 1
    this.leaf = false;
  }
}
class BTree {
  degree = 2;
  root;
  init = () => {
    this.root = new Node();
    this.root.leaf = true;
  };

  search = (root, key) => {
    i = 0;
    while (i < root.n && k > root.keys[i]) i++;
    if (i <= root.n && k == root.keys[i]) return {node: root, idx: i};
    else if (root.leaf) return;
    return this.search(root.children[i], key);
  };

  insert = (k) => {
    const root = this.root;
    if (root.n == 2 * this.degree - 1) {
      const newNode = new Node();
      this.root = newNode;
      newNode.leaf = false;
      newNode.n = 0;
      newNode.children = [root];
      this.splitChild(newNode, 0);
      this.insertNonFull(newNode, k);
    } else {
      this.insertNonFull(root, k);
    }
  };

  splitChild = (node, idx) => {
    const zChild = new Node();
    const yChild = node.children[idx];
    zChild.leaf = yChild.leaf;
    zChild.n = this.degree - 1;
    for (let i = 0; i < zChild.n; i++) {
      zChild.keys[i] = yChild.keys[this.degree + i - 1];
    }
    if (!yChild.leaf) {
      for (let i = 0; i < this.degree; i++) {
        zChild.children[i] = yChild.children[this.degree + i];
      }
    }
    yChild.n = this.degree - 1;
    for (let i = node.n; i > idx; i--) {
      x.children[i] = x.children[i - 1];
    }
  };

  insertNonFull = (x, k) => {
    let i = x.n;
    if (x.leaf) {
      while (i >= 1 && k < x.children[i]) {
        x.keys[i] = x.keys[i - 1];
        i--;
      }
      x.keys[i] = k;
      x.n++;
    } else {
    }
  };

  show = () => {
    [...this.root.keys].forEach((i) => {
      process.stdout.write(`${i} `);
    });
  };
}

tree = new BTree();
tree.init();
[1, 2, 3, 4].forEach((i) => tree.insert(i));
tree.show();
