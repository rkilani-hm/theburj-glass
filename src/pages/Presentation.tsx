import { motion } from "framer-motion";
import { Printer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Presentation = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white print:bg-white">
      {/* Print-hidden header */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="container mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Site</span>
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Document Content */}
      <div className="container mx-auto max-w-4xl px-6 py-24 print:py-12 print:px-12">
        
        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pb-16 border-b border-border print:break-after-page"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">Management Summary</p>
          <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Al Hamra Tower</h1>
          <p className="text-xl text-muted-foreground font-light">Website Design Direction & Content Strategy</p>
          <div className="mt-12 text-sm text-muted-foreground">
            <p>Prepared: January 2026</p>
            <p>Project: Al Hamra Tower Digital Presence</p>
          </div>
        </motion.div>

        {/* Section 1: Design Philosophy */}
        <Section title="1. Design Philosophy" subtitle="Core Concept: 'A Place of Gravity' (هيبة المكان)">
          <p className="text-muted-foreground mb-8">
            The website's design direction is built on three foundational principles from Arabic culture:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <PrincipleCard arabic="رصانة" term="Rasana" meaning="Architectural presence and weight" />
            <PrincipleCard arabic="ثبات" term="Thabat" meaning="Authority and stability" />
            <PrincipleCard arabic="وقار" term="Waqar" meaning="Dignity and reverence" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-3 text-destructive/80">What We Avoid</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Promotional or trend-driven aesthetics</li>
                <li>• Visual noise and excessive animations</li>
                <li>• Generic corporate website patterns</li>
                <li>• Store-like or commercial UI elements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-primary">What We Embrace</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Restraint and silence over visual noise</li>
                <li>• Editorial layouts over product-style cards</li>
                <li>• Architectural imagery as primary storytelling</li>
                <li>• White space and grid-based compositions</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Section 2: Visual Direction */}
        <Section title="2. Visual Direction">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-4">Color Palette</h4>
              <div className="space-y-3">
                <ColorSwatch color="bg-white border" label="White & Off-white" />
                <ColorSwatch color="bg-stone-100" label="Light Stone Tones" />
                <ColorSwatch color="bg-gray-200" label="Soft Greys" />
                <ColorSwatch color="bg-charcoal-800" label="Charcoal Accents" />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Typography</h4>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p><strong>Primary:</strong> Inter (Latin) / Noto Sans Arabic</p>
                <p><strong>Approach:</strong> Clean, architectural sans-serif</p>
                <p><strong>Headings:</strong> Generous letter-spacing, light weights</p>
                <p><strong>Body:</strong> Readable, professional, refined</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Site Architecture */}
        <Section title="3. Site Architecture" className="print:break-before-page">
          <div className="bg-muted/30 p-6 font-mono text-sm mb-8 overflow-x-auto">
            <pre className="text-muted-foreground">{`
┌─────────────────────────────────────────────────────────────┐
│  HOME  │  THE TOWER ▼  │  ENGAGE ▼  │  CONTACT             │
└─────────────────────────────────────────────────────────────┘
              │                    │
              ▼                    ▼
         ┌─────────┐          ┌──────────┐
         │Overview │          │ Business │
         │Origins  │          │ Leasing  │
         │Architect│          │ Services │
         │Engineer │          │ Location │
         │Rising   │          │Sustainab.│
         │Recognit.│          │Perspect. │
         └─────────┘          └──────────┘
            `.trim()}</pre>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium">Section</th>
                  <th className="text-left py-3 font-medium">Purpose</th>
                  <th className="text-left py-3 font-medium">Key Content</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">Home</td>
                  <td className="py-3">Entry & overview</td>
                  <td className="py-3">Hero video, Journey Timeline, Quick Facts</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">The Tower</td>
                  <td className="py-3">Technical deep-dive</td>
                  <td className="py-3">Origins, Architecture, Engineering, Construction, Awards</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">Engage</td>
                  <td className="py-3">Commercial & operational</td>
                  <td className="py-3">Business spaces, Leasing, Services, Location</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">Legacy</td>
                  <td className="py-3">Heritage connection</td>
                  <td className="py-3">Cinema history, Founders' vision</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">Perspective</td>
                  <td className="py-3">Experiential</td>
                  <td className="py-3">Height as viewpoint, panoramic studies</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground">Contact</td>
                  <td className="py-3">Inquiry</td>
                  <td className="py-3">Form, map, contact details</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 4: Content Narrative */}
        <Section title="4. Content Narrative" className="print:break-before-page">
          <h4 className="font-medium mb-6">The Tower Story Arc</h4>
          
          <div className="space-y-6">
            <NarrativeBlock 
              number="1" 
              title="Origins"
              points={[
                "Site history: Kuwait's first cinema district",
                "International design competition (2002)",
                "Founders' vision from Al Hamra Real Estate"
              ]}
            />
            <NarrativeBlock 
              number="2" 
              title="Architecture & Design"
              points={[
                "'Geometry of Removal' — spiraling floor plates",
                "60° counter-clockwise rotation from base to crown",
                "Jura limestone façade (24,000m²)",
                "Bisht-inspired cultural form"
              ]}
            />
            <NarrativeBlock 
              number="3" 
              title="Engineering Excellence"
              points={[
                "Hyperbolic paraboloid walls (412m flared structure)",
                "Torsional gravity response phenomenon",
                "Lamella bracing system (189,000kN capacity)",
                "5-80 MPa concrete strength range"
              ]}
            />
            <NarrativeBlock 
              number="4" 
              title="Rising (Construction 2005-2011)"
              points={[
                "5 construction phases visualized",
                "Scroll-driven tower build animation",
                "8-milestone timeline"
              ]}
            />
            <NarrativeBlock 
              number="5" 
              title="Recognition"
              points={[
                "CTBUH Research Paper citation",
                "Pioneer in parametric 3D modeling",
                "Free-form skyscraper achievement"
              ]}
            />
          </div>
        </Section>

        {/* Section 5: Interactive Features */}
        <Section title="5. Interactive Features" className="print:break-before-page">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 font-medium">Component</th>
                  <th className="text-left py-3 font-medium">Location</th>
                  <th className="text-left py-3 font-medium">Function</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">FloorPlanSelector</td>
                  <td className="py-3">Architecture</td>
                  <td className="py-3">Shows 60° spiral rotation across 5 floor levels</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">LamellaVisualization</td>
                  <td className="py-3">Architecture</td>
                  <td className="py-3">Animated buckling capacity analysis (A-E elements)</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">TowerCrossSection</td>
                  <td className="py-3">Sustainability</td>
                  <td className="py-3">Interactive vertical diagram with safety markers</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">ElevatorVisualization</td>
                  <td className="py-3">Business</td>
                  <td className="py-3">Express/local elevator route mapping</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-medium text-foreground">ConstructionStory</td>
                  <td className="py-3">Rising</td>
                  <td className="py-3">SVG tower that builds as user scrolls</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-foreground">HomeJourneyTimeline</td>
                  <td className="py-3">Home</td>
                  <td className="py-3">Section previews with animated nodes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 6: Key Differentiators */}
        <Section title="6. Key Differentiators" className="print:break-before-page">
          <div className="grid md:grid-cols-2 gap-8">
            <DifferentiatorCard 
              title="Architectural Authority"
              points={[
                "Content sourced from SOM technical papers",
                "Engineering specifications prominently featured",
                "No hyperbole — facts and figures speak"
              ]}
            />
            <DifferentiatorCard 
              title="Interactive Technical Education"
              points={[
                "Users can explore floor geometry changes",
                "Structural capacity visualized, not just stated",
                "Construction timeline becomes an experience"
              ]}
            />
            <DifferentiatorCard 
              title="Cultural Resonance"
              points={[
                "Heritage connection (cinema site history)",
                "Bisht form inspiration acknowledged",
                "Arabic language support throughout"
              ]}
            />
            <DifferentiatorCard 
              title="Editorial Over Commercial"
              points={[
                "Leasing presented as curated floor plans",
                "No unit counts or availability badges",
                "Prestige and discretion emphasized"
              ]}
            />
          </div>
        </Section>

        {/* Summary */}
        <Section title="7. Summary" className="print:break-before-page">
          <div className="bg-muted/30 p-8 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              The Al Hamra Tower website positions Kuwait's tallest building not as a commercial property, 
              but as an <span className="text-foreground font-medium">architectural achievement</span> and{" "}
              <span className="text-foreground font-medium">cultural landmark</span>.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-border">
              <SummaryPoint label="Gravity" desc="over flash" />
              <SummaryPoint label="Education" desc="over promotion" />
              <SummaryPoint label="Experience" desc="over information" />
              <SummaryPoint label="Dignity" desc="over trends" />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Document Version 1.0 • Prepared by Lovable AI • Al Hamra Tower Website Project</p>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const Section = ({ 
  title, 
  subtitle, 
  children, 
  className = "" 
}: { 
  title: string; 
  subtitle?: string; 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`mb-16 ${className}`}
  >
    <h2 className="text-2xl font-light tracking-wide mb-2">{title}</h2>
    {subtitle && <p className="text-muted-foreground mb-8">{subtitle}</p>}
    {!subtitle && <div className="mb-8" />}
    {children}
  </motion.section>
);

