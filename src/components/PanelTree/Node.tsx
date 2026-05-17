/* src/components/PanelTree/Node.tsx */

'use client';

import { useCallback } from 'react';
import { usePanelStore } from '@/src/store/usePanelStore';
import { LeafNode, SplitDirection } from '@/src/types/panelTree';
import styles from './Node.module.css';

type Props = {
  node: LeafNode;
};

const EDGES: { side: 'left' | 'right' | 'top' | 'bottom'; direction: SplitDirection }[] = [
  { side: 'left',   direction: 'horizontal' },
  { side: 'right',  direction: 'horizontal' },
  { side: 'top',    direction: 'vertical'   },
  { side: 'bottom', direction: 'vertical'   },
];

function HorizontalSplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="8" y1="2" x2="8" y2="14" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="5,5 2,8 5,11" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="11,5 14,8 11,11" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function VerticalSplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="2" y1="8" x2="14" y2="8" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="5,5 8,2 11,5" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="5,11 8,14 11,11" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Node({ node }: Props) {
  const splitNode = usePanelStore((s) => s.splitNode);
  const removeNode = usePanelStore((s) => s.removeNode);

  const handleSplit = useCallback(
    (direction: SplitDirection) => splitNode(node.id, direction),
    [node.id, splitNode]
  );

  return (
    <div className={styles.node}>

      {/* Edge split triggers */}
      {EDGES.map(({ side, direction }) => (
        <button
          key={side}
          className={`${styles.edgeTrigger} ${styles[`edge_${side}`]}`}
          onClick={() => handleSplit(direction)}
          aria-label={`Split ${direction === 'horizontal' ? 'left/right' : 'top/bottom'}`}
        >
          <span className={styles.splitIcon}>
            {direction === 'horizontal' ? <HorizontalSplitIcon /> : <VerticalSplitIcon />}
          </span>
        </button>
      ))}

      {/* Remove button */}
      <button
        className={styles.removeBtn}
        onClick={() => removeNode(node.id)}
        aria-label="Remove node"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Center add-widget button */}
      <button
        className={styles.addBtn}
        aria-label="Add a Signal to this Node"
        onClick={() => console.log('open modal for node:', node.id)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

    </div>
  );
}