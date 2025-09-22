import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { searchBusinessAndServices } from "../../services/businessService";

const SearchInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin: 16px;
  font-size: 16px;
`;

const BusinessCard = styled.View`
  background-color: #fff;
  padding: 16px;
  margin: 8px 16px;
  border-radius: 12px;
  elevation: 2; /*sombra Android*/
  shadow-color: #000; /* sombra iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const BusinessTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const BusinessDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

export default function Home() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await searchBusinessAndServices(query);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
      <SearchInput
        placeholder="Pesquise por salões/barbearias ou serviços"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <BusinessCard>
            <BusinessTitle>{item.name}</BusinessTitle>
            <BusinessDescription>{item.description}</BusinessDescription>
          </BusinessCard>
        )}
      />
    </>
  );
}
