import { useState } from "react";
import RNDateTimePickerModal from "react-native-modal-datetime-picker";
import { BodyText, ButtonText } from "../styles/GlobalStyles";
import styled from "styled-components/native";
import { useTheme } from "../contexts/ThemeContext";

const Container = styled.View`
  width: 100%;
`;

export function DateTime({ label, date, onConfirm, minimumDate }) {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  const handleConfirm = (selectedDate) => {
    setIsVisible(false);
    onConfirm(selectedDate);
  };

  return (
    <Container>
      <BodyText
        onPress={() => setIsVisible(true)}
        style={{
          padding: 12,
          textAlign: "center",
          fontFamily: theme.fonts.secondarySemiBold,
        }}
      >
        {date ? date.toLocaleString() : label}
      </BodyText>

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
