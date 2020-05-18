module.exports = {
  title: '新型コロナウイルス世界情報集約サイト',
  desc:
    'このサイトは、新型コロナウイルス感染症に関する世界各地域の公式サイトやニュースをクロールし、国・地域 × カテゴリ (「感染状況」「予防・緊急事態宣言」など) で集約、提示しています。',
  regions: {
    fr: [
      'http://fr.reuters.com/',
      'http://www.france24.com/',
      'http://www.gouvernement.fr/',
      'http://www.lci.fr/'
    ],
    us: ['http://globalbiodefense.com/', 'http://www.cdc.gov/'],
    eu: ['http://www.ecdc.europa.eu/'],
    cn: ['http://www.gov.cn/', 'http://health.ifeng.com/'],
    int: ['http://www.who.int/'],
    jp: [
      'http://www.mhlw.go.jp/',
      'http://www.niid.go.jp/',
      'http://www.kantei.go.jp/',
      'https://hazard.yahoo.co.jp/article/20200207'
    ],
    kr: ['http://www.cdc.go.kr/'],
    es: ['http://www.mscbs.gob.es/'],
    in: ['http://www.mygov.in/'],
    de: ['http://www.zusammengegencorona.de/']
  }
};
