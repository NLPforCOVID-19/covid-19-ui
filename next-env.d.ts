/// <reference types="next" />
/// <reference types="next/types/global" />
interface Window {
  gtag?: (type: 'config', id: string | undefined, data: { page_location: string }) => void
}
