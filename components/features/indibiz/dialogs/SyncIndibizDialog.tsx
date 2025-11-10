import { X } from "@tamagui/lucide-icons";
import React from "react";
import {
  Dialog,
  YStack,
  XStack,
  Button,
  Text,
  Input,
  Label,
  Checkbox,
  Spinner,
} from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "@tamagui/lucide-icons";

const syncSchema = z.object({
  page: z.number().min(1, "Page must be at least 1"),
  limit: z.number().min(1, "Limit must be at least 1"),
  updateExisting: z.boolean(),
  allPages: z.boolean(),
});

type SyncFormData = z.infer<typeof syncSchema>;

const SyncIndibizDialog = ({
  open,
  setOpen,
  onSync,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSync?: (data: SyncFormData) => Promise<void> | void;
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SyncFormData>({
    resolver: zodResolver(syncSchema),
    defaultValues: {
      page: 1,
      limit: 1,
      updateExisting: true,
      allPages: true,
    },
  });

  const allPages = watch("allPages");

  const onSubmit = async (data: SyncFormData) => {
    try {
      setIsSubmitting(true);
      await onSync?.(data);
      // Don't close dialog after sync, let parent handle it
      // setOpen(false);
      // reset();
    } catch (error) {
      console.error("Sync error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog modal open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor="$backgroundStrong"
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
          maxWidth={450}
          width="90%"
          padding="$0"
          borderRadius="$6"
          backgroundColor="$background"
        >
          <XStack
            paddingHorizontal="$5"
            paddingVertical="$4"
            alignItems="center"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <Dialog.Title
              fontSize="$7"
              fontWeight="700"
              color="$gray12"
              margin="$0"
            >
              Sync Indibiz Data
            </Dialog.Title>

            <Dialog.Close asChild disabled={isSubmitting}>
              <Button
                size="$3"
                circular
                icon={<X size={18} />}
                chromeless
                disabled={isSubmitting}
                opacity={isSubmitting ? 0.5 : 1}
                hoverStyle={{
                  backgroundColor: "$gray4",
                }}
                pressStyle={{
                  backgroundColor: "$gray5",
                }}
              />
            </Dialog.Close>
          </XStack>

          <YStack padding="$5" gap="$4">
            <YStack gap="$2">
              <Label
                htmlFor="page"
                fontSize="$3"
                fontWeight="600"
                color="$gray12"
              >
                Page Number
              </Label>
              <Controller
                control={control}
                name="page"
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="page"
                    size="$4"
                    value={value.toString()}
                    onChangeText={(text) => onChange(parseInt(text) || 1)}
                    keyboardType="numeric"
                    placeholder="Enter page number"
                    disabled={allPages || isSubmitting}
                    opacity={allPages ? 0.5 : 1}
                    borderColor={errors.page ? "$red10" : "$borderColor"}
                  />
                )}
              />
              {errors.page && (
                <Text fontSize="$2" color="$red10">
                  {errors.page.message}
                </Text>
              )}
            </YStack>

            <YStack gap="$2">
              <Label
                htmlFor="limit"
                fontSize="$3"
                fontWeight="600"
                color="$gray12"
              >
                Items Per Page
              </Label>
              <Controller
                control={control}
                name="limit"
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="limit"
                    size="$4"
                    value={value.toString()}
                    onChangeText={(text) => onChange(parseInt(text) || 1)}
                    keyboardType="numeric"
                    placeholder="Enter limit"
                    disabled={isSubmitting}
                    borderColor={errors.limit ? "$red10" : "$borderColor"}
                  />
                )}
              />
              {errors.limit && (
                <Text fontSize="$2" color="$red10">
                  {errors.limit.message}
                </Text>
              )}
            </YStack>

            <XStack gap="$3" alignItems="center" paddingVertical="$2">
              <Controller
                control={control}
                name="updateExisting"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="updateExisting"
                    size="$5"
                    checked={value}
                    onCheckedChange={onChange}
                    disabled={isSubmitting}
                  >
                    <Checkbox.Indicator>
                      <Check size={16} />
                    </Checkbox.Indicator>
                  </Checkbox>
                )}
              />
              <Label
                htmlFor="updateExisting"
                fontSize="$3"
                fontWeight="500"
                color="$gray12"
                flex={1}
              >
                Update Existing Records
              </Label>
            </XStack>

            <XStack gap="$3" alignItems="center" paddingVertical="$2">
              <Controller
                control={control}
                name="allPages"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="allPages"
                    size="$5"
                    checked={value}
                    onCheckedChange={onChange}
                    disabled={isSubmitting}
                  >
                    <Checkbox.Indicator>
                      <Check size={16} />
                    </Checkbox.Indicator>
                  </Checkbox>
                )}
              />
              <Label
                htmlFor="allPages"
                fontSize="$3"
                fontWeight="500"
                color="$gray12"
                flex={1}
              >
                Sync All Pages
              </Label>
            </XStack>

            <XStack gap="$3" marginTop="$3">
              <Button
                flex={1}
                size="$4"
                variant="outlined"
                onPress={handleClose}
                disabled={isSubmitting}
                opacity={isSubmitting ? 0.5 : 1}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                size="$4"
                backgroundColor="$blue10"
                color="white"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                icon={isSubmitting ? <Spinner color="white" /> : undefined}
                hoverStyle={{
                  backgroundColor: "$blue11",
                }}
                pressStyle={{
                  backgroundColor: "$blue9",
                }}
              >
                {isSubmitting ? "Syncing..." : "Start Sync"}
              </Button>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default SyncIndibizDialog;
