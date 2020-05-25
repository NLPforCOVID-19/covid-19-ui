module.exports = {
  title: '新型コロナウイルス世界情報集約サイト',
  desc:
    'このサイトは、新型コロナウイルス感染症に関する世界各地域の公式サイトやニュースをクロールし、国・地域 × カテゴリ (「感染状況」「予防・緊急事態宣言」など) で集約、提示しています。',
  regions: {
    us: ['http://globalbiodefense.com/', 'http://www.cdc.gov/'],
    cn: ['http://www.gov.cn/', 'http://health.ifeng.com/'],
    int: ['http://www.who.int/'],
    jp: [
      'http://www.mhlw.go.jp/',
      'http://www.niid.go.jp/',
      'http://www.kantei.go.jp/',
      'https://hazard.yahoo.co.jp/article/20200207'
    ],
    eur: [
      'http://www.ecdc.europa.eu/',
      'http://fr.reuters.com/',
      'http://www.france24.com/',
      'http://www.gouvernement.fr/',
      'http://www.lci.fr/',
      'http://www.mscbs.gob.es/',
      'http://www.zusammengegencorona.de/'
    ],
    asia: ['http://www.cdc.go.kr/', 'http://www.mygov.in/']
  },
  countryDisplayName: {
    fr: 'フランス',
    es: 'スペイン',
    de: 'ドイツ',
    eu: 'EU',
    kr: '韓国',
    in: 'インド'
  }
}
