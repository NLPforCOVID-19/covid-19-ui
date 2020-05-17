module.exports = {
  title: '新型コロナウイルス世界情報集約サイト',
  desc:
    'このサイトは、新型コロナウイルス感染症に関する世界の情報を集約し提示しています。 世界の各地域の公式サイトやニュースをクロール、日本語に機械翻訳し、「感染状況」「予防・緊急事態宣言」などのカテゴリに自動分類しています。 自動分類されたカテゴリは順次、クラウドソーシングによって検証しています。',
  regions: {
    fr: ['http://fr.reuters.com/', 'http://www.france24.com/', 'http://www.gouvernement.fr/', 'http://www.lci.fr/'],
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
}
