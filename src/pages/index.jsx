import React from "react";
import Head from 'next/head';
import Header from '../components/Header';
import Description from "../components/Description";
import Map from '../components/Map';
import CountryList from '../components/CountryList';
import meta from '../meta';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet" />
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
