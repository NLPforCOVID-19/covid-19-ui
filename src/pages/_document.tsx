import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { defaultLang } from '../translations'
import { Lang } from '../types'

const gtagScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.GA_TRACKING_ID}');`

class MyDocument extends Document<{ lang: Lang }> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { lang } = ctx.query
    return { ...initialProps, lang }
  }

  render() {
    return (
      <Html lang={this.props.lang || defaultLang}>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
          <script dangerouslySetInnerHTML={{ __html: gtagScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
