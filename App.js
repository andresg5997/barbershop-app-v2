import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { Text } from 'react-native';
import { apiUrl, salonId, salonUrl } from './imports';

export default function App() {
  const [selectedSalonUrl, setSelectedSalonUrl] = useState(salonUrl);

  useEffect(() => {
    // fetchSalonData();
    setSelectedSalonUrl(salonUrl);
  }, []);

  // const fetchSalonData = async () => {
  //   const url = `${apiUrl}GetSalonByGuid?guid=${salonId}`;

  //   try {
  //     const res = await axios.get(url);
  //     setSelectedSalonUrl(res.data.Url);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   return {};
  // };

  return <WebView source={{ selectedSalonUrl }} />;
}
