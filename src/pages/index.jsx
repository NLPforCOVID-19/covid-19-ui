import React from "react";

import Layout from '@src/components/Layout';
import Description from "@src/components/Description";
import Map from '@src/components/Map';
import CountryList from '@src/components/CountryList';

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
