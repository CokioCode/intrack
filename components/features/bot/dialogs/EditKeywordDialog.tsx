import { FormInput } from "@/components/common/FormInput";
import { keywordSchema, KeywordTypes } from "@/types/keywordTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "@tamagui/lucide-icons";
import { useForm } from "react-hook-form";
import { Button, Dialog, ScrollView, XStack, YStack } from "tamagui";
import { KeywordTagsList } from "../KeywordTagsList";
import { useKeywordPutQuery } from "@/hooks/useKeyword";
import { showToast } from "@/utils/toast";
import { useEffect, useState } from "react";

interface EditKeywordDialogProps {
  keyword: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (keywordId: string) => void;
}

export const EditKeywordDialog = ({
  keyword,
  open,
  onOpenChange,
}: EditKeywordDialogProps) => {
  const mutationPut = useKeywordPutQuery();
  const [keywordInput, setKeywordInput] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<KeywordTypes>({
    resolver: zodResolver(keywordSchema),
    defaultValues: {
      keywords: [],
      response: "",
    },
  });

  const keywordsValue = watch("keywords");

  useEffect(() => {
    if (open && keyword) {
      const keywordsArray = Array.isArray(keyword.keywords)
        ? keyword.keywords
        : [];

      const keywordsString = keywordsArray.join(", ");

      setKeywordInput(keywordsString);

      reset({
        keywords: keywordsArray,
        response: keyword.response || "",
      });
    } else if (open && !keyword) {
      setKeywordInput("");
      reset({
        keywords: [],
        response: "",
      });
    }
  }, [keyword, open, reset]);

  const onSubmit = async (data: KeywordTypes) => {
    try {
      await mutationPut.mutateAsync({
        id: keyword.id,
        data: {
          keywords: data.keywords,
          response: data.response,
        },
      });
      onOpenChange(false);
      showToast.success("Keyword updated successfully!");
    } catch (error) {
      showToast.error("Failed to update keyword.");
    }
  };

  const handleKeywordInputChange = (value: string) => {
    setKeywordInput(value);
    const keywordsList = value
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");
    setValue("keywords", keywordsList, { shouldDirty: true });
  };

  const removeKeyword = (index: number) => {
    const updatedKeywords = keywordsValue.filter((_, i) => i !== index);
    setValue("keywords", updatedKeywords, { shouldDirty: true });
    setKeywordInput(updatedKeywords.join(", "));
  };

  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
          maxWidth={600}
          width="90%"
          maxHeight="80%"
        >
          <Dialog.Title fontSize="$6" fontWeight="700" color="$gray12">
            Edit Keyword
          </Dialog.Title>

          <Dialog.Description fontSize="$3" color="$gray10">
            Update keyword response for the bot
          </Dialog.Description>

          <ScrollView maxHeight={500}>
            <YStack gap="$4" paddingVertical="$2">
              <YStack gap="$2">
                <FormInput
                  control={control}
                  name="keywords"
                  label="Keywords *"
                  placeholder="Enter keywords separated by commas (e.g., hello, hi, greetings)"
                  autoCapitalize="none"
                  error={errors.keywords?.message}
                  value={keywordInput}
                  onChangeText={handleKeywordInputChange}
                />

                {keywordsValue.length > 0 && (
                  <KeywordTagsList
                    keywords={keywordsValue}
                    onRemove={removeKeyword}
                  />
                )}
              </YStack>

              <FormInput
                control={control}
                name="response"
                label="Response *"
                placeholder="Enter response message"
                autoCapitalize="none"
                multiline
                numberOfLines={4}
                error={errors.response?.message}
              />
            </YStack>
          </ScrollView>

          <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                backgroundColor="$gray5"
                color="$gray11"
                onPress={() => onOpenChange(false)}
                pressStyle={{ opacity: 0.8 }}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              backgroundColor="$blue9"
              color="white"
              onPress={handleSubmit(onSubmit)}
              pressStyle={{ opacity: 0.8 }}
              disabled={mutationPut.isPending}
            >
              {mutationPut.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </XStack>

          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
              icon={<X size={16} />}
              chromeless
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
