"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md w-screen h-screen text-foreground select-none">
      {/* Container holding the custom animated elements */}
      <div className="relative w-72 h-32 flex items-end justify-center overflow-hidden">
        {/* height road speed line */}
        <div className="absolute bottom-6 left-0 w-full h-[3px] bg-foreground/10 overflow-hidden">
          <div
            className="w-[200%] h-full bg-repeating-linear-gradient loader-road-move"
            style={{
              backgroundImage:
                "linear-gradient(90deg, currentColor 0px, currentColor 25px, transparent 25px, transparent 50px)",
              color: "rgb(var(--border))",
              animation: "roadMove 0.3s linear infinite",
            }}
          />
        </div>

        <div
          className="w-full h-full flex items-end justify-start relative loader-truck-drive"
          style={{ animation: "truckDriveAhead 4s linear infinite" }}
        >
          {/* relative truck*/}
          <svg
            viewBox="0 0 220 100"
            className="w-52 h-26 mb-4 relative z-10 loader-truck-bounce"
            style={{ animation: "truckBounce 0.2s ease-in-out infinite" }}
          >
            {/* dynamic headlight glow*/}
            <polygon
              points="165,58 220,50 220,75 165,68"
              fill="url(#headlightGlow)"
              opacity="0.4"
            />

            <defs>
              <linearGradient
                id="truckCabin"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF3333" />
                <stop offset="100%" stopColor="#990000" />
              </linearGradient>

              <linearGradient
                id="truckContainer"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgb(var(--card-soft))" />
                <stop offset="100%" stopColor="rgb(var(--card))" />
              </linearGradient>

              <radialGradient id="headlightGlow" cx="0%" cy="50%" r="100%">
                <stop offset="0%" stopColor="rgba(0, 245, 212, 0.7)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* smoke*/}
            <g className="text-muted-foreground/30">
              <circle
                cx="22"
                cy="74"
                r="3"
                className="loader-smoke-1"
                style={{
                  transformOrigin: "22px 74px",
                  animation: "smoke 0.4s ease-out infinite 0s",
                }}
              />
              <circle
                cx="18"
                cy="73"
                r="4.5"
                className="loader-smoke-2"
                style={{
                  transformOrigin: "18px 73px",
                  animation: "smoke 0.4s ease-out infinite 0.1s",
                }}
              />
              <circle
                cx="14"
                cy="72"
                r="6"
                className="loader-smoke-3"
                style={{
                  transformOrigin: "14px 72px",
                  animation: "smoke 0.4s ease-out infinite 0.2s",
                }}
              />
            </g>

            {/* pipe */}
            <path
              d="M 25 75 L 32 75 L 32 72"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* Container */}
            <rect
              x="35"
              y="25"
              width="80"
              height="50"
              fill="url(#truckContainer)"
              stroke="currentColor"
              strokeWidth="2.5"
              rx="5"
            />

            {/* design  lines*/}
            <line
              x1="45"
              y1="35"
              x2="105"
              y2="35"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5"
              className="text-primary/40"
            />
            <line
              x1="45"
              y1="45"
              x2="105"
              y2="45"
              stroke="rgb(var(--primary))"
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* driver cabin*/}
            <path
              d="M 115 38 L 148 38 L 165 54 L 165 75 L 115 75 Z"
              fill="url(#truckCabin)"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            {/* window*/}
            <path
              d="M 120 43 L 144 43 L 155 54 L 120 54 Z"
              fill="rgb(var(--background))"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* back wheel*/}
            <g
              className="loader-wheel-spin"
              style={{
                transformOrigin: "55px 75px",
                animation: "wheelSpin 0.3s linear infinite",
              }}
            >
              <circle
                cx="55"
                cy="75"
                r="13"
                fill="rgb(var(--background))"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="55" cy="75" r="5" fill="currentColor" />
              <line
                x1="55"
                y1="62"
                x2="55"
                y2="88"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="42"
                y1="75"
                x2="68"
                y2="75"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </g>

            {/* front wheel*/}
            <g
              className="loader-wheel-spin"
              style={{
                transformOrigin: "135px 75px",
                animation: "wheelSpin 0.3s linear infinite",
              }}
            >
              <circle
                cx="135"
                cy="75"
                r="13"
                fill="rgb(var(--background))"
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="135" cy="75" r="5" fill="currentColor" />
              <line
                x1="135"
                y1="62"
                x2="135"
                y2="88"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <line
                x1="122"
                y1="75"
                x2="148"
                y2="75"
                stroke="currentColor"
                strokeWidth="2.5"
              />
            </g>
          </svg>

          {/* chaka wheel*/}
          <div
            className="absolute bottom-[22px] left-[36px] w-36 h-[4px] bg-black/20 rounded-full blur-[2px] loader-shadow-pulse"
            style={{ animation: "shadowPulse 0.2s ease-in-out infinite" }}
          />
        </div>
      </div>

      {/* Loader Text */}
      <p className="text-xl font-bold tracking-[0.25em] text-primary animate-pulse mt-4 uppercase font-poppins">
        BiblioDrop Delivering...
      </p>

      {/* Standard HTML style tag for guaranteed animations */}
      <style>{`
        @keyframes truckDriveAhead {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes wheelSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes truckBounce {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-1px);
          }
        }
        @keyframes roadMove {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(-10px);
          }
        }
        @keyframes smoke {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-30px, -15px) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes shadowPulse {
          0%,
          100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(0.95);
          }
        }
      `}</style>
    </div>
  );
}
