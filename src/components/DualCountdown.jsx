"use client";
import { useEffect, useState } from 'react';

export default function DualCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    morning: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    afternoon: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  });

  // Calculate target times (May 4, 2025 in user's local timezone)
  const getTargetTime = (hours) => {
    const date = new Date();
    date.setFullYear(2025, 4, 4); // May is month 4 (0-indexed)
    date.setHours(hours, 0, 0, 0);
    return date.getTime();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const morningTime = getTargetTime(9);
      const afternoonTime = getTargetTime(14);

      setTimeLeft({
        morning: calculateTimeLeft(now, morningTime),
        afternoon: calculateTimeLeft(now, afternoonTime)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(now, target) {
    const diff = target - now;
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      {/* Morning Exam Timer */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 shadow-lg border border-blue-400/20">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Morning Exam (9:00 AM)
        </h3>
        <TimerDisplay time={timeLeft.morning} />
        <ProgressBar time={timeLeft.morning} isMorning={true} />
        <p className="text-center mt-3 text-sm text-blue-200">
          {timeLeft.morning.days > 0 ? 'First Session' : 'Starts at 9:00 AM'}
        </p>
      </div>

      {/* Afternoon Exam Timer */}
      <div className="bg-gradient-to-br from-purple-900 to-fuchsia-900 rounded-2xl p-6 shadow-lg border border-purple-400/20">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          Afternoon Exam (2:00 PM)
        </h3>
        <TimerDisplay time={timeLeft.afternoon} />
        <ProgressBar time={timeLeft.afternoon} isMorning={false} />
        <p className="text-center mt-3 text-sm text-purple-200">
          {timeLeft.afternoon.days > 0 ? 'Second Session' : 'Starts at 2:00 PM'}
        </p>
      </div>
    </div>
  );
}

function TimerDisplay({ time }) {
  return (
    <div className="flex justify-center gap-2">
      {time.days > 0 && (
        <TimeUnit value={time.days} label="DAYS" />
      )}
      <TimeUnit value={time.hours} label="HOURS" />
      <TimeUnit value={time.minutes} label="MINUTES" />
      <TimeUnit value={time.seconds} label="SECONDS" />
    </div>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="bg-white/10 rounded-lg p-3 text-center min-w-[70px]">
      <div className="text-3xl font-bold text-white">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-white/80 text-xs">{label}</div>
    </div>
  );
}

function ProgressBar({ time, isMorning }) {
  const totalHours = isMorning ? 48 : 53; // 9AM (48h) vs 2PM (53h) from now
  const remainingHours = time.days * 24 + time.hours;
  const progress = Math.max(0, Math.min(100, (remainingHours / totalHours) * 100));

  return (
    <div className="mt-4 bg-white/20 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${isMorning ? 'bg-blue-400' : 'bg-purple-400'}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}