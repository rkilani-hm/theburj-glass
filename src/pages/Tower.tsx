import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Header from "@/components/alhamra/Header";
import Footer from "@/components/alhamra/Footer";
import EditableText from "@/components/admin/EditableText";
import { useHeroTheme } from "@/contexts/HeroThemeContext";
import towerFull  from "@/assets/tower-full-blue-sky.png";
import towerBW2   from "@/assets/tower-bw-2.png";
import towerFacade from "@/assets/tower-facade-twisted.png";
import towerAerial from "@/assets/tower-aerial-day.png";
import towerLow   from "@/assets/tower-lowangle-clouds.png";
import towerNight from "@/assets/tower-night-illuminated.jpg";
import towerSkyline from "@/assets/som-tower-skyline.jpg";

/* New assets — V3 revamp */
import towerMoonlight from "@/assets/tower-moonlight.jpg";
import towerFoggy from "@/assets/tower-foggy-skyline.jpg";

const R = ({ children, delay = 0, style, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} style={style} className={className} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

const SUB_PAGES = [
  { label: "Origins",           sub: "Founded 2004",               href: "/tower/origins",        img: towerBW2    },
  { label: "Rising",            sub: "Construction 2005–2011",      href: "/tower/rising",         img: towerFacade },
  { label: "Design & Engineering", sub: "SOM — Bisht form",        href: "/tower/design",         img: towerLow    },
  { label: "Sustainability",    sub: "Climate-responsive design",   href: "/tower/sustainability",  img: towerAerial },
  { label: "Awards",            sub: "Time Magazine 2011+",         href: "/tower/recognition",    img: towerNight  },
  { label: "Dashboard",         sub: "Building specifications",     href: "/tower/dashboard",      img: towerSkyline },
];

export default function Tower() {
  useHeroTheme("dark");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start","end start"] });
  const heroY  = useSpring(useTransform(scrollYProgress,[0,1],["0%","28%"]),{stiffness:55,damping:22});
  const heroOp = useTransform(scrollYProgress,[0,0.65],[1,0]);

  return (
    <div style={{ minHeight:"100vh", background:"#0A0A0A", overflowX:"hidden" }}>
      <Header />

      {/* Hero */}
      <section style={{ position:"relative", height:"90svh", minHeight:560, overflow:"hidden" }}>
        <motion.div style={{ position:"absolute", inset:0, y:heroY }}>
          <img src={towerFull} alt="Al Hamra Tower"
            style={{ width:"100%", height:"115%", objectFit:"cover", objectPosition:"center 15%" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,10,10,0.92) 0%,rgba(10,10,10,0.4) 45%,rgba(10,10,10,0.55) 100%)" }} />
        </motion.div>
        <motion.div style={{ position:"absolute", bottom:0, left:0, right:0, opacity:heroOp }} className="container-fluid">
          <div style={{ paddingBottom:"clamp(3rem,6vw,6rem)", maxWidth:820 }}>
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.9,delay:0.3,ease:[0.16,1,0.3,1]}}>
              <EditableText cms="tower.eyebrow" tag="p" className="eyebrow-light" style={{marginBottom:20}} oneLine />
            </motion.div>
            <div style={{overflow:"hidden"}}>
              <motion.div initial={{y:"105%"}} animate={{y:0}} transition={{duration:1.15,delay:0.5,ease:[0.16,1,0.3,1]}}>
                <EditableText cms="tower.headline" tag="h1" oneLine style={{
                  fontFamily:"var(--font-display)", fontSize:"clamp(3.5rem,9vw,10rem)",
                  fontWeight:300, lineHeight:0.9, letterSpacing:"-0.035em", color:"#fff", margin:0,
                }} />
              </motion.div>
            </div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.95,ease:[0.16,1,0.3,1]}}>
              <EditableText cms="tower.intro" tag="p" style={{
                fontFamily:"var(--font-sans)", fontSize:"clamp(0.88rem,1vw,0.98rem)",
                fontWeight:300, lineHeight:1.8, color:"rgba(255,255,255,0.42)", maxWidth:480, marginTop:24,
              }} />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Identity */}
      <section style={{ background:"#fff", padding:"clamp(6rem,12vw,12rem) 0" }}>
        <div className="container-fluid">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <R><EditableText cms="tower.identity.label" tag="p" className="eyebrow" oneLine style={{marginBottom:20}} /></R>
              <R delay={0.08}>
                <EditableText cms="tower.identity.h" tag="h2" oneLine style={{
                  fontFamily:"var(--font-display)", fontSize:"clamp(2rem,4vw,4.5rem)",
                  fontWeight:400, lineHeight:1.06, letterSpacing:"-0.025em", color:"var(--ink)",
                }} />
              </R>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
              <R delay={0.18}>
                <EditableText cms="tower.identity.p1" tag="p" style={{
                  fontFamily:"var(--font-sans)", fontSize:"1rem", fontWeight:300,
                  lineHeight:1.9, color:"var(--ink-light)", marginBottom:20,
                }} />
                <EditableText cms="tower.identity.p2" tag="p" style={{
                  fontFamily:"var(--font-sans)", fontSize:"1rem", fontWeight:300,
                  lineHeight:1.9, color:"var(--ink-light)", marginBottom:36,
                }} />
                <Link to="/tower/design" className="btn-arrow">
                  <EditableText cms="tower.explore.label" oneLine />
                </Link>
              </R>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop:"clamp(4rem,8vw,8rem)", borderTop:"1px solid var(--border)" }}>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                {v:"412m",l:"Height",d:"Kuwait's tallest structure"},
                {v:"80",l:"Floors",d:"Above-ground office levels"},
                {v:"195,000",l:"m² Total Area",d:"Office + retail + amenities"},
                {v:"2011",l:"Completed",d:"November opening"},
              ].map((s,i) => (
                <R key={s.l} delay={i*0.07}>
                  <div style={{padding:"clamp(2rem,4vw,3rem) 0",paddingLeft:i>0?"clamp(1.5rem,3vw,3rem)":0,borderLeft:i>0?"1px solid var(--border)":"none"}}>
                    <div style={{fontFamily:"var(--font-display)",fontSize:"clamp(2.5rem,5vw,5.5rem)",fontWeight:300,lineHeight:1,letterSpacing:"-0.04em",color:"var(--ink)",marginBottom:8}}>{s.v}</div>
                    <p className="eyebrow" style={{marginBottom:6}}>{s.l}</p>
                    <p style={{fontFamily:"var(--font-sans)",fontSize:"12px",fontWeight:300,color:"var(--ink-faint)"}}>{s.d}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Night quote */}
      <section style={{position:"relative",height:"clamp(400px,55vw,700px)",overflow:"hidden"}}>
        <motion.img src={towerNight} alt="Al Hamra at night"
          style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}}
          initial={{scale:1.06}} whileInView={{scale:1}} viewport={{once:true}}
          transition={{duration:2.8,ease:"easeOut"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(10,10,10,0.75) 0%,rgba(10,10,10,0.3) 60%)"}} />
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <R>
            <EditableText cms="tower.quote" tag="blockquote" style={{
              fontFamily:"var(--font-display)",fontSize:"clamp(1.3rem,2.8vw,2.8rem)",
              fontWeight:300,fontStyle:"italic",color:"rgba(255,255,255,0.82)",
              textAlign:"center",maxWidth:720,padding:"0 2rem",lineHeight:1.4,letterSpacing:"-0.01em",
            }} />
            <EditableText cms="tower.quote.attr" tag="p" oneLine style={{
              fontFamily:"var(--font-sans)",fontSize:"10px",letterSpacing:"0.2em",
              textTransform:"uppercase",color:"rgba(255,255,255,0.28)",textAlign:"center",marginTop:24,
            }} />
          </R>
        </div>
      </section>

      {/* Sub-page nav */}
      <section style={{background:"var(--surface)",padding:"clamp(6rem,12vw,12rem) 0"}}>
        <div className="container-fluid">
          <R style={{marginBottom:"clamp(3rem,6vw,5rem)"}}>
            <p className="eyebrow" style={{marginBottom:16}}>Explore the Tower</p>
            <EditableText cms="tower.explore.sub" tag="h2" oneLine style={{
              fontFamily:"var(--font-display)",fontSize:"clamp(2rem,4vw,4.5rem)",
              fontWeight:400,lineHeight:1.06,letterSpacing:"-0.025em",color:"var(--ink)",
            }} />
          </R>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUB_PAGES.map((p,i) => (
              <R key={p.href} delay={i*0.07}>
                <Link to={p.href} style={{display:"block"}}>
                  <div style={{aspectRatio:"4/3",overflow:"hidden",marginBottom:14}}>
                    <motion.img src={p.img} alt={p.label} loading="lazy"
                      style={{width:"100%",height:"100%",objectFit:"cover",filter:"grayscale(20%)"}}
                      whileHover={{scale:1.05}} transition={{duration:0.85,ease:[0.16,1,0.3,1]}} />
                  </div>
                  <p className="eyebrow" style={{marginBottom:6}}>{p.sub}</p>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <h3 style={{fontFamily:"var(--font-display)",fontSize:"1.35rem",fontWeight:400,letterSpacing:"-0.01em",color:"var(--ink)"}}>{p.label}</h3>
                    <span style={{fontFamily:"var(--font-sans)",fontSize:"12px",color:"var(--ink-faint)"}}>→</span>
                  </div>
                </Link>
              </R>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
