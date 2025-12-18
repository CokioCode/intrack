import { FormInput } from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { FormDatePicker } from "@/components/common/FormDatePicker";
import { InformationSchema, InformationTypes } from "@/types/informationTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Image as ImageIcon, Trash2 } from "@tamagui/lucide-icons";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  ScrollView,
  XStack,
  YStack,
  Text,
  Image,
  Input,
} from "tamagui";
import { KeywordTagsList } from "../KeywordTagsList";
import { useInformationPutQuery } from "@/hooks/useInformation";
import { showToast } from "@/utils/toast";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";

interface EditInformationDialogProps {
  information: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const parseKeywords = (keywords: any): string[] => {
  if (!keywords) return [];

  if (Array.isArray(keywords)) {
    const allKeywords: string[] = [];

    keywords.forEach((k) => {
      if (typeof k === "object" && k !== null && "keywords" in k) {
        if (Array.isArray(k.keywords)) {
          k.keywords.forEach((keyword: any) => {
            const trimmed = String(keyword).trim();
            if (trimmed) allKeywords.push(trimmed);
          });
        } else {
          const trimmed = String(k.keywords).trim();
          if (trimmed) allKeywords.push(trimmed);
        }
      } else {
        const trimmed = String(k).trim();
        if (trimmed) allKeywords.push(trimmed);
      }
    });

    return allKeywords;
  }

  if (typeof keywords === "string") {
    try {
      const parsed = JSON.parse(keywords);
      if (Array.isArray(parsed)) {
        return parsed.map((k) => String(k).trim()).filter((k) => k !== "");
      }
    } catch {
      return keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k !== "");
    }
  }

  return [];
};

