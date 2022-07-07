// Build a binary tree from an array of values representing the result of a level order traversal

class Node {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const buildBinaryTree = arr => {
    if (arr.length === 0) return null;

    const root = new Node(arr[0]);

    let left = true,
        queue = [],
        currentNode = null;

    queue.push(root);

    for (let i = 1; i < arr.length; i++) {
        const node = arr[i] ? new Node(arr[i]) : null;

        if (left) {
            currentNode = queue.shift();
            currentNode.left = node;
            left = !left;
        } else {
            currentNode.right = node;
            left = !left;
        }

        if (arr[i]) {
            queue.push(node);
        }
    }

    return root;
};

const levelOrderRecursive = function (root) {
    if (!root) return [];

    const ans = [];

    const helper = function (node, level, ans) {
        if (!node) return;

        // ans[level] ? ans[level].push(node.val) : (ans[level] = [node.val]);

        if (ans[level]) {
            ans[level].push(node.val);
        } else {
            ans[level] = [node.val];
        }

        helper(node.left, level + 1, ans);
        helper(node.right, level + 1, ans);
    };

    helper(root, 0, ans);
    return ans.flat();
};

const levelOrderIterative = function (root) {
    if (!root) return [];

    const ans = [],
        queue = [[root, 0]];

    while (queue.length !== 0) {
        let [node, currDepth] = queue.shift();

        if (node) {
            // ans[currDepth]
            //     ? ans[currDepth].push(node.val)
            //     : (ans[currDepth] = [node.val]);

            if (ans[currDepth]) {
                ans[currDepth].push(node.val);
            } else {
                ans[currDepth] = [node.val];
            }

            queue.push([node.left, currDepth + 1]);
            queue.push([node.right, currDepth + 1]);
        }
    }

    return ans.flat();
};

// TESTING
let arr = [-10, 9, 20, null, null, 15, 7];
arr = [3, 9, 20, null, null, 15, 7];
arr = [1];
arr = [];
arr = [1, 2, 3];

const tree = buildBinaryTree(arr);
// console.log(tree);
console.log(levelOrderRecursive(tree));
console.log(levelOrderIterative(tree));