const PrincipleCard = ({ arabic, term, meaning }: { arabic: string; term: string; meaning: string }) => (
  <div className="bg-muted/30 p-6 text-center">
    <p className="text-3xl mb-2" style={{ fontFamily: 'Noto Sans Arabic, sans-serif' }}>{arabic}</p>
    <p className="font-medium">{term}</p>
    <p className="text-sm text-muted-foreground mt-1">{meaning}</p>
  </div>
);

const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 ${color}`} />
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

const NarrativeBlock = ({ number, title, points }: { number: string; title: string; points: string[] }) => (
  <div className="flex gap-4">
    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
      {number}
    </div>
    <div>
      <h5 className="font-medium mb-2">{title}</h5>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {points.map((point, i) => (
          <li key={i}>• {point}</li>
        ))}
      </ul>
    </div>
  </div>
);

const DifferentiatorCard = ({ title, points }: { title: string; points: string[] }) => (
  <div className="border border-border p-6">
    <h4 className="font-medium mb-4">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {points.map((point, i) => (
        <li key={i}>• {point}</li>
      ))}
    </ul>
  </div>
);

const SummaryPoint = ({ label, desc }: { label: string; desc: string }) => (
  <div>
    <p className="font-medium text-primary">{label}</p>
    <p className="text-xs text-muted-foreground">{desc}</p>
  </div>
);

export default Presentation;
