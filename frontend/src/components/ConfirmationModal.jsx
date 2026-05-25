import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  heading,
  title,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info", // "info" | "warning" | "danger"
}) => {
  // Listen to Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Determine icon and style based on modal type
  const getModalStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
          iconBg: "bg-red-50 ring-red-500/10 border-red-100",
          confirmButton: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-500/20 text-white focus:ring-red-500",
          topBorder: "border-t-4 border-red-500",
        };
      case "warning":
        return {
          icon: <AlertCircle className="h-6 w-6 text-amber-500" />,
          iconBg: "bg-amber-50 ring-amber-500/10 border-amber-100",
          confirmButton: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-amber-500/20 text-white focus:ring-amber-500",
          topBorder: "border-t-4 border-amber-500",
        };
      case "info":
      default:
        return {
          icon: <Info className="h-6 w-6 text-indigo-500" />,
          iconBg: "bg-indigo-50 ring-indigo-500/10 border-indigo-100",
          confirmButton: "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-indigo-500/20 text-white focus:ring-indigo-500",
          topBorder: "border-t-4 border-indigo-500",
        };
    }
  };

  const styles = getModalStyles();

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-md glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/60 ${styles.topBorder}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100/50 transition-all"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6">
              {/* Content Layout */}
              <div className="flex items-start gap-4">
                {/* Glowing Circular Icon Wrapper */}
                <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-2xl border ring-4 ${styles.iconBg}`}>
                  {styles.icon}
                </div>

                <div className="flex-1 mt-1">
                  {/* Heading */}
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                    {heading}
                  </h3>
                  
                  {/* Title / Description */}
                  <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
                    {title}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 active:scale-[0.98] transition-all border border-slate-200/50 bg-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:-translate-y-[1px] active:scale-[0.98] active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.confirmButton}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ConfirmationModal;
