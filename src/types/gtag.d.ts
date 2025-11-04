// TypeScript declarations for Google Analytics gtag
interface Window {
  gtag: (
    command: 'config' | 'event' | 'consent',
    targetId: string,
    config?: Record<string, any>
  ) => void
}
