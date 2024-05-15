import { useState, useEffect } from 'react';

export const useDisclosure = (
	initialState = false,
	onOpen?: () => void,
	onClose?: () => void
): {
	isOpen: boolean;
	toggle: () => void;
	open: () => void;
	close: () => void;
} => {
	const [open, setOpen] = useState(initialState);

	useEffect(() => {
		if (open) {
			onOpen?.();
		} else {
			onClose?.();
		}
	}, [open]);

	return {
		isOpen: open,
		toggle: () => setOpen(!open),
		open: () => setOpen(true),
		close: () => setOpen(false),
	};
};
