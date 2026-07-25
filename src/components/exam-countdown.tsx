"use client";

import { CalendarDays, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const EXAM_DATE = new Date("2026-10-11T13:00:00-03:00");
const SECOND_IN_MS = 1_000;
const MINUTE_IN_MS = 60 * SECOND_IN_MS;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;
const DAY_IN_MS = 24 * HOUR_IN_MS;

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function calculateCountdown(now: number): CountdownValue {
  const remaining = Math.max(0, EXAM_DATE.getTime() - now);

  return {
    days: Math.floor(remaining / DAY_IN_MS),
    hours: Math.floor((remaining % DAY_IN_MS) / HOUR_IN_MS),
    minutes: Math.floor((remaining % HOUR_IN_MS) / MINUTE_IN_MS),
    seconds: Math.floor((remaining % MINUTE_IN_MS) / SECOND_IN_MS),
    finished: remaining === 0,
  };
}

function formatTwoDigits(value: number) {
  return value.toString().padStart(2, "0");
}

export function ExamCountdown() {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const updateCountdown = () => setCountdown(calculateCountdown(Date.now()));

    updateCountdown();
    const timer = window.setInterval(updateCountdown, SECOND_IN_MS);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "DIAS", value: countdown ? String(countdown.days) : "--" },
    { label: "HORAS", value: countdown ? formatTwoDigits(countdown.hours) : "--" },
    { label: "MINUTOS", value: countdown ? formatTwoDigits(countdown.minutes) : "--" },
    { label: "SEGUNDOS", value: countdown ? formatTwoDigits(countdown.seconds) : "--" },
  ];

  const timerLabel = countdown
    ? `${countdown.days} dias, ${countdown.hours} horas, ${countdown.minutes} minutos e ${countdown.seconds} segundos para a prova objetiva`
    : "Carregando contagem regressiva para a prova objetiva";

  return (
    <div className="hero-countdown" role="timer" aria-label={timerLabel}>
      <div className="hero-countdown-header">
        <div className="hero-countdown-heading">
          <div className="hero-countdown-icon" aria-hidden="true">
            <CalendarDays />
          </div>
          <div className="hero-countdown-copy">
            <span>Prova objetiva</span>
            <strong>Contagem regressiva</strong>
          </div>
        </div>
        <span className="hero-countdown-badge">
          <RefreshCw aria-hidden="true" />
          Atualização automática
        </span>
      </div>

      {countdown?.finished ? (
        <strong className="hero-countdown-finished">PROVA REALIZADA</strong>
      ) : (
        <div className="hero-countdown-grid">
          {units.map((unit) => (
            <div className="hero-countdown-unit" key={unit.label}>
              <strong>{unit.value}</strong>
              <span>{unit.label}</span>
            </div>
          ))}
        </div>
      )}

      <p className="hero-countdown-date">
        11 de outubro de 2026 <span aria-hidden="true">&bull;</span> 13h às 18h
      </p>
    </div>
  );
}
