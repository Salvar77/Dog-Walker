"use client";
import React, { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import classes from "./StakeInstructionsModal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeInstructionsModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation("staking");
  const [current, setCurrent] = useState(0);

  // number of steps from translation (excluding intro)
  const stepsCount = Number(t("instructions.count"));

  // build slides: intro + steps 1..stepsCount + bonus at end if defined
  const steps = [
    { title: t("instructions.1.title"), content: t("instructions.1.content") },
    ...Array.from({ length: stepsCount - 1 }, (_, i) => ({
      title: t(`instructions.${i + 2}.title`),
      content: t(`instructions.${i + 2}.content`),
    })),
  ];

  // always run hooks
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
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            disabled={current === steps.length - 1}
          >
            {t("instructions.next")}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StakeInstructionsModal;
