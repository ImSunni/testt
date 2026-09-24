import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, MapPin, Linkedin, Github, Compass, Terminal, Shield } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sendStatus, setSendStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [transmissionPacket, setTransmissionPacket] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSendStatus('transmitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/max.wozniak2005@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: formData.subject || `Nouveau contact de ${formData.name}`,
          _template: "box",
          _captcha: "false"
        })
      });

      if (response.ok) {
        const packetMetadata = `--- SOCKET_TRANSMISSION_PROTOCOL ---
STATUS: 200 OK (COMMITTED)
IP: DECRYPTED_PREVIEW_HOST
PACKET_ID: TX-${Math.floor(Math.random() * 90000) + 10000}
TIME_STAMP: ${new Date().toISOString()}
FROM: <${formData.email}>
IDENTIFIER: "${formData.name.toUpperCase()}"
-------------------------------------
SECURE TRANSMISSION COMPLETED SUCESSFULLY.
Maximilien Wozniak vous répondra sous 24h.`;
        
        setTransmissionPacket(packetMetadata);
        setSendStatus('success');
      } else {
        console.error("Form submission failed:", await response.text());
        setSendStatus('idle');
        alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSendStatus('idle');
      alert("Une erreur de connexion est survenue. Veuillez réessayer.");
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSendStatus('idle');
    setTransmissionPacket(null);
  };

  return (
    <div className="py-20 px-6 md:px-12 max-w-6xl mx-auto bg-black text-white relative" id="section-contact">
      {/* Background massive watermark text */}
      <div className="absolute right-6 top-24 opacity-[0.03] select-none pointer-events-none z-0">
        <span className="text-[12rem] sm:text-[18rem] font-black leading-none tracking-tighter uppercase text-white block">
          POST
        </span>
      </div>

      {/* Editorial header */}
      <div className="space-y-2 mb-12 border-b border-neutral-900 pb-6 relative z-10">
        {/* Index Counter Line representing Bold Typography theme */}
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-accent-red font-mono text-xs font-bold">05 / 05</span>
          <div className="h-px w-16 bg-accent-red"></div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">// ACCORD DE CLAVIER</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tighter">
          PRENDRE <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.45)' }}>CONTACT</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-neutral-400 font-serif italic tracking-wide max-w-xl leading-relaxed">
          Disponible pour des projets freelances. En recherche d'un stage de 4 mois (avril à Juillet 2027).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Traditional contact coordinates & details */}
        <div className="lg:col-span-4 border border-neutral-900 bg-neutral-950/20 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-8">
            <span className="font-mono text-[9px] text-neutral-500 block uppercase tracking-widest">// COORDONNÉES DE TRAVAIL</span>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 border border-neutral-800 bg-neutral-950 text-accent-red">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-neutral-500 block uppercase font-bold">Localisation</span>
                  <p className="text-white text-sm font-semibold mt-1">Paris, France</p>
                  <span className="text-neutral-500 text-[11px] block mt-0.5 font-mono">Disponibilité : Internationale</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 border border-neutral-800 bg-neutral-950 text-accent-red">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-neutral-500 block uppercase font-bold">E-mail</span>
                  <a href="mailto:max.wozniak2005@gmail.com" className="text-white hover:text-accent-red text-sm font-semibold transition-colors mt-1 block">
                    max.wozniak2005@gmail.com
                  </a>
                  <span className="text-neutral-500 text-[11px] block mt-0.5 font-mono">Réponse moyenne en 12h.</span>
                </div>
              </div>
            </div>

            {/* Social Grid Connections */}
            <div className="space-y-3 pt-6 border-t border-neutral-900">
              <span className="font-mono text-[9px] text-neutral-500 block uppercase tracking-widest">// RÉSEAUX ET GALERIES</span>
              <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                <a
                  href="https://www.linkedin.com/in/maximilien-wozniak-3a129a355/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 border border-neutral-900 hover:border-accent-red/40 bg-neutral-950 text-neutral-400 hover:text-white transition-all"
                >
                  <Linkedin size={12} className="text-accent-red" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href="https://www.behance.net/candyflproduct"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 border border-neutral-900 hover:border-accent-red/40 bg-neutral-950 text-neutral-400 hover:text-white transition-all"
                >
                  <Compass size={12} className="text-accent-red" />
                  <span>PORTFOLIO ET GRAPHISME // BEHANCE</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-900 text-[10px] text-neutral-600 font-mono leading-normal mt-6">
            © {new Date().getFullYear()} // C00D-C0RE-SYS // ENCRYPTON ACTIVE
          </div>
        </div>

        {/* Right Column: Interaction form and dynamic success receipt feedback */}
        <div className="lg:col-span-8 border border-neutral-800 bg-neutral-950/70 p-6 md:p-8 relative">
          <div className="absolute top-0 right-0 font-mono text-[8px] p-2 text-neutral-600">// DIGITAL_SOCKET_FORM</div>

          <AnimatePresence mode="wait">
            {sendStatus === 'idle' && (
              <motion.form
                key="form-layout"
                onSubmit={handleFormSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="font-mono text-[9px] text-neutral-400 block uppercase font-semibold">Votre Nom complet <span className="text-accent-red">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nom / Entreprise"
                      className="w-full bg-black border border-neutral-800 focus:border-accent-red text-white p-3 font-mono text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="font-mono text-[9px] text-neutral-400 block uppercase font-semibold">Adresse mail <span className="text-accent-red">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@mail.com"
                      className="w-full bg-black border border-neutral-800 focus:border-accent-red text-white p-3 font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] text-neutral-400 block uppercase font-semibold">Sujet </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="ex. Stage ingénieur designer, Freelance, etc."
                    className="w-full bg-black border border-neutral-800 focus:border-accent-red text-white p-3 font-mono text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[9px] text-neutral-400 block uppercase font-semibold">Votre Message <span className="text-accent-red">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Racontez votre idée, objectifs, contraintes..."
                    className="w-full bg-black border border-neutral-800 focus:border-accent-red text-white p-3 font-mono text-xs shrink-0 focus:outline-none scrollbar-thin"
                    id="contact-message-input"
                  />
                </div>

                <div className="pt-2 text-left">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 bg-accent-red hover:bg-accent-red-hover text-white font-mono text-xs font-bold tracking-widest transition-all hover:scale-[1.01] flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-accent-red/25"
                  >
                    <span>TRANSMETTRE</span>
                    <Send size={12} />
                  </button>
                </div>
              </motion.form>
            )}

            {sendStatus === 'transmitting' && (
              <motion.div
                key="transmitting-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[300px] flex flex-col justify-center items-center text-center space-y-4"
              >
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <span className="w-12 h-12 border border-accent-red/30 absolute block" />
                  <span className="w-12 h-12 border-t-2 border-accent-red absolute block animate-spin" />
                  <Terminal size={18} className="text-accent-red" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white tracking-widest uppercase mb-1">// SECURE TRANSMISSION ACTIVE</h4>
                  <p className="font-mono text-[10px] text-neutral-500 animate-pulse">Envoie du message...</p>
                </div>
              </motion.div>
            )}

            {sendStatus === 'success' && (
              <motion.div
                key="success-layout"
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="h-full min-h-[300px] flex flex-col justify-between"
              >
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2.5 text-emerald-500 font-mono text-xs font-bold">
                    <CheckCircle size={16} />
                    <span>SYNAPSE ENVOYÉE AVEC SUCCÈS</span>
                  </div>

                  <p className="font-sans text-xs text-neutral-400">
                    Merci <span className="text-white font-semibold">{formData.name}</span>! Votre message a été correctement envoyé.
                  </p>

                  {/* ASCII Code Block Receipt */}
                  <div className="space-y-1 pt-2">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-wider block font-bold">// TRANSMISSION RAW RECEIPT :</span>
                    <div className="bg-black border border-neutral-900 rounded p-4 text-neutral-400 font-mono text-[9px] leading-wide overflow-x-auto whitespace-pre-wrap select-all">
                      {transmissionPacket}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-900 flex justify-between font-mono text-[9px] text-neutral-500 items-center mt-6">
                  <span>AES-256 SECURED CLIENT</span>
                  <button
                    onClick={handleReset}
                    className="text-accent-red hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    [Envoyer un nouveau message]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
