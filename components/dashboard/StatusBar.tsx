import styles from "./StatusBar.module.css";

export default function StatusBar() {
  return (
    <footer className={styles.statusBar} role="contentinfo" aria-label="System status">
      <div className={styles.left}>
        <span className={`${styles.dot} ${styles.dotConnected}`} aria-hidden="true" />
        <span className={styles.item}>Connected</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span className={styles.item}>60 FPS</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span className={styles.item}>12ms</span>
      </div>
      <div className={styles.right}>
        <span className={styles.version}>HEIMDALL v0.6.0</span>
      </div>
    </footer>
  );
}