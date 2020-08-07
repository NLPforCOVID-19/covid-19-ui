import React from 'react';
import Container from 'react-bootstrap/Container';
import Link from 'next/link'

import meta from '../meta'

const Header = () => (
  <div>
    <div className="bg-info pt-1 pb-1">
      <Container>
        <h3 className="mb-0"><Link href="/"><a className="text-white">{meta.title}</a></Link></h3>
        <div className="small mt-0 text-white">
          <a href="http://nlp.ist.i.kyoto-u.ac.jp/" className="text-white">京都大学 黒橋・村脇研</a>,{' '}
          <a href="http://nlp-waseda.jp/" className="text-white">早稲田大学 河原研</a>,{' '}
          <a href="http://www.tkl.iis.u-tokyo.ac.jp/new/" className="text-white">東京大学 喜連川・豊田研</a>,{' '}
          <a href="https://mynlp.is.s.u-tokyo.ac.jp/ja/index" className="text-white">東京大学 宮尾研</a>,{' '}
          <a href="http://www-al.nii.ac.jp/ja/" className="text-white">NII 相澤研</a>,{' '}
          <a href="https://www.nlp.ecei.tohoku.ac.jp/" className="text-white">東北大学 乾研</a>,{' '}
          <a href="http://fusioncomplab.org/" className="text-white">筑波大学 森嶋研</a>.{' '}
          <a href="https://mt-auto-minhon-mlt.ucri.jgn-x.jp" className="text-white">Powered by みんなの自動翻訳 (NICT). </a>
        </div>
      </Container>
    </div>
  </div>
);

export default Header;
