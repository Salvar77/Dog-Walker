"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import classes from "./Presale.module.scss";
import { useEffect, useState } from "react";
import PresaleBackground from "@/assets/img/PresaleBackground.svg";
import PresaleDogTraces from "@/assets/img/PresaleDogTraces.svg";
import Vector from "@/assets/img/PreSaleVector.svg";
import TokenIcon from "@/assets/img/TokenIcon1.svg";
import RocketIcon from "@/assets/img/PresaleRocket.svg";
import PresaleDogLogo from "@/assets/img/PresaleDogLogo.svg";
import Ellipse from "@/assets/img/Ellipse 3.svg";
import Ellipse2 from "@/assets/img/Ellipse 4.svg";
import PreSaleArrow from "@/assets/img/PresaleArrow.svg";
import PreSaleRectangleRight from "@/assets/img/PreSaleRectangleRight.svg";
import PreSaleRectangleRightTwo from "@/assets/img/PreSaleRectangleRightTwo.svg";
import { useAccount } from "wagmi";
import PurchaseModal from "../More/purchaseModal";
import PurchaseInstructionsModal from "../More/PurchaseInstructionsModal";
import { toast } from "react-toastify";
import Web3 from "web3";
import { icoAbi, icoAddress } from "@/contract/ico";
import { stakingAbi, stakingAddress } from "@/contract/staking";
import { dwtTokenAbi, dwtTokenAddress } from "@/contract/dwtToken";
import Link from "next/link";

