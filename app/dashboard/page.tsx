"use client";

import { useState } from "react";
import WidgetSearchModal from "@/components/dashboard/WidgetSearchModal";
import { usePanelStore } from "@/src/store/usePanelStore";
import PanelTree from "@/src/components/PanelTree/PanelTree";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const tree = usePanelStore((state) => state.tree);

  return (
    <>
      <div className={styles.canvas}>
        <PanelTree node={tree} />
      </div>

      {modalOpen && (
        <WidgetSearchModal onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}