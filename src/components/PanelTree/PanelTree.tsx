// src/components/PanelTree/PanelTree.tsx

'use client';

import { useRef, useCallback } from 'react';
import { PanelNode } from '@/src/types/panelTree';
import { usePanelStore } from '@/src/store/usePanelStore';
import Node from './Node';
import ResizeHandle from './ResizeHandle';
import styles from './PanelTree.module.css';

type Props = {
  node: PanelNode;
};

export default function PanelTree({ node }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const updateRatio = usePanelStore((state) => state.updateRatio);

  const handleRatioChange = useCallback((splitId: string, newRatio: number) => {
    updateRatio(splitId, newRatio);
  }, [updateRatio]);

  if (node.type === 'leaf') {
    return (
      <div
        className={styles.pane}
        style={{ width: '100%', height: '100%' }}
        data-node-id={node.id}
      >
        <Node node={node} />
      </div>
    );
  }

  const firstSize = `${node.ratio * 100}%`;
  const secondSize = `${(1 - node.ratio) * 100}%`;
  const isHorizontal = node.direction === 'horizontal';

  return (
    <div
      ref={containerRef}
      className={`${styles.split} ${isHorizontal ? styles.splitHorizontal : styles.splitVertical}`}
    >
      <div
        className={styles.pane}
        style={isHorizontal ? { width: firstSize, height: '100%' } : { width: '100%', height: firstSize }}
      >
        <PanelTree node={node.first} />
      </div>

      <ResizeHandle
        direction={node.direction}
        splitId={node.id}
        containerRef={containerRef}
        onRatioChange={handleRatioChange}
      />

      <div
        className={styles.pane}
        style={isHorizontal ? { width: secondSize, height: '100%' } : { width: '100%', height: secondSize }}
      >
        <PanelTree node={node.second} />
      </div>
    </div>
  );
}