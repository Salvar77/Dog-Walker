"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeamRectangle1 from "@/assets/img/TeamRectangle1.svg";
import TeamRectangle2 from "@/assets/img/TeamRectangle2.svg";
import TeamRectangle3 from "@/assets/img/TeamRectangle3.svg";
import TeamRectangle4 from "@/assets/img/TeamRectangle4.svg";
import PreSaleArrow from "@/assets/img/TeamArrow.svg";

import classes from "./Teams.module.scss";

interface Item {
  title: string;
  description: string;
}

const Teams: React.FC = () => {
  const { t } = useTranslation("team");
  const items = t("items", { returnObjects: true }) as Item[];

  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const upd = () => setIsDesktop(window.innerWidth >= 992);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const slidesToShow = 3;
  const sliderSettings = {
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (idx: number) => setCurrent(idx),
  };

  const totalSteps = items.length;
  const stepIndex = (current % totalSteps) + 1;
  const progressPercent = Math.min(
    100,
    Math.round((stepIndex / totalSteps) * 100)
  );

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper} />

      <section id="team" className={classes.teams}>
        {/* HEADER */}
        <div className={classes.teams__header}>
          <h2 className={classes.heading}>{t("heading")}</h2>
          <button className={classes.ctaBtn}>
            {t("becomeMember")}{" "}
            <span className={classes.arrow}>
              <Image
                src={PreSaleArrow}
                alt={t("alt.becomeArrow")}
                width={7}
                height={12}
              />
            </span>
          </button>
        </div>

        {/* SLIDER */}
        <div className={classes.teams__box}>
          {isDesktop ? (
            <>
              <Slider {...sliderSettings}>
                {items.map((it, idx) => (
                  <div key={idx}>
                    <div className={classes.teams__memberCard}>
                      <h3 className={classes.name}>{it.title}</h3>
                      <div
                        className={classes.role}
                        dangerouslySetInnerHTML={{ __html: it.description }}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
              {/* PROGRESS BAR */}
              <div className={classes.progressBar}>
                <div className={classes.progressTrack}>
                  <div
                    className={classes.progressFill}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className={classes.teams__memberCard}>
                <h3 className={classes.name}>{it.title}</h3>
                <div
                  className={classes.role}
                  dangerouslySetInnerHTML={{ __html: it.description }}
                />
              </div>
            ))
          )}
        </div>

        {/* WHY US */}
        <div className={classes.whyUs}>
          <h3 className={classes.whyTitle}>{t("whyUsTitle")}</h3>
          <div
            className={classes.whyDescription}
            dangerouslySetInnerHTML={{ __html: t("whyUsText") }}
          />
        </div>

        {/* DECORATIVE RECTANGLES */}
        <Image
          src={TeamRectangle1}
          alt=""
          aria-hidden="true"
          className={classes.rectangle1}
          priority
          width={isMobile ? 150 : undefined}
          height={isMobile ? 150 : undefined}
        />
        <Image
          src={TeamRectangle2}
          alt=""
          aria-hidden="true"
          className={classes.rectangle2}
          priority
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />
        <Image
          src={TeamRectangle3}
          alt=""
          aria-hidden="true"
          className={classes.rectangle3}
          priority
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />
        <Image
          src={TeamRectangle4}
          alt=""
          aria-hidden="true"
          className={classes.rectangle4}
          priority
          width={isMobile ? 65 : undefined}
          height={isMobile ? 65 : undefined}
        />
      </section>
    </div>
  );
};

export default Teams;
