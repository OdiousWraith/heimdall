// src/types/panelTree.ts

export type SplitDirection = 'horizontal' | 'vertical';

export type LeafNode = {
  type: 'leaf';
  id: string;
  signalId: string | null; // null = empty slot
};

export type SplitNode = {
  type: 'split';
  id: string;
  direction: SplitDirection;
  ratio: number; // 0.0–1.0, fraction of space given to `first`
  first: PanelNode;
  second: PanelNode;
};

export type PanelNode = LeafNode | SplitNode;