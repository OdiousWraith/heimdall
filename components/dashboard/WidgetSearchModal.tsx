"use client";

import { useEffect } from "react";
import styles from "./WidgetSearchModal.module.css";

interface WidgetSearchModalProps {
  onClose: () => void;
}

export default function WidgetSearchModal({ onClose }: WidgetSearchModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Add Signal">
        <div className={styles.header}>
          <span className={styles.title}>Add Signal</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search signals… (coming soon)"
            disabled
            aria-label="Search signals (coming soon)"
          />
        </div>

        <div className={styles.body}>
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <p className={styles.emptyTitle}>Signals coming in Phase 7</p>
            <p className={styles.emptySub}>Wallet Tracker · Token Chart · X Feed · Token Info</p>
          </div>
        </div>
      </div>
    </>
  );
}