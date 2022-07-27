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
      const newNode = Node();
      this.root = newNode;
      newNode.leaf = false;
      newNode.n = 0;
      newNode.c = root;
      this.insertNonFull(newNode, k);
    } else {
      this.insertNonFull(root, k);
    }
  };

  insertNonFull = (x, k) => {
    let i = x.n;
    console.log(x, x.keys);
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
    console.log('wh', this.root.keys);
    [...this.root.keys].forEach((i) => {
      console.log(i);
      process.stdout.write(`${i} `);
    });
  };
}

tree = new BTree();
tree.init();
tree.insert(1);
tree.show();
