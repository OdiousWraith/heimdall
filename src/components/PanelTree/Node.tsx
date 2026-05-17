/* src/components/PanelTree/Node.tsx */

'use client';

import { LeafNode } from '@/src/types/panelTree';
import styles from './Node.module.css';

type Props = {
  node: LeafNode;
};

export default function Node({ node }: Props) {
  return (
    <div className={styles.node}>
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