import { useState } from "react";
import RNDateTimePickerModal from "react-native-modal-datetime-picker";
import { ButtonText } from "../styles/GlobalStyles";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
`;

export function DateTime({ label, date, onConfirm, minimumDate }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleConfirm = (selectedDate) => {
    setIsVisible(false);
    onConfirm(selectedDate);
  };

  return (
    <Container>
      <ButtonText
        onPress={() => setIsVisible(true)}
        style={{ padding: 12, textAlign: "center" }}
      >
        {date ? date.toLocaleString() : label}
      </ButtonText>

      <RNDateTimePickerModal
        isVisible={isVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        minimumDate={minimumDate || new Date()}
        is24Hour={true}
        headerTextIOS={label}
      />
    </Container>
  );
}
