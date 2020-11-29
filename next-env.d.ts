/// <reference types="next" />
/// <reference types="next/types/global" />
interface Window {
  gtag?: (type: string, id: string, data: never) => void
}
