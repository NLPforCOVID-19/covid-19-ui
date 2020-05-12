import React from "react";
import Head from 'next/head';
import Header from '@src/components/Header';
import Description from "@src/components/Description";
import Map from '@src/components/Map';
import CountryList from '@src/components/CountryList';
import meta from '@src/meta';
import Footer from '@src/components/Footer';

const Index = () => {
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
      </Head>
      <Header />
      <Description />
      <Map />
      <CountryList />
      <Footer />
    </div>
  );
};

export default Index;
