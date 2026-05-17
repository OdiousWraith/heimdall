// src/store/usePanelStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PanelNode, SplitDirection, SplitNode } from '@/src/types/panelTree';

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

function findNode(tree: PanelNode, targetId: string): PanelNode | null {
  if (tree.id === targetId) return tree;
  if (tree.type === 'leaf') return null;
  return findNode(tree.first, targetId) || findNode(tree.second, targetId);
}

const initialTree: PanelNode = {
  type: 'leaf',
  id: 'root',
  signalId: null,
};

type PanelStore = {
  tree: PanelNode;
  splitNode: (id: string, direction: SplitDirection) => void;
  setSignal: (id: string, signalId: string) => void;
  updateRatio: (id: string, ratio: number) => void;
  removeNode: (id: string) => void;
  resetTree: () => void;
};

export const usePanelStore = create<PanelStore>()(
  persist(
    (set) => ({
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
          const node = findNode(state.tree, id);
          if (!node || node.type !== 'split') return state;
          return {
            tree: replaceNode(state.tree, id, { ...node, ratio }),
          };
        }),

      removeNode: (id) =>
        set((state) => {
          function removeFn(tree: PanelNode, targetId: string): PanelNode {
            if (tree.type === 'leaf') return tree;
            if (tree.first.id === targetId) return tree.second;
            if (tree.second.id === targetId) return tree.first;
            return {
              ...tree,
              first: removeFn(tree.first, targetId),
              second: removeFn(tree.second, targetId),
            };
          }
          if (state.tree.id === id) return { tree: initialTree };
          return { tree: removeFn(state.tree, id) };
        }),

      resetTree: () => set({ tree: initialTree }),
    }),
    {
      name: 'heimdall-panel-tree',
    }
  )
);