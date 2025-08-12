/// <reference types="vite/client" />

declare global {
	interface Window {
		api: {
			onCopyText: (callback: (text: string) => void) => void,
      invoke: (channel: string, ...args: any[]) => Promise<any>,
      on: (channel: string, listener: (...args: any[]) => void) => void
		}
	}
}
export {}
