import React from "react";

import Layout from '@src/components/Layout';
import Description from "@src/components/Description";
import Map from '@src/components/Map';
import NewsView from '@src/components/NewsView';

const Index = () => {
  return (
    <Layout>
      <Description />
      <Map />
      <NewsView />
    </Layout>
  );
};

export default Index;
