"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const targetTimes = [
  {
    id: 'morning',
    label: 'Morning Exam',
    target: new Date('May 4, 2025 09:00:00').getTime()
  },
  {
    id: 'afternoon',
    label: 'Afternoon Exam',
    target: new Date('May 4, 2025 14:00:00').getTime()
  }
];

export default function DualCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    morning: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    afternoon: { days: 0, hours: 0, minutes: 0, seconds: 0 }
  });

  useEffect(() => {
    const updateTimers = () => {
      const now = Date.now();
      const newTimeLeft = {};

      targetTimes.forEach(({ id, target }) => {
        const diff = target - now;

        if (diff <= 0) {
          newTimeLeft[id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          return;
        }

        newTimeLeft[id] = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        };
      });

      setTimeLeft(newTimeLeft);
    };

    updateTimers();
    const timer = setInterval(updateTimers, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      {targetTimes.map(({ id, label }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 shadow-xl border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            {label}
          </h3>
          
          <div className="flex justify-center gap-2">
            {/* Days */}
            {timeLeft[id].days > 0 && (
              <div className="bg-white/10 rounded-lg p-3 text-center min-w-[70px]">
                <div className="text-3xl font-bold text-white">
                  {String(timeLeft[id].days).padStart(2, '0')}
                </div>
                <div className="text-white/80 text-xs">DAYS</div>
              </div>
            )}
            
            {/* Time Units */}
            {['hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="bg-white/10 rounded-lg p-3 text-center min-w-[70px]">
                <div className="text-3xl font-bold text-white">
                  {String(timeLeft[id][unit]).padStart(2, '0')}
                </div>
                <div className="text-white/80 text-xs">
                  {unit.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div 
              className="bg-amber-400 h-2 rounded-full" 
              style={{
                width: `${calculateProgress(id, timeLeft[id])}%`
              }}
            />
          </div>

          {/* Status message */}
          <p className="text-center mt-3 text-sm text-white/80">
            {getStatusMessage(id, timeLeft[id])}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// Helper functions
function calculateProgress(id, time) {
  const totalHours = id === 'morning' ? 48 : 53; // 9AM (48h) vs 2PM (53h) from now
  const remainingHours = time.days * 24 + time.hours;
  return Math.max(0, Math.min(100, (remainingHours / totalHours) * 100));
}

function getStatusMessage(id, time) {
  if (time.days === 0 && time.hours === 0 && time.minutes === 0) {
    return 'Exam time has arrived!';
  }
  return id === 'morning' 
    ? 'First Exam Session' 
    : 'Second Exam Session';
}