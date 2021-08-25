import Tree from './tree';
import Leaf from './tree-leaf';
import Branch from './tree-branch';

Tree.File = Leaf;
Tree.Folder = Branch;

export { Tree };
