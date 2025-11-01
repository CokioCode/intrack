import { INDIBIZ_LOGO, CITY } from "@/constants/imageConst";
import React from "react";
import { Image, View, YStack } from "tamagui";

export const LoginHeader = () => {
  return (
    <>
      <YStack
        backgroundColor="#071333"
        height={180}
        alignItems="center"
        justifyContent="center"
        position="relative"
        borderBottomColor="rgba(255, 255, 255, 0.2)"
        borderBottomWidth={4}
      >
        <Image
          source={CITY}
          objectFit="cover"
          width={"100%"}
          height={"70%"}
          position="absolute"
          bottom={0}
        />
      </YStack>
      <YStack alignItems="center" marginTop={-32} zIndex={10}>
        <View
          width={67}
          height={67}
          backgroundColor="#0721A9"
          borderRadius={4}
          alignItems="center"
          justifyContent="center"
          borderWidth={3}
          borderColor="white"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={8}
          elevationAndroid={8}
        >
          <Image
            source={INDIBIZ_LOGO}
            width={60}
            height={60}
            objectFit="contain"
          />
        </View>
      </YStack>
    </>
  );
};