const Presale = ({
  setHasMinimumPurchased,
  setBalanceOf,
  setReferAddress,
  referAddres,
  setUserSpendUsdc,
}: any) => {
  const { t } = useTranslation("presale");
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const [icoRemaining, setIcoRemaining] = useState<any>(0);
  const [currentPriceData, setCurrentPriceData] = useState<any>(0);
  const [tokensSoldData, setTokensSoldData] = useState<any>(0);
  const [percentageRaised, setPercentageRaised] = useState<any>(0);
  const [currentRound, setCurrentRound] = useState<any>(0);
  const web3 = new Web3("https://bsc-dataseed.binance.org/");

  const icoIntegrateContract = () => {
    const ico_Contract = new web3.eth.Contract(icoAbi, icoAddress);
    return ico_Contract;
  };
  const stakingIntegrateContract = () => {
    const stake_Contract = new web3.eth.Contract(stakingAbi, stakingAddress);
    return stake_Contract;
  };
  const dwtTokenIntegrateContract = () => {
    const ico_Contract = new web3.eth.Contract(dwtTokenAbi, dwtTokenAddress);
    return ico_Contract;
  };

  useEffect(() => {
    console.log("Tokens Sold", tokensSoldData);
  }, []);

  const getValue = async () => {
    try {
      const icoContract = icoIntegrateContract();
      const icoRemaining = await icoContract.methods.icoRemaining().call();
      const icoRemainingFromWei = web3.utils.fromWei(
        Number(icoRemaining),
        "ether"
      );
      setIcoRemaining(icoRemainingFromWei);
      const getCurrentPrice = await icoContract.methods
        .getCurrentPrice()
        .call();
      const getCurrentPriceFromWei = web3.utils.fromWei(
        Number(getCurrentPrice),
        "ether"
      );
      setCurrentPriceData(getCurrentPriceFromWei);
      const tokensSold = await icoContract.methods.tokensSold().call();
      const tokensSoldFromWei = web3.utils.fromWei(Number(tokensSold), "ether");
      setTokensSoldData(tokensSoldFromWei);
      const totalRaisedUSD = await icoContract.methods.totalRaisedUSD().call();
      const totalRaisedUSDFromWei = web3.utils.fromWei(
        Number(totalRaisedUSD),
        "ether"
      );
      const maxPaise = await icoContract.methods.MAX_RAISE().call();
      const maxPaiseFromWei = web3.utils.fromWei(Number(maxPaise), "ether");
      const percentageRaised =
        Number(maxPaiseFromWei) > 0
          ? Math.min(
              (Number(totalRaisedUSDFromWei) / Number(maxPaiseFromWei)) * 100,
              100
            )
          : 0;
      setPercentageRaised(percentageRaised);
      const currentRound = await icoContract.methods.currentRound().call();
      setCurrentRound(Number(currentRound));
    } catch (e) {
      console.log("e", e);
    }
  };
  const getValueByAddress = async () => {
    try {
      if (isConnected) {
        const icoContract = icoIntegrateContract();
        const stakeContract = stakingIntegrateContract();
        const dwtTokenContract = dwtTokenIntegrateContract();
        const hasMinimumPurchased = await stakeContract.methods
          .hasMinimumPurchased(address)
          .call();
        setHasMinimumPurchased(hasMinimumPurchased);
        const balanceOf = await dwtTokenContract.methods
          .balanceOf(address)
          .call();
        const balanceOfFromWei = web3.utils.fromWei(Number(balanceOf), "ether");
        setBalanceOf(balanceOfFromWei);
        const referrerOf = await icoContract.methods.referrerOf(address).call();
        setReferAddress(referrerOf);
        const userSpentUSD = await icoContract.methods
          .referrerOf(address)
          .call();
        const userSpentUSDFromWei = web3.utils.fromWei(
          Number(userSpentUSD),
          "ether"
        );
        setUserSpendUsdc(userSpentUSDFromWei);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  useEffect(() => {
    getValueByAddress();
  }, [isConnected]);

  useEffect(() => {
    getValue();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // wyliczamy datę końcową: teraz + 160 dni
    const target = Date.now() + 160 * 24 * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        // jeśli upłynął czas, zatrzymujemy i zerujemy
        clearInterval(timerId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    // uruchamiamy od razu i potem co sekundę
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={classes.background}>
      <div className={classes.bgWrapper}>
        <Image
          src={PresaleBackground}
          alt=""
          fill
          className={classes.bg}
          priority
        />
      </div>

      <section className={classes.presale} id="pre-sale">
        <div className={classes.header}>
          <h2 className={classes.heading}>{t("heading")}</h2>
          <button
            className={classes.howToBuy}
            onClick={() => setShowInfo(true)}
          >
            {t("howToBuy")}
            <span className={classes.arrow}>
              <Image src={PreSaleArrow} alt={t("alt.arrow")} width={7} />
            </span>
          </button>
        </div>
        <Image
          src={PresaleDogTraces}
          alt={t("alt.dogTraces")}
          className={classes.dogTraces}
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />

        <Image
          src={PreSaleRectangleRight}
          alt=""
          aria-hidden="true"
          className={classes.rectangle}
          width={isMobile ? 75 : undefined}
          height={isMobile ? 75 : undefined}
        />

        <Image
          src={PreSaleRectangleRightTwo}
          alt=""
          aria-hidden="true"
          className={classes.rectangleSecond}
          width={isMobile ? 100 : undefined}
          height={isMobile ? 100 : undefined}
        />

        <Image
          src={Ellipse}
          alt={t("alt.ellipse")}
          className={classes.ellipse}
        />

        <Image
          src={Ellipse2}
          alt={t("alt.ellipseTwo")}
          className={classes.ellipseTwo}
        />

        <div className={classes.presale__box}>
          <div className={classes.presale__boxOne}>
            <div className={classes.priceBox}>
              <span className={classes.label}>{t("launchPriceLabel")}</span>
              <span className={classes.price}>
                {t("price")} {currentPriceData}$
              </span>
              <span className={classes.listing}>
                {t("listingPriceLabel")}:{t("listingPrice")}
              </span>
              <Image
                src={Vector}
                alt={t("alt.vector")}
                className={classes.vector}
              />
              <Image
                src={PresaleDogLogo}
                alt={t("alt.dogLogo")}
                className={classes.dogLogo}
              />
            </div>
          </div>

          <div className={classes.presale__boxThree}>
            <div className={classes.progress}>
              <div className={classes.bar}>
                <div
                  className={classes.filled}
                  style={{ width: `${percentageRaised}%` }}
                />
                <span className={classes.percentage}>
                  {percentageRaised.toFixed(2)}%
                </span>
              </div>
              <div className={classes.infoRow}>
                <span className={classes.sold}>
                  {t("soldLabel")} {Number(tokensSoldData).toFixed(2)} DWT
                </span>
                <span className={classes.total}>
                  {t("totalLabel")} {Number(icoRemaining).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className={classes.presale__boxFour}>
            <div className={classes.timer}>
              <span className={classes.label}>{t("currentRound")}</span>
              <span className={classes.currentRound}>{currentRound}</span>
              <div className={classes.timerRow}>
                {[
                  { unit: "days", value: timeLeft.days },
                  { unit: "hours", value: timeLeft.hours },
                  { unit: "mins", value: timeLeft.minutes },
                  { unit: "secs", value: timeLeft.seconds },
                ].map((u, i, arr) => (
                  <React.Fragment key={u.unit}>
                    <div className={classes.unitGroup}>
                      <div className={classes.unitBox}>{u.value}</div>
                      <div className={classes.unitLabel}>{t(u.unit)}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={classes.colon}>:</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <small className={classes.until}>
                <Image src={RocketIcon} alt={t("alt.rocket")} />
                {t("until")}
              </small>
            </div>
          </div>

          <div className={classes.presale__boxFive}>
            <button
              className={classes.cta}
              onClick={() => {
                if (isConnected) {
                  setShowModal(true);
                } else {
                  toast.error("Please wallet connect first!");
                }
              }}
            >
              <span> {t("purchaseCTA")}</span>
            </button>
          </div>
        </div>

        <div className={classes.presale__foot}>
          <p className={classes.powered}>
            <span> {t("poweredPrefix")}</span>
            <Link href="https://tokenuj.pl">
              <button type="button" className={classes.poweredStrong}>
                <Image
                  src={TokenIcon}
                  alt={t("alt.tokenujIcon")}
                  width={isMobile ? 24 : undefined}
                  height={isMobile ? 24 : undefined}
                />
                TOKENUJ
              </button>
            </Link>
          </p>
        </div>
      </section>
      {/* Instructions modal */}
      <PurchaseInstructionsModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
      />

      <PurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        setShowModal={setShowModal}
        detailValue={getValue}
        getValueByAddress={getValueByAddress}
        referAddres={referAddres}
      />
    </div>
  );
};

export default Presale;
