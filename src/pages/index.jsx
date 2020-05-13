import React from "react";

import Layout from '@src/components/Layout';
import Header from '@src/components/Header';
import Description from "@src/components/Description";
import Map from '@src/components/Map';
import CountryList from '@src/components/CountryList';
import Footer from '@src/components/Footer';

const Index = () => {
  return (
    <Layout>
      <Description />
      <Map />
      <CountryList />
    </Layout>
  );
};

export default Index;
