import { FormInput } from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { FormDatePicker } from "@/components/common/FormDatePicker";
import { InformationSchema, InformationTypes } from "@/types/informationTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Image as ImageIcon, Trash2 } from "@tamagui/lucide-icons";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Dialog,
  ScrollView,
  XStack,
  YStack,
  Text,
  Image,
} from "tamagui";
import { KeywordTagsList } from "../KeywordTagsList";
import { useInformationPostQuery } from "@/hooks/useInformation";
import { showToast } from "@/utils/toast";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

interface AddInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddInformationDialog = ({
  open,
  onOpenChange,
}: AddInformationDialogProps) => {
  const mutationPost = useInformationPostQuery();
  const [selectedImage, setSelectedImage] = useState<any>(null);

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

  const keywordsList = Array.isArray(keywordsValue)
    ? keywordsValue
    : typeof keywordsValue === "string"
    ? keywordsValue
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k !== "")
    : [];

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
      // Request permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        showToast.error("Permission to access gallery is required!");
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelectedImage(image);
        setValue("file", image);
      }
    } catch (error) {
      showToast.error("Failed to pick image.");
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setValue("file", null);
  };

  const addKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    const currentKeywords = Array.isArray(keywordsValue) ? keywordsValue : [];
    const newKeywords = [...currentKeywords, keyword.trim()];
    setValue("keywords", newKeywords);
  };

  const removeKeyword = (index: number) => {
    const currentKeywords = Array.isArray(keywordsValue) ? keywordsValue : [];
    const updatedKeywords = currentKeywords.filter((_, i) => i !== index);
    setValue("keywords", updatedKeywords);
  };

  const onSubmit = async (data: InformationTypes) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("category", data.category);

      if (data.keywords && Array.isArray(data.keywords)) {
        formData.append("keywords", JSON.stringify(data.keywords));
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

      console.log(formData);

      await mutationPost.mutateAsync(formData);
      resetForm();
      onOpenChange(false);
      showToast.success("Information added successfully!");
    } catch (error) {
      showToast.error("Failed to add information.");
    }
  };

  const resetForm = () => {
    reset();
    setSelectedImage(null);
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
          maxHeight="85%"
        >
          <Dialog.Title fontSize="$6" fontWeight="700" color="$gray12">
            Add New Information
          </Dialog.Title>

          <Dialog.Description fontSize="$3" color="$gray10">
            Create a new information entry for the bot
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

                  {!selectedImage ? (
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
                        source={{ uri: selectedImage.uri }}
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
                              {selectedImage.uri.split("/").pop()}
                            </Text>
                            <Text fontSize="$2" color="$gray10">
                              {selectedImage.width} x {selectedImage.height}
                            </Text>
                          </YStack>
                        </XStack>
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
                <Controller
                  control={control}
                  name="keywords"
                  render={({ field }) => (
                    <>
                      <FormInput
                        control={control}
                        name="keywords"
                        label="Keywords (Optional)"
                        placeholder="Press Enter to add keyword"
                        autoCapitalize="none"
                        onSubmitEditing={(e: any) => {
                          const keyword = e.nativeEvent.text;
                          if (keyword.trim()) {
                            addKeyword(keyword);
                            // Reset input field
                            e.target.clear();
                          }
                        }}
                      />
                    </>
                  )}
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
                onPress={() => {
                  onOpenChange(false);
                  resetForm();
                }}
                pressStyle={{ opacity: 0.8 }}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              backgroundColor="$blue9"
              color="white"
              onPress={handleSubmit(onSubmit)}
              disabled={mutationPost.isPending}
              opacity={mutationPost.isPending ? 0.6 : 1}
              pressStyle={{ opacity: 0.8 }}
            >
              {mutationPost.isPending ? "Adding..." : "Add Information"}
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
