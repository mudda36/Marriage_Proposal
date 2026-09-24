import { useState, useMemo, useRef } from "react";

const HER_NAME = "Gowru";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Quicksand:wght@500;700&display=swap');
*{box-sizing:border-box;margin:0}
html,body,#root{height:100%}
.stage{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
  font-family:'Quicksand',sans-serif;background:radial-gradient(circle at 50% 30%,#ffd6e4,#ff9ec0 60%,#e0507f);}
.script{font-family:'Great Vibes',cursive}
.center{position:relative;z-index:2;text-align:center;padding:24px;color:#fff;max-width:640px}
.start{font-size:1.4rem;font-weight:700;padding:16px 44px;border:none;border-radius:999px;cursor:pointer;
  color:#c2185b;background:#fff;box-shadow:0 10px 30px rgba(150,0,60,.35);transition:transform .2s}
.start:hover{transform:scale(1.08)}
.title{font-size:clamp(2.4rem,8vw,4.5rem);line-height:1.1;text-shadow:0 4px 14px rgba(150,0,60,.4);margin-bottom:28px}
.btns{display:flex;gap:24px;justify-content:center;align-items:center;min-height:70px}
.btn{font-family:inherit;font-weight:700;font-size:1.3rem;border:none;border-radius:999px;padding:14px 40px;cursor:pointer;
  box-shadow:0 8px 20px rgba(150,0,60,.3)}
.yes{background:#fff;color:#c2185b;font-size:1.6rem;transition:transform .2s}
.yes:hover{transform:scale(1.12)}
.no{background:#7b1fa2;color:#fff;transition:left .25s,top .25s}
.heart{position:absolute;bottom:-60px;animation:rise linear infinite;user-select:none;pointer-events:none;z-index:1}
@keyframes rise{0%{transform:translateY(0) rotate(0);opacity:0}10%{opacity:.9}100%{transform:translateY(-115vh) rotate(40deg);opacity:0}}
.fall{position:absolute;top:-60px;animation:drop linear infinite;pointer-events:none;z-index:1}
@keyframes drop{to{transform:translateY(115vh) rotate(360deg)}}
.teddy{font-size:clamp(6rem,22vw,10rem);animation:bounce 1.4s ease-in-out infinite;display:inline-block}
@keyframes bounce{50%{transform:translateY(-16px) rotate(-4deg)}}
.pop{animation:pop .8s cubic-bezier(.2,1.6,.4,1) both}
@keyframes pop{from{transform:scale(0)}to{transform:scale(1)}}
.roses{font-size:2.2rem;letter-spacing:6px;margin:6px 0}
@media (prefers-reduced-motion:reduce){.heart,.fall,.teddy{animation:none}}
`;

const HEARTS = ["💖", "💗", "💕", "❤️", "💘", "💓"];

function Hearts({ count = 45, items = HEARTS, cls = "heart" }) {
  const list = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        e: items[i % items.length],
        left: Math.random() * 100,
        size: 18 + Math.random() * 38,
        dur: 6 + Math.random() * 8,
        delay: -Math.random() * 12,
      })),
    [count, items]
  );
  return list.map((h) => (
    <span
      key={h.i}
      className={cls}
      style={{ left: `${h.left}%`, fontSize: h.size, animationDuration: `${h.dur}s`, animationDelay: `${h.delay}s` }}
    >
      {h.e}
    </span>
  ));
}

export default function App() {
  const [page, setPage] = useState("start"); // start | ask | yes
  const [pos, setPos] = useState(null); // runaway position of "No"
  const noRef = useRef(null);

  const dodge = () => {
    const w = window.innerWidth - 160;
    const h = window.innerHeight - 80;
    setPos({ x: Math.random() * w, y: Math.random() * h });
  };

  return (
    <div className="stage">
      <style>{css}</style>

      {page === "start" && (
        <div className="center">
          <div className="teddy">💌</div>
          <h1 className="script title">Hey {HER_NAME}, I have something for you…</h1>
          <button className="start" onClick={() => setPage("ask")}>Start</button>
        </div>
      )}

      {page === "ask" && (
        <>
          <Hearts />
          <div className="center">
            <h1 className="script title">{HER_NAME}, I love you ❤️<br />Will you marry me?</h1>
            <div className="btns">
              <button className="btn yes" onClick={() => setPage("yes")}>Yes 💍</button>
              <button
                ref={noRef}
                className="btn no"
                onMouseEnter={dodge}
                onTouchStart={(e) => { e.preventDefault(); dodge(); }}
                onClick={dodge}
                style={pos ? { position: "fixed", left: pos.x, top: pos.y, zIndex: 5 } : undefined}
              >
                No
              </button>
            </div>
          </div>
        </>
      )}

      {page === "yes" && (
        <>
          <Hearts count={30} />
          <Hearts count={35} items={["🌹", "🌹", "🌷", "🌹"]} cls="fall" />
          <div className="center">
            <div className="teddy pop">🧸</div>
            <div className="roses">🌹🌹🌹🌹🌹</div>
            <h1 className="script title pop">I Love You SooooMuch, {HER_NAME}! 💖</h1>
            <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>She said YES! 🎉 Forever starts now.</p>
            <div className="roses">🌹🌹🌹🌹🌹</div>
          </div>
        </>
      )}
    </div>
  );
}
