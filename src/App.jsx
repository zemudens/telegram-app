import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App(){
  const [page,setPage]=useState(0);
  const [showModal,setShowModal]=useState(false);
  const [playing,setPlaying]=useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const audioRef = useRef(null);

const next = () => setPage((p) => Math.min(p + 1, 4));
const prev = () => setPage((p) => Math.max(p - 1, 0));

const toggleAudio = async () => {
  const audio = audioRef.current;
  if (!audio) return;

  try {
    audio.muted = false;
    audio.currentTime = 0; // reset biar pasti kedengeran

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (err) {
    console.log("PLAY ERROR:", err);

    // 🔥 fallback hack (WAJIB untuk Telegram)
    try {
      audio.muted = true;
      await audio.play();
      audio.muted = false;
    } catch (e) {
      console.log("TOTAL FAIL:", e);
    }
  }
};

function WindowFrame({ title = "THE CONFESSION", children }) {
  return (
    <div className="relative w-full h-full rounded-xl border border-white/20 bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden">

      {/* INNER BORDER */}
      <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none" />

      {/* TITLE BAR */}
      <div className="flex items-center justify-between px-3 py-1 text-[10px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 border-b border-white/20">
        <span className="tracking-widest text-white/80">
          {title}
        </span>

        <div className="flex gap-2 text-[10px] opacity-80">
          <span className="hover:text-white cursor-pointer">—</span>
          <span className="hover:text-white cursor-pointer">▢</span>
          <span className="hover:text-red-400 cursor-pointer">✕</span>
        </div>
      </div>

      {/* CONTENT */}
<div
  className="p-6 overflow-hidden flex flex-col justify-center"
  style={{ height: "calc(100% - 28px)" }}
>        {children}
      </div>
    </div>
  );
}

  return (
    <div className="h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="relative w-[360px] h-[640px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
 {/* AUDIO — PINDAH KE SINI */}
<audio
  ref={audioRef}
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  loop
  controls
/>
        
        {/* HOLOGRAPHIC OVERLAY */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[linear-gradient(120deg,rgba(255,0,255,0.2),rgba(0,255,255,0.2),rgba(255,255,255,0.2))] animate-[holo_6s_linear_infinite]"></div>

        {/* SCANLINES */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent 2px,white 3px)]"></div>

        <AnimatePresence mode="wait">
<motion.div
  key={page}
  initial={{opacity:0,y:40}}
  animate={{opacity:1,y:0}}
  exit={{opacity:0,y:-40}}
  transition={{duration:0.5}}
  className="h-full relative z-10"
>

  {/* MESSAGE ICON */}
<motion.img
  src="/message.png"
  onClick={() => setOpenMessage(true)}
  whileTap={{ scale: 0.9 }}
  initial={{ opacity: 0, y: -10 }}
  animate={{
    opacity: 1,
    y: [0, -1, 1, -1, 0],     // getar kecil
    rotate: [0, -2, 2, -2, 0], // sedikit tilt
  }}
  transition={{
    opacity: { duration: 0.4 },
    y: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
    rotate: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    }
  }}
className="
  absolute top-1 left-4
  w-10
  cursor-pointer
  z-30
  drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]
"
/>
  
<WindowFrame 
  title={
    ["ARCHIVE.exe","safe_space.exe","question.sys","choice.exe","player.exe"][page]
  }
>
    <div className="h-full flex flex-col justify-center">

          {/* PAGE 1 */}
          {page===0 && (
            <div className="text-center space-y-4">
              <img src="/chrome-heart.png" className="w-24 mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              <h1 className="text-4xl font-bold tracking-widest bg-gradient-to-r from-gray-300 via-white to-gray-500 bg-clip-text text-transparent animate-pulse">
                2026 ARCHIVE
              </h1>
              <p className="text-xs text-white/60">
                A quiet space to store feelings that never really left.
              </p>
            </div>
          )}

          {/* PAGE 2 */}
          {page===1 && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-white/20 px-3 py-1 text-[10px] flex justify-between">
                safe_space.exe <span>— ▢ ✕</span>
              </div>
              <div className="p-4 text-sm space-y-3 text-center">
                <img src="/danger.png" className="w-16 mx-auto" />
                For those moments when you feel a bit too much, or even when you don't feel like saying anything at all.
              </div>
            </div>
          )}

{/* PAGE 3 */}
{page===2 && (
  <div className="text-center space-y-4">
    <img src="/questionmark.png" className="w-40 mx-auto" />
    <p className="text-xs text-white/50">They say We can’t keep things undefined forever.</p>
    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
      Since 'friends' don't talk like we do. What’s the next move?
    </h2>
  </div>
)}

{/* PAGE 4 */}
{page===3 && (
  <div className="flex flex-col gap-4">
    <button onClick={()=>setShowModal(true)} className="py-3 rounded-xl bg-gradient-to-b from-white/40 to-white/10 border border-white/30 shadow-inner backdrop-blur-md hover:scale-105 transition">
      Fix the Status
    </button>
    <button onClick={()=>setShowModal(true)} className="py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md hover:scale-105 transition">
      Keep the Mystery
    </button>
  </div>
)}

{/* PAGE 5 (CD) */}
{page===4 && (
  <div className="text-center space-y-6 relative">

{/* MESSAGE / LETTER */}

{/* POPUP */}
<AnimatePresence>
  {openMessage && (
    <motion.div
      onClick={() => setOpenMessage(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-40"
    >
      {/* BACKGROUND BLUR */}
<div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-none" />      {/* CONTENT */}
      <motion.div
        onClick={(e) => e.stopPropagation()} // biar ga nutup pas klik text
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative flex items-center justify-center"
      >
        <div className="relative w-[260px] p-4 text-[10px] leading-[1.5] text-white/90">

          {/* blur cuma di belakang text */}
          <div className="absolute inset-0 backdrop-blur-md opacity-60" />

          {/* text */}
          <div className="relative">
            we were a mismatch of frequencies back then. i let go because i didn't know how to stay. 
            but time proved there’s a gap that only you can fill an "unfinished feeling" i couldn't delete. 
            it started with just wanting to hear from you, but it ended with me falling all over again. 
            just hoping that "us" in 2026 is the version that finally works. 
            Love should be fun, right?
          </div>

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    
    <div className="relative w-[70%] max-w-[260px] aspect-square mx-auto mt-24">
      <motion.img
        src="/cd.png"
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 3, ease: "linear" }}
        className="w-full h-full object-contain"
      />

      <img
        src="/guitar.png"
        className="
          absolute
          w-[65%]
          top-[18%]
          left-[72%]
          -translate-x-1/2
          rotate-[18deg]
          pointer-events-none
        "
      />
    </div>

<div className="space-y-2 relative z-50">
  <p className="text-xs text-white/60 animate-pulse">
    “Listen to this, then check your screen.”
  </p>

<div>
  <img
    onClick={toggleAudio}
    src={playing ? "/pause.png" : "/play.png"}
    className="w-16 mx-auto cursor-pointer"
  />
 </div>
</div>
    
          </div>
  </WindowFrame>
</motion.div>
        </AnimatePresence>

        {/* NAV */}
        <div className="absolute bottom-4 w-full flex justify-between px-6 text-xs opacity-60 z-10">
          <button onClick={prev}>Back</button>
          <button onClick={next}>Next</button>
        </div>

{/* MODAL */}
{showModal && (
  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-center relative overflow-hidden w-[80%] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-[shine_2s_linear_infinite]"></div>
      
      <p className="relative z-10 text-sm leading-relaxed font-medium">
        “Challenge accepted. I’m trying hard now. Pick up?”
      </p>
      
      <button 
        onClick={()=>setShowModal(false)} 
        className="mt-4 relative z-10 text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition"
      >
        [ close ]
      </button>
    </div>
  </div>
)}

        <style>{`
          @keyframes holo {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>

      </div>
    </div>
  );
}
