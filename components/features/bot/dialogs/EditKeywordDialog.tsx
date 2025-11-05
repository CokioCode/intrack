import { FormInput } from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { useInformationList } from "@/hooks/useInformation";
import { keywordSchema, KeywordTypes } from "@/types/keywordTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "@tamagui/lucide-icons";
import { useForm } from "react-hook-form";
import { Button, Dialog, ScrollView, XStack, YStack } from "tamagui";
import { KeywordTagsList } from "../KeywordTagsList";
import { useKeywordPutQuery } from "@/hooks/useKeyword";
import { showToast } from "@/utils/toast";
import { useEffect } from "react";

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
      keywords: "",
      response: "",
    },
  });

  const keywordsValue = watch("keywords");

  useEffect(() => {
    if (keyword && open) {
      // Convert array to comma-separated string for display
      const keywordsString = Array.isArray(keyword.keywords)
        ? keyword.keywords.join(", ")
        : keyword.keywords || "";

      reset({
        keywords: keywordsString,
        response: keyword.response || "",
      });
    }
  }, [keyword, open, reset]);

  const onSubmit = async (data: KeywordTypes) => {
    const keywordsList = data.keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");

    if (keywordsList.length === 0) {
      showToast.error("Please add at least one keyword.");
      return;
    }

    // Send keywords as array, not string
    const payload = {
      keywords: keywordsList,
      response: data.response,
    };

    console.log(payload);

    try {
      await mutationPut.mutateAsync({ id: keyword.id, data: payload });
      onOpenChange(false);
      showToast.success("Keyword updated successfully.");
    } catch (error) {
      showToast.error("Failed to update keyword.");
    }
  };

  const keywordsList =
    keywordsValue && typeof keywordsValue === "string"
      ? keywordsValue
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k !== "")
      : [];

  const removeKeyword = (index: number) => {
    const updatedKeywords = keywordsList.filter((_, i) => i !== index);
    setValue("keywords", updatedKeywords.join(", "));
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
                />

                {keywordsList.length > 0 && (
                  <KeywordTagsList
                    keywords={keywordsList}
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
