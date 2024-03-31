/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  value = null
  left = null
  right = null

  constructor(){

  }

  weight(){
    if(!this.value) return 0

    const leftWeight = this.left?.weight() || 0
    const rightWeight = this.right?.weight() || 0

    return 1 + leftWeight + rightWeight
  }

  depth(){
    if(!this.value) return 0

    const leftDepth = this.left?.depth() || 0
    const rightDepth = this.right?.depth() || 0

    return Math.max(leftDepth, rightDepth) + 1
  }

  planShiftDirection() {
    const leftDepth = this.left?.depth() || 0
    const rightDepth = this.right?.depth() || 0


    if (leftDepth - rightDepth >= 2) {
      return 'left'
    }

    if (rightDepth - leftDepth >= 2) {
      return 'right'
    }

    return null
  }

  planShiftType(shift) {
    
    if (shift === 'left' && this.left?.left) {
      return 'single'
    }
    if (shift === 'left' && this.left?.right) {
      return 'double'
    }
    if (shift === 'right' && this.right?.left) {
      return 'double'
    }
    if (shift === 'right' && this.right?.right) {
      return 'single'
    }
  }

  rotateRight() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;

  }
  rotateLeft() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
  }

  add(item){
    if (!this.value) {
      this.value = item
      return
    } 
    
    if(item < this.value) {
      this.left = this.left || new Tree()
      this.left.add(item)
    } else {
      this.right = this.right || new Tree()
      this.right.add(item)
    }

    const shiftDirection = this.planShiftDirection()
    if(shiftDirection) {
      const shiftType = this.planShiftType(shiftDirection)

      if(shiftType === 'single' && shiftDirection === 'left') this.rotateLeft()
      if(shiftType === 'single' && shiftDirection === 'right') this.rotateRight()

      if(shiftType === 'double' && shiftDirection === 'left') {
        this.left.rotateRight()
        this.rotateLeft()
      }    
      if(shiftType === 'double' && shiftDirection === 'right') {
        this.right.rotateLeft()
        this.rotateRight()
      }    
    }


  }

  toObject() {
    return {
      value: this.value,
      left: this.left?.toObject() || null,
      right: this.right?.toObject() || null
    }
  }
}

// bst rep
//           3
//        /     \
//       4       7
//     /  \     / \
//    1    5   6   10
//         /   \    \
//        2     8    9

// step 1
//           3

// step 2
//           3
//            \
//             7

// step 3
//           3
//            \
//             7
//            /
//           4

// step 4
//           4
//         /   \
//        3     7
//             /
//            6 

// step 5
//           4
//         /   \
//        3     7
//             / 
//            6
//           /
//          5                 

// step 6
//         4
//       /   \
//      3     6
//           / \
//          5   7

// step 7
//         4
//       /   \
//      3     6
//     /     / \
//    1     5   7

// step 8
//         4
//       /   \
//      3     6
//     /     / \
//    1     5   7
//               \
//               10

// step 9
//         4
//       /   \
//      3     6
//     /     / \
//    1     5   7
//     \         \
//      2        10

// step 10
//         4
//       /   \
//      2     6
//     / \   / \
//    1   3 5   7
//               \
//               10

// step 11
//         4
//       /   \
//      2     6
//     / \   / \
//    1   3 5   7
//               \
//               10
//               /
//              9

// step 12
//         4
//       /   \
//      2     6
//     / \   / \
//    1   3 5   9
//             /  \
//            7   10

// step 13
//         4
//       /   \
//      2     6
//     / \   / \
//    1   3 5   9
//             /  \
//            7   10
//            \
//             8

// step 14
//         4
//       /   \
//      2     6
//     / \   / \
//    1   3 5   9
//             /  \
//            7   10
//            \
//             8


// unit tests
// do not modify the below code
describe("AVL Tree", function () {
  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
