import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCheck, Code2, Copy, CreditCard, GitBranch, Github, Globe2, Menu, ShieldCheck, SlidersHorizontal, Wallet, X } from 'lucide-react';
import '../styles/landing.css';

const REPO = 'https://github.com/jaimedhenriques/hyperswitch';
const API_EXAMPLE = `curl http://localhost:8080/payments \\\n  -H "api-key: $AVENRA_TEST_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{
    "amount": 12800,
    "currency": "EUR",
    "confirm": false
  }'`;
const PROCESSORS = [
  { name: 'Stripe', mark: 'S', color: '#635bff', detail: 'Cards & wallets', allocation: '60%' },
  { name: 'Adyen', mark: 'a', color: '#176b42', detail: 'Global acquiring', allocation: '25%' },
  { name: 'Checkout.com', mark: 'C', color: '#263a51', detail: 'Card processing', allocation: '15%' },
];

function Mark({ size = 32 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="13" y="6" width="8" height="37" rx="4" transform="rotate(20 17 24.5)" fill="currentColor"/><rect x="27" y="6" width="8" height="37" rx="4" transform="rotate(-20 31 24.5)" fill="currentColor"/><path d="M16 29.5H32" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>;
}

function RoutingDiagram() {
  const [selected, setSelected] = useState(0);
  const [rerouted, setRerouted] = useState(false);
  return <div className="lp-flow" aria-label="Interactive example payment route">
    <div className="lp-flow-header"><span><span className="lp-live-dot"/>Payment flow</span><span>Illustrative route</span></div>
    <div className="lp-flow-payment"><span className="lp-payment-icon"><CreditCard size={22}/></span><div><span>Incoming payment</span><strong>€128.00 <span>EUR</span></strong></div><span className="lp-payment-method">VISA</span></div>
    <div className="lp-flow-trunk"><span className="lp-travel-dot"/><ArrowDown size={16}/></div>
    <div className="lp-route-engine"><span className="lp-engine-mark"><Mark size={29}/></span><div><strong>Avenra routing</strong><span>Your rules. The right processor.</span></div><SlidersHorizontal size={19}/></div>
    <div className="lp-flow-branches" aria-hidden="true"><svg viewBox="0 0 480 54" preserveAspectRatio="none"><path d="M240 0v20H72v34M240 20v34M240 20h168v34" fill="none" stroke="#d0d9cb" strokeWidth="1.5"/><path d={selected === 0 ? 'M240 0v20H72v34' : selected === 1 ? 'M240 0v54' : 'M240 0v20h168v34'} fill="none" stroke="#326e4e" strokeWidth="2.5"/></svg></div>
    <div className="lp-processors" role="group" aria-label="Choose the example processor">{PROCESSORS.map((processor, index) => <button key={processor.name} type="button" aria-pressed={selected === index} className={`lp-processor ${selected === index ? 'lp-processor-selected' : ''}`} onClick={() => { setSelected(index); setRerouted(true); }}><span className="lp-processor-top"><span className="lp-provider-mark" style={{ color: processor.color }}>{processor.mark}</span>{selected === index && <Check size={15}/>}</span><strong>{processor.name}</strong><span>{processor.detail}</span><span className="lp-allocation">{processor.allocation} allocation</span></button>)}</div>
    <div className="lp-flow-result" aria-live="polite"><span className="lp-result-icon"><CheckCheck size={17}/></span><div><strong>{rerouted ? `Example routed to ${PROCESSORS[selected].name}` : 'One payment. A clear path.'}</strong><span>Select a processor to explore the flow.</span></div></div>
  </div>;
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  async function copyExample() {
    try { await navigator.clipboard.writeText(API_EXAMPLE); setCopied(true); }
    catch { setCopied(false); }
  }
  const closeMenu = () => setMenuOpen(false);

  return <div className="lp-site">
    <a className="lp-skip" href="#main">Skip to content</a>
    <header className="lp-header"><div className="lp-nav-container"><a href="/" className="lp-brand" aria-label="Avenra home"><Mark/><span>Avenra</span></a><button className="lp-menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="lp-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button><nav id="lp-nav" className={`lp-nav ${menuOpen ? 'lp-nav-open' : ''}`} aria-label="Main navigation"><a href="#platform" onClick={closeMenu}>Platform</a><a href="#workspace" onClick={closeMenu}>Workspace</a><a href="#developers" onClick={closeMenu}>Developers</a><a className="lp-nav-repo" href={REPO} target="_blank" rel="noreferrer" onClick={closeMenu}>Open source<ArrowUpRight size={14}/></a><a className="lp-nav-cta" href="/app">Explore Avenra<ArrowRight size={16}/></a></nav></div></header>
    <main id="main">
      <section className="lp-hero lp-container">
        <div className="lp-hero-copy"><h1>Every payment.<br/><span>A better path.</span></h1><p>Bring your processors, payment methods, and routing together. Build a payment stack that moves on your terms.</p><div className="lp-hero-actions"><a className="button button-primary" href="/app">Explore the workspace<ArrowUpRight size={18}/></a><a className="lp-text-link" href="#platform">Meet the platform<ArrowDown size={16}/></a></div><div className="lp-hero-note"><GitBranch size={15}/><span>Open-source infrastructure. Yours to build on.</span></div></div>
        <RoutingDiagram/>
      </section>
      <div className="lp-connectors-strip"><div className="lp-container"><p>Your processors.<br/><strong>Connected.</strong></p><div className="lp-provider-list" aria-label="Example supported processors"><span className="lp-stripe">stripe</span><span className="lp-adyen">adyen</span><span className="lp-checkout">checkout.com</span><span className="lp-paypal">PayPal</span><span className="lp-worldpay">Worldpay</span></div></div></div>
      <section id="platform" className="lp-platform lp-container"><div className="lp-platform-intro"><h2>One integration.<br/>More possibilities.</h2><p>Your payment infrastructure should give you room to grow. Connect the pieces you need, keep the ones you trust, and see how they work together.</p><a className="lp-text-link" href={`${REPO}/tree/main/api-reference`} target="_blank" rel="noreferrer">Explore the payment APIs<ArrowUpRight size={17}/></a></div><div className="lp-capabilities"><article><div className="lp-capability-icon"><GitBranch size={24}/></div><div><h3>Give every payment a direction.</h3><p>Set routing rules across processors, define your fallback, and bring your payment decisions into one place.</p></div></article><article><div className="lp-capability-icon"><Wallet size={24}/></div><div><h3>Meet customers where they pay.</h3><p>Work with cards, wallets, and local payment methods through the connectors in your payment stack.</p></div></article><article><div className="lp-capability-icon"><Globe2 size={24}/></div><div><h3>Own the infrastructure behind it.</h3><p>Build on a modular Rust backend. Inspect the source, keep your integrations, and deploy in your own environment.</p></div></article></div></section>
      <section id="workspace" className="lp-workspace-section"><div className="lp-container lp-workspace-grid"><div className="lp-workspace-copy"><h2>Less searching.<br/>More seeing.</h2><p>From the first payment to the next routing decision, give your team a workspace that makes the details clear.</p><ul><li><Check size={17}/>A single view of payments and processors</li><li><Check size={17}/>Clear statuses and transaction timelines</li><li><Check size={17}/>Routing controls you can understand</li></ul><a className="button lp-lime-button" href="/app">Step inside the demo<ArrowUpRight size={18}/></a><span className="lp-demo-caption">Interactive workspace with sample data</span></div><div className="lp-workspace-preview"><div className="lp-preview-header"><div><Mark size={22}/><strong>Avenra</strong></div><span>Workspace preview</span></div><div className="lp-preview-body"><div className="lp-preview-heading"><h3>Your payments, at a glance.</h3><span>Demo data</span></div><div className="lp-preview-status"><span><span/>Payments</span><strong>All in one view<ArrowUpRight size={18}/></strong></div><div className="lp-preview-table" role="table" aria-label="Sample payments"><div className="lp-preview-row lp-preview-labels" role="row"><span role="columnheader">Customer</span><span role="columnheader">Amount</span><span role="columnheader">Status</span></div>{[{ name: 'Olivia Martin', amount: '€128.00', status: 'Succeeded', initials: 'OM' }, { name: 'Lucas Silva', amount: '€245.50', status: 'Succeeded', initials: 'LS' }, { name: 'Sofia Laurent', amount: '€89.00', status: 'Pending', initials: 'SL' }].map(payment => <div className="lp-preview-row" key={payment.name} role="row"><span role="cell"><span className="lp-avatar">{payment.initials}</span>{payment.name}</span><strong role="cell">{payment.amount}</strong><span role="cell"><span className={`lp-mini-status ${payment.status === 'Pending' ? 'lp-pending' : ''}`}><span/>{payment.status}</span></span></div>)}</div><a href="/app" className="lp-preview-link">View the demo workspace<ArrowRight size={16}/></a></div></div></div></section>
      <section id="developers" className="lp-developers lp-container"><div className="lp-developer-copy"><h2>Built to be<br/>built on.</h2><p>A clear API. A composable backend. The freedom to make it yours. Start locally, connect a test processor, and take the next step at your pace.</p><div className="lp-developer-links"><a className="lp-text-link" href={`${REPO}#run-the-existing-payment-backend`} target="_blank" rel="noreferrer">Get started locally<ArrowUpRight size={17}/></a><a className="lp-text-link" href={`${REPO}/tree/main/api-reference`} target="_blank" rel="noreferrer">Read the API source<ArrowUpRight size={17}/></a></div><div className="lp-source-note"><Code2 size={21}/><span>Built with Rust.<br/><strong>Available under Apache 2.0.</strong></span></div></div><div className="lp-code-window"><div className="lp-code-header"><span><span/><span/><span/></span><strong>create-payment.sh</strong><button type="button" aria-label="Copy API example" onClick={copyExample}>{copied ? <Check size={17}/> : <Copy size={17}/>}<span>{copied ? 'Copied' : 'Copy'}</span></button></div><pre><code>{API_EXAMPLE}</code></pre><div className="lp-code-footer"><ShieldCheck size={16}/><span>Local test example · uses your own test API key</span></div><span className="sr-only" role="status">{copied ? 'API example copied to clipboard' : ''}</span></div></section>
      <section className="lp-final-cta lp-container"><div><h2>Your payments.<br/>Your way forward.</h2><p>Explore the platform. Make it your own.</p></div><a className="button button-primary" href="/app">Explore Avenra<ArrowUpRight size={19}/></a></section>
    </main>
    <footer className="lp-footer"><div className="lp-container"><div className="lp-footer-top"><a className="lp-brand" href="/" aria-label="Avenra home"><Mark/><span>Avenra</span></a><span>Every payment. A better path.</span><div><a href={REPO} target="_blank" rel="noreferrer"><Github size={16}/>Source code</a><a href={`${REPO}/blob/main/LICENSE`} target="_blank" rel="noreferrer">License<ArrowUpRight size={14}/></a></div></div><div className="lp-footer-bottom"><span>Avenra · An independently branded open-source project</span><span>Built on Hyperswitch. Upstream attribution preserved.</span></div></div></footer>
  </div>;
}
