import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatbotBubbleProps {
  chatUrl: string;
  position?: "bottom-right" | "bottom-left";
}

export const ChatbotBubble = ({ chatUrl, position = "bottom-right" }: ChatbotBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = position === "bottom-right" 
    ? "bottom-6 right-6" 
    : "bottom-6 left-6";

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${positionClasses} z-50 w-[380px] h-[600px] glass rounded-2xl shadow-2xl overflow-hidden border border-primary/20`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-orange border-b border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Chat Assistant</h3>
                    <p className="text-xs text-white/80">We're here to help</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Content - n8n Embed */}
              <div className="flex-1 relative">
                {chatUrl ? (
                  <iframe
                    src={chatUrl}
                    className="w-full h-full border-0"
                    title="Chat Assistant"
                    allow="microphone; camera"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full p-6 text-center">
                    <div>
                      <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">
                        Chat URL not configured. Please add your n8n chat URL.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${positionClasses} z-50 w-14 h-14 bg-gradient-orange rounded-full shadow-lg flex items-center justify-center glow-orange hover:scale-110 transition-transform`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};
