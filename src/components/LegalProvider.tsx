"use client";

import { useState, useEffect } from "react";
import LegalModal, { LegalModalType } from "./LegalModal";
import CookieBanner from "./CookieBanner";

export default function LegalProvider() {
  const [modalType, setModalType] = useState<LegalModalType>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      setModalType(e.detail as LegalModalType);
    };

    window.addEventListener("open-legal-modal", handleOpen);
    return () => window.removeEventListener("open-legal-modal", handleOpen);
  }, []);

  return (
    <>
      <CookieBanner onOpenCookiesPolicy={() => setModalType("cookies")} />
      <LegalModal type={modalType} onClose={() => setModalType(null)} />
    </>
  );
}
