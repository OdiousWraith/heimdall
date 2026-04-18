"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import styles from "./Topbar.module.css";

// ── Helpers ───────────────────────────────────────────────────────────────────

function truncateAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [ref, handler]);
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_FRAMES = ["Main", "Degen Watch", "Whales"];
const MOCK_WALLET = "8xKf3Qm9nRpTv2Yw5Lz7Bd4Hs6Ej1Nc";

// ── Logo ──────────────────────────────────────────────────────────────────────

function DeltaLogo() {
  return (
    <Link href="/dashboard" className={styles.logoLink}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polygon points="12,2 22,20 2,20" stroke="#00F0FF" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <line x1="12" y1="8" x2="12" y2="15" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="#00F0FF" />
      </svg>
      <span className={styles.logoWordmark}>Delta Terminal</span>
    </Link>
  );
}

// ── Search ────────────────────────────────────────────────────────────────────

function SearchBar() {
  return (
    <div className={styles.searchWrap}>
      <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search signals, wallets, tokens…"
        disabled
        aria-label="Search (coming soon)"
      />
      <kbd className={styles.searchKbd}>⌘K</kbd>
    </div>
  );
}

// ── Frame Pill ────────────────────────────────────────────────────────────────

function FramePill() {
  const [open, setOpen] = useState(false);
  const [activeFrame, setActiveFrame] = useState(MOCK_FRAMES[0]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div className={styles.framePillWrap} ref={ref}>
      <button
        className={styles.framePill}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.framePillDot} aria-hidden="true" />
        <span className={styles.framePillName}>{activeFrame}</span>
        <svg
          className={`${styles.framePillChevron} ${open ? styles.framePillChevronOpen : ""}`}
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={`${styles.dropdown} ${styles.frameDropdown}`} role="listbox">
          <div className={styles.dropdownSectionLabel}>Frames</div>
          {MOCK_FRAMES.map((frame) => (
            <button
              key={frame}
              className={`${styles.dropdownItem} ${frame === activeFrame ? styles.dropdownItemActive : ""}`}
              role="option"
              aria-selected={frame === activeFrame}
              onClick={() => { setActiveFrame(frame); setOpen(false); }}
            >
              <span className={styles.dropdownItemDot} aria-hidden="true" />
              {frame}
              {frame === activeFrame && (
                <svg className={styles.dropdownCheck} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
          <div className={styles.dropdownDivider} />
          <button className={`${styles.dropdownItem} ${styles.newFrame}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Frame
          </button>
        </div>
      )}
    </div>
  );
}

// ── Account Avatar ────────────────────────────────────────────────────────────

interface AccountAvatarProps {
  displayName: string;
  email: string;
}

function AccountAvatar({ displayName, email }: AccountAvatarProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useClickOutside(ref, () => setOpen(false));

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText(MOCK_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className={styles.avatarWrap} ref={ref}>
      <button
        className={styles.avatarBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <div className={`${styles.dropdown} ${styles.accountDropdown}`}>
          <div className={styles.dropdownIdentity}>
            <span className={styles.identityName}>{displayName}</span>
            <span className={styles.identityEmail}>{email}</span>
            <button className={styles.identityWallet} onClick={handleCopyAddress} title="Copy wallet address">
              <span className={styles.walletMono}>{truncateAddress(MOCK_WALLET)}</span>
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          <div className={styles.dropdownDivider} />

          <button className={styles.dropdownItem} disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            Theme
            <span className={styles.dropdownComingSoon}>soon</span>
          </button>

          <button className={styles.dropdownItem} disabled>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Settings
            <span className={styles.dropdownComingSoon}>soon</span>
          </button>

          <div className={styles.dropdownDivider} />

          <button className={`${styles.dropdownItem} ${styles.signOut}`} onClick={handleSignOut}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────────────

interface TopbarProps {
  displayName: string;
  email: string;
}

export default function Topbar({ displayName, email }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <DeltaLogo />
      </div>
      <div className={styles.center}>
        <SearchBar />
      </div>
      <div className={styles.right}>
        <FramePill />
        <AccountAvatar displayName={displayName} email={email} />
      </div>
    </header>
  );
}