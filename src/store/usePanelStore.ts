// src/store/usePanelStore.ts

import { create } from 'zustand';
import { PanelNode, SplitDirection, SplitNode } from '@/src/types/panelTree';

// ── Helpers ─────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function replaceNode(
  tree: PanelNode,
  targetId: string,
  replacement: PanelNode
): PanelNode {
  if (tree.id === targetId) return replacement;
  if (tree.type === 'leaf') return tree;
  return {
    ...tree,
    first: replaceNode(tree.first, targetId, replacement),
    second: replaceNode(tree.second, targetId, replacement),
  };
}

// ── Initial State ────────────────────────────────────────────────────────────

const initialTree: PanelNode = {
  type: 'leaf',
  id: 'root',
  signalId: null,
};


// ── Store ────────────────────────────────────────────────────────────────────

type PanelStore = {
  tree: PanelNode;
  splitNode: (id: string, direction: SplitDirection) => void;
  setSignal: (id: string, signalId: string) => void;
  updateRatio: (id: string, ratio: number) => void;
};

export const usePanelStore = create<PanelStore>((set) => ({
  tree: initialTree,

  splitNode: (id, direction) =>
    set((state) => ({
      tree: replaceNode(state.tree, id, {
        type: 'split',
        id: generateId(),
        direction,
        ratio: 0.5,
        first: { type: 'leaf', id: generateId(), signalId: null },
        second: { type: 'leaf', id: generateId(), signalId: null },
      }),
    })),

  setSignal: (id, signalId) =>
    set((state) => ({
      tree: replaceNode(state.tree, id, {
        type: 'leaf',
        id,
        signalId,
      }),
    })),

  updateRatio: (id, ratio) =>
    set((state) => {
      const node = state.tree;
      return {
        tree: replaceNode(state.tree, id, {
          ...(node as SplitNode),
          ratio,
        }),
      };
    }),
}));