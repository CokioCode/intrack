import React from "react";
import { Text, XStack } from "tamagui";

export const LoginFooter = () => {
  return (
    <XStack justifyContent="center" marginTop={16} gap={4}>
      <Text fontSize={14} color="#666666">
        Need Help?
      </Text>
      <Text
        fontSize={14}
        color="#0066FF"
        fontWeight="600"
        onPress={() => {}}
        pressStyle={{ opacity: 0.7 }}
      >
        Contact us
      </Text>
    </XStack>
  );
};
