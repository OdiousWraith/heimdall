"use client";

import { useState } from "react";
import WidgetSearchModal from "@/components/dashboard/WidgetSearchModal";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.canvas}>
        <button
          className={styles.addBtn}
          onClick={() => setModalOpen(true)}
          aria-label="Add a Signal to this Frame"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <p className={styles.hint}>
          Your Frame is empty, add your first Signal.
        </p>
      </div>

      {modalOpen && (
        <WidgetSearchModal onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}