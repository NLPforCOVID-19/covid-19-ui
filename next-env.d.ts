/// <reference types="next" />
/// <reference types="next/types/global" />
interface Window {
  gtag?: (type: 'config', id: string | undefined, data: { page_location: string }) => void
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly
    readonly NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: string
  }
}
