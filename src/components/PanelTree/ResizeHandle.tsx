/* src/components/PanelTree/ResizeHandle.tsx */

'use client';

import { useCallback } from 'react';
import { SplitDirection } from '@/src/types/panelTree';
import styles from './ResizeHandle.module.css';

type Props = {
  direction: SplitDirection;
  splitId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onRatioChange: (splitId: string, newRatio: number) => void;
};

export default function ResizeHandle({ direction, splitId, containerRef, onRatioChange }: Props) {
  const isHorizontal = direction === 'horizontal';

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (isHorizontal) {
        const newRatio = (moveEvent.clientX - rect.left) / rect.width;
        onRatioChange(splitId, Math.min(Math.max(newRatio, 0.1), 0.9));
      } else {
        const newRatio = (moveEvent.clientY - rect.top) / rect.height;
        onRatioChange(splitId, Math.min(Math.max(newRatio, 0.1), 0.9));
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [isHorizontal, splitId, containerRef, onRatioChange]);

  return (
    <div
      className={`${styles.handle} ${isHorizontal ? styles.handleHorizontal : styles.handleVertical}`}
      onMouseDown={handleMouseDown}
    />
  );
}