import React, { useState, useEffect, useRef } from 'react';

interface CountDownStatProps {
  value: string;
  label: string;
}

export const CountDownStat: React.FC<CountDownStatProps> = ({ value, label }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(value);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [liveSeconds, setLiveSeconds] = useState<number>(() => {
    // For time-based countdowns (e.g. 48hr -> 48 * 3600, 14 Days -> 14 * 86400)
    if (value.includes('48hr')) return 48 * 3600 - 142;
    if (value.includes('14 Days')) return 14 * 86400 - 3640;
    return 0;
  });

  const parsed = React.useMemo(() => {
    const clean = value.trim();
    let prefix = '';
    let rest = clean;
    if (rest.startsWith('₹')) {
      prefix = '₹';
      rest = rest.slice(1);
    } else if (rest.startsWith('$')) {
      prefix = '$';
      rest = rest.slice(1);
    } else if (rest.startsWith('+')) {
      prefix = '+';
      rest = rest.slice(1);
    }

    let suffix = '';
    if (rest.endsWith(' Cr')) {
      suffix = ' Cr';
      rest = rest.slice(0, -3);
    } else if (rest.endsWith(' L')) {
      suffix = ' L';
      rest = rest.slice(0, -2);
    } else if (rest.endsWith(' Days')) {
      suffix = ' Days';
      rest = rest.slice(0, -5);
    } else if (rest.endsWith('hr')) {
      suffix = 'hr';
      rest = rest.slice(0, -2);
    } else if (rest.endsWith('x')) {
      suffix = 'x';
      rest = rest.slice(0, -1);
    } else if (rest.endsWith('M')) {
      suffix = 'M';
      rest = rest.slice(0, -1);
    } else if (rest.endsWith('%')) {
      suffix = '%';
      rest = rest.slice(0, -1);
    } else if (rest.endsWith('+')) {
      suffix = '+';
      rest = rest.slice(0, -1);
    }

    const numStr = rest.replace(/,/g, '');
    const numeric = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const hasComma = clean.includes(',');

    return {
      prefix,
      target: isNaN(numeric) ? 0 : numeric,
      suffix,
      decimals,
      hasComma,
      isTimeMetric: suffix === 'hr' || suffix === ' Days',
    };
  }, [value]);

  const runAnimation = () => {
    if (parsed.target === 0) return;
    setIsCounting(true);

    const duration = 1600; // ms
    const startTime = performance.now();
    // Countdown effect: starts at 0 and counts up to target, or starts higher and counts down
    const startVal = 0;
    const endVal = parsed.target;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumeric = startVal + (endVal - startVal) * easedProgress;

      let formattedNumber = '';
      if (parsed.hasComma) {
        formattedNumber = Math.round(currentNumeric).toLocaleString();
      } else if (parsed.decimals > 0) {
        formattedNumber = currentNumeric.toFixed(parsed.decimals);
      } else {
        formattedNumber = Math.round(currentNumeric).toString();
      }

      setDisplayValue(`${parsed.prefix}${formattedNumber}${parsed.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsCounting(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Intersection observer to trigger on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            runAnimation();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, parsed]);

  // Live real-time countdown ticker for time metrics
  useEffect(() => {
    if (!parsed.isTimeMetric) return;
    const timer = setInterval(() => {
      setLiveSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [parsed.isTimeMetric]);

  const formatCountdown = (totalSec: number) => {
    if (parsed.suffix === 'hr') {
      const hours = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;
      return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    }
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    return `${days}d ${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;
  };

  return (
    <div
      ref={containerRef}
      className="group/stat cursor-pointer select-none"
      onClick={runAnimation}
      title="Click to replay countdown animation"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <div
          className={`font-editorial text-2xl sm:text-3xl lg:text-4xl font-normal text-[#173F35] tabular-nums tracking-tight transition-transform duration-300 ${
            isCounting ? 'scale-105 text-[#286A68]' : 'group-hover/stat:text-[#A88752]'
          }`}
        >
          {displayValue}
        </div>
        {isCounting && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#A88752] animate-ping inline-block" />
        )}
      </div>

      <div className="text-[11px] uppercase tracking-wider text-[#1C1614]/65 font-medium leading-tight">
        {label}
      </div>

      {/* Live countdown active badge for velocity metrics */}
      {parsed.isTimeMetric && (
        <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-[#A88752] font-semibold">
          <span className="w-1 h-1 rounded-full bg-[#173F35] animate-pulse inline-block" />
          <span>{formatCountdown(liveSeconds)}</span>
        </div>
      )}
    </div>
  );
};
