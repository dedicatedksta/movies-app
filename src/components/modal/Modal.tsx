import { AnimatePresence, motion } from "framer-motion";
import React, { FC, SetStateAction } from "react";
import { VscChromeClose } from "react-icons/vsc";

interface ModalProps {
	children: React.ReactNode;
	visible: boolean;
	setVisible: React.Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ children, visible, setVisible }) => {
	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0 }}
					onClick={() => setVisible(false)}
					className="inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] w-screen h-screen fixed "
				>
					<VscChromeClose className="text-4xl cursor-pointer text-gray-400 absolute top-8 right-8" />
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
