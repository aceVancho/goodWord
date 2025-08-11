/// <reference types="vite/client" />

declare global {
	interface Window {
		api: {
			onCopyText: (callback: (text: string) => void) => void
		}
	}
}
export {}
