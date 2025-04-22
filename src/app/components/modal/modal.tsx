"use client";
import React, { ReactNode} from "react";
import  {motion, AnimatePresence} from "framer-motion";

type ModalProps ={
    isOpen: Boolean;
    onClose: () => void;
    children: ReactNode;
};
 
export default function Modal ({isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;

    return(
        <AnimatePresence>
            {isOpen &&(
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
                    onClick={onClose}
                    initial={{opacity:0}}
                    animate = {{opacity : 1}}
                    exit={{opacity: 0}}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial = {{opacity : 0, y:50, scale: 0.95}}
                        animate = {{  opacity : 1, y:0, scale : 1 }}
                        exit={{ opacity : 0, y:50, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative"
                    >
                        <button
                            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// information
// 1. this is modal component that can be used many times
// 2. if (!isOpen) return null; these one to make sure that if isOpen is false it will not render anything
// 3. {isOpen &&() this is condition if isOpen true then render the modal
// 4.  onClick={(e) => e.stopPropagation()} prevent clicks inside the modal from closing it
// 5.  &times; this is a HTML entity for the multiplication sign (×), which is often used as a close button in modals.