export const EditInformationDialog = ({
  information,
  open,
  onOpenChange,
}: EditInformationDialogProps) => {
  const mutationPut = useInformationPutQuery();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [keywordInput, setKeywordInput] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InformationTypes>({
    resolver: zodResolver(InformationSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "TEXT",
      category: "INFO",
      file: null,
      keywords: [],
      start_date: null,
      end_date: null,
    },
  });

  const typeValue = watch("type");
  const categoryValue = watch("category");
  const keywordsValue = watch("keywords");

  useEffect(() => {
    if (information && open) {
      const keywordsArray = parseKeywords(information.keywords);

      reset({
        title: information.title || "",
        description: information.description || "",
        type: information.type || "TEXT",
        category: information.category || "INFO",
        keywords: keywordsArray,
        start_date: information.start_date || null,
        end_date: information.end_date || null,
        file: null,
      });

      if (information.file_url) {
        setExistingImageUrl(information.file_url);
      } else {
        setExistingImageUrl(null);
      }
      setSelectedImage(null);
      setKeywordInput("");
    }
  }, [information, open, reset]);

  const keywordsList = Array.isArray(keywordsValue) ? keywordsValue : [];

  const typeOptions = [
    { label: "Text", value: "TEXT" },
    { label: "Image", value: "FILE" },
  ];

  const categoryOptions = [
    { label: "Promo", value: "PROMO" },
    { label: "Paket", value: "PAKET" },
    { label: "Info", value: "INFO" },
  ];

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        showToast.error("Permission to access gallery is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelectedImage(image);
        setExistingImageUrl(null);
        setValue("file", image);
      }
    } catch (error) {
      showToast.error("Failed to select image.");
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setExistingImageUrl(null);
    setValue("file", null);
  };

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;

    const currentKeywords = Array.isArray(keywordsValue) ? keywordsValue : [];

    if (currentKeywords.includes(trimmedKeyword)) {
      showToast.error("This keyword already exists!");
      return;
    }

    const newKeywords = [...currentKeywords, trimmedKeyword];
    setValue("keywords", newKeywords);
  };

  const removeKeyword = (index: number) => {
    const currentKeywords = Array.isArray(keywordsValue) ? keywordsValue : [];
    const updatedKeywords = currentKeywords.filter((_, i) => i !== index);
    setValue("keywords", updatedKeywords);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      addKeyword(keywordInput);
      setKeywordInput("");
    }
  };

  const onSubmit = async (data: InformationTypes) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("category", data.category);

      if (data.keywords && Array.isArray(data.keywords)) {
        const validKeywords = data.keywords
          .map((k) => String(k).trim())
          .filter((k) => k !== "");

        if (validKeywords.length > 0) {
          formData.append("keywords", JSON.stringify(validKeywords));
        }
      }

      if (data.type === "FILE" && selectedImage) {
        const filename = selectedImage.uri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("file", {
          uri: selectedImage.uri,
          type: type,
          name: filename,
        } as any);
      }

      if (data.category === "PROMO") {
        if (data.start_date) formData.append("start_date", data.start_date);
        if (data.end_date) formData.append("end_date", data.end_date);
      }

      await mutationPut.mutateAsync({ id: information.id, data: formData });
      onOpenChange(false);
      showToast.success("Information updated successfully!");

      setSelectedImage(null);
      setExistingImageUrl(null);
      setKeywordInput("");
    } catch (error) {
      console.error("Update error:", error);
      showToast.error("Failed to update information.");
    }
  };

  const hasImage = selectedImage || existingImageUrl;
  const imageUri = selectedImage?.uri || existingImageUrl;

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
          maxHeight="85%"
        >
          <Dialog.Title fontSize="$6" fontWeight="700" color="$gray12">
            Edit Information
          </Dialog.Title>

          <Dialog.Description fontSize="$3" color="$gray10">
            Update information entry for the bot
          </Dialog.Description>

          <ScrollView maxHeight={500}>
            <YStack gap="$4" paddingVertical="$2">
              <FormInput
                control={control}
                name="title"
                label="Title *"
                placeholder="Enter information title"
                error={errors.title?.message}
              />

              <FormInput
                control={control}
                name="description"
                label="Description *"
                placeholder="Enter information description"
                multiline
                numberOfLines={3}
                error={errors.description?.message}
              />

              <FormSelect
                name="type"
                control={control}
                label="Type *"
                placeholder="Select type"
                options={typeOptions}
                error={errors.type?.message}
              />

              <FormSelect
                name="category"
                control={control}
                label="Category *"
                placeholder="Select category"
                options={categoryOptions}
                error={errors.category?.message}
              />

              {typeValue === "FILE" && (
                <YStack gap="$2">
                  <Text fontSize="$3" fontWeight="600" color="$gray12">
                    Image *
                  </Text>

                  {!hasImage ? (
                    <Button
                      backgroundColor="$blue2"
                      borderWidth={2}
                      borderColor="$blue7"
                      borderStyle="dashed"
                      color="$blue10"
                      height={120}
                      icon={<Upload size={24} />}
                      onPress={pickImage}
                      pressStyle={{ opacity: 0.7, backgroundColor: "$blue3" }}
                      flexDirection="column"
                      gap="$2"
                    >
                      <Text fontSize="$3" fontWeight="500" color="$blue10">
                        Upload Image
                      </Text>
                      <Text fontSize="$2" color="$gray10">
                        Tap to select from gallery
                      </Text>
                    </Button>
                  ) : (
                    <YStack
                      backgroundColor="$gray2"
                      padding="$3"
                      borderRadius="$3"
                      gap="$3"
                    >
                      <Image
                        source={{ uri: imageUri }}
                        width="100%"
                        height={200}
                        borderRadius="$2"
                        resizeMode="cover"
                      />

                      <XStack
                        alignItems="center"
                        justifyContent="space-between"
                        backgroundColor="white"
                        padding="$2"
                        borderRadius="$2"
                      >
                        <XStack gap="$2" alignItems="center" flex={1}>
                          <ImageIcon size={20} color="$blue10" />
                          <YStack flex={1}>
                            <Text
                              fontSize="$3"
                              fontWeight="500"
                              color="$gray12"
                              numberOfLines={1}
                            >
                              {selectedImage
                                ? selectedImage.uri.split("/").pop()
                                : "Current image"}
                            </Text>
                            {selectedImage && (
                              <Text fontSize="$2" color="$gray10">
                                {selectedImage.width} x {selectedImage.height}
                              </Text>
                            )}
                          </YStack>
                        </XStack>
                        <XStack gap="$2">
                          <Button
                            size="$3"
                            backgroundColor="$blue2"
                            color="$blue10"
                            fontSize="$2"
                            paddingHorizontal="$3"
                            onPress={pickImage}
                            pressStyle={{
                              opacity: 0.7,
                              backgroundColor: "$blue3",
                            }}
                          >
                            Change
                          </Button>
                          <Button
                            size="$3"
                            circular
                            backgroundColor="$red2"
                            icon={<Trash2 size={18} color="$red10" />}
                            onPress={removeImage}
                            pressStyle={{
                              opacity: 0.7,
                              backgroundColor: "$red3",
                            }}
                          />
                        </XStack>
                      </XStack>
                    </YStack>
                  )}

                  {errors.file && (
                    <Text fontSize="$2" color="$red10">
                      {errors.file.message as string}
                    </Text>
                  )}
                </YStack>
              )}

              <YStack gap="$2">
                <Text fontSize="$3" fontWeight="600" color="$gray12">
                  Keywords (Optional)
                </Text>

                <Input
                  placeholder="Type keyword and press Enter"
                  autoCapitalize="none"
                  value={keywordInput}
                  onChangeText={setKeywordInput}
                  onSubmitEditing={handleAddKeyword}
                  returnKeyType="done"
                  borderColor="$gray7"
                  focusStyle={{
                    borderColor: "$blue9",
                  }}
                />

                {keywordsList.length > 0 && (
                  <KeywordTagsList
                    keywords={keywordsList}
                    onRemove={removeKeyword}
                  />
                )}
              </YStack>

              {categoryValue === "PROMO" && (
                <>
                  <FormDatePicker
                    control={control}
                    name="start_date"
                    label="Start Date *"
                    placeholder="Select start date"
                    error={errors.start_date?.message}
                  />

                  <FormDatePicker
                    control={control}
                    name="end_date"
                    label="End Date *"
                    placeholder="Select end date"
                    error={errors.end_date?.message}
                  />
                </>
              )}
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
              disabled={mutationPut.isPending}
              opacity={mutationPut.isPending ? 0.6 : 1}
              pressStyle={{ opacity: 0.8 }}
            >
              {mutationPut.isPending ? "Updating..." : "Update Information"}
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
