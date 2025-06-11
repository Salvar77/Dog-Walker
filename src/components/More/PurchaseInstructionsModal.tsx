"use client";

import React, { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import classes from "./PurchaseInstructionsModal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseInstructionsModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation("presale");
  const [current, setCurrent] = useState(0);

  const stepsCount = Number(t("instructions.count"));
  const steps = Array.from({ length: stepsCount }, (_, i) => ({
    title: t(`instructions.${i + 1}.title`),
    content: t(`instructions.${i + 1}.content`),
  }));

  if (!isOpen) return null;

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <header className={classes.header}>
          <h2>{steps[current].title}</h2>
          <button className={classes.closeBtn} onClick={onClose}>
            {t("instructions.close")}
          </button>
        </header>
        <div
          className={classes.body}
          dangerouslySetInnerHTML={{ __html: steps[current].content }}
        />
        <footer className={classes.footer}>
          <button
            className={classes.prevBtn}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
          >
            {t("instructions.prev")}
          </button>

          <div className={classes.indicators}>
            {steps.map((_, i) => (
              <span
                key={i}
                className={i === current ? classes.active : ""}
                onClick={() => setCurrent(i)}
              >
                {i + 1}
              </span>
            ))}
          </div>

          <button
            className={classes.nextBtn}
            onClick={() => setCurrent((c) => Math.min(stepsCount - 1, c + 1))}
            disabled={current === stepsCount - 1}
          >
            {t("instructions.next")}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PurchaseInstructionsModal;
