import { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import {
  ScreenContainer,
  Input,
  Card,
  Title,
  BodyText,
} from "../../styles/GlobalStyles";
import { Pressable } from "react-native";

import { searchBusinessAndServices } from "../../services/businessService";

export default function Home({ navigation }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData() {
    try {
      const res = await searchBusinessAndServices(query);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  });

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <ScreenContainer>
      <Input
        placeholder="Pesquise por salões/barbearias ou serviços"
        value={query}
        onChangeText={setQuery}
        style={{ maxWidth: 300, alignSelf: "center" }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card shadow="md" style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <Pressable
              onPress={() =>
                navigation.navigate("BusinessDetail", { businessId: item.id })
              }
            >
              <Title>{item.name}</Title>
              <BodyText style={{ color: item.description ? "#666" : "" }}>
                {item.description}
              </BodyText>
            </Pressable>
          </Card>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ScreenContainer>
  );
}
