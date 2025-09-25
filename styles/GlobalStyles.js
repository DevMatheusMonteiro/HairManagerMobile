import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const GlobalContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    padding: 16,
  },
}))`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.medium}px;
  padding: 16px;
  margin-vertical: 8px;
  ${({ theme, shadow = "sm" }) => theme.shadows[shadow]};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 14px;
  border-radius: ${({ theme }) => theme.radius.medium}px;
  align-items: center;
  justify-content: center;
  ${({ theme, shadow = "sm" }) => theme.shadows[shadow]};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondarySemiBold};
  font-size: 16px;
  color: #fff;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.textSecondary,
}))`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16px;
  padding: 12px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.small}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.textSecondary}33;
  ${({ theme, shadow = "sm" }) => theme.shadows[shadow]};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primaryBold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondarySemiBold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const BodyText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SmallText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.textSecondary}33;
  margin-vertical: 12px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SpaceBetween = styled(Row)`
  justify-content: space-between;
`;

export const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
