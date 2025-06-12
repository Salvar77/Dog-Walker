"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import classes from "./Tokenomics.module.scss";
import TokenomicsBackground from "@/assets/img/TokenomicsBackground.png";
import TokenomicsBackgroundInside1 from "@/assets/img/TokenomicsBackgroundInside1.svg";
import TokenomicsBackgroundInside2 from "@/assets/img/TokenomicsBackgroundInside2.svg";
import TokenomicsBackgroundInside3 from "@/assets/img/TokenomicsBackgroundInside3.svg";
import TokenomicsBackgroundInside4 from "@/assets/img/TokenomicsBackgroundInside4.svg";

const Tokenomics: React.FC = () => {
  const { t } = useTranslation("tokenomics");

  return (
    <section className={classes.tokenomics} id="tokenomics">
      <div className={classes.header}>
        <h2 className={classes.heading}>{t("heading")}</h2>
        <p className={classes.subheading}>{t("subheading")}</p>
      </div>

      <div className={classes.chartWrapper}>
        <div className={classes.ringsContainer}>
          {/* pełne tło */}
          <Image
            src={TokenomicsBackground}
            alt={t("alt.chartGrid")}
            className={classes.bg}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside1}
            alt={t("alt.outerRing")}
            className={classes.inner1}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside2}
            alt={t("alt.middleRing")}
            className={classes.inner2}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside3}
            alt={t("alt.innerRing")}
            className={classes.inner3}
            priority
          />
          <Image
            src={TokenomicsBackgroundInside4}
            alt={t("alt.centreGradient")}
            className={classes.inner4}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
