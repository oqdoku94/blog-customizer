import { useState, useEffect } from 'react';

export const useDisclosure = (
	initialState = false,
	onOpen?: () => void,
	onClose?: () => void
): {
	isOpen: boolean;
	toggle: () => void;
	setOpen: (value: boolean) => void;
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
		setOpen: (value: boolean) => setOpen(value),
	};
};
