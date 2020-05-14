export default {
  title: '新型コロナウイルス世界情報集約サイト',
  desc:
    'このサイトは、新型コロナウイルス感染症に関する世界の情報を集約し提示しています。 世界の各地域の公式サイトやニュースをクロール、日本語に機械翻訳し、「感染状況」「予防・緊急事態宣言」などのカテゴリに自動分類しています。 自動分類されたカテゴリは順次、クラウドソーシングによって検証しています。',
  regions: {
    fr: ['fr.reuters.com', 'www.france24.com', 'www.gouvernement.fr', 'www.lci.fr'],
    us: ['globalbiodefense.com', 'www.cdc.gov'],
    eu: ['www.ecdc.europa.eu'],
    cn: ['www.gov.cn', 'health.ifeng.com'],
    int: ['www.who.int'],
    jp: ['www.mhlw.go.jp', 'www.niid.go.jp', 'www.kantei.go.jp', 'hazard.yahoo.co.jp/article/20200207'],
    kr: ['www.cdc.gov.kr'],
    es: ['www.mscbs.gob.es'],
    in: ['www.mygov.in'],
    de: ['www.zusammengegencorona.de']
  }
}
