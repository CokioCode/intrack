import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Button, Text, XStack, YStack, Label } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import RNPickerSelect from "react-native-picker-select";
import { FormInput } from "@/components/common/FormInput";
import { useEffect } from "react";
import { Input } from "tamagui";

export const editOrderSchema = z.object({
  from_status: z.enum(["RNA", "QC", "FCC", "PI", "PS"]),
  to_status: z.enum(["RNA", "QC", "FCC", "PI", "PS"]),
  has_update: z.boolean(),
  update_details: z.string().min(1, "Update details is required"),
});

export type EditOrderFormData = z.infer<typeof editOrderSchema>;

const STATUS_OPTIONS = [
  { label: "RNA", value: "RNA" },
  { label: "QC", value: "QC" },
  { label: "FCC", value: "FCC" },
  { label: "PI", value: "PI" },
  { label: "PS", value: "PS" },
];

interface EditOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  date: string;
  technician: string;
  status: "RNA" | "QC" | "FCC" | "PI" | "PS";
  statusColor?: string;
  onSave?: (orderId: string, data: EditOrderFormData) => void;
  ao_number: string;
}

export const EditOrderDialog = ({
  open,
  onOpenChange,
  orderId,
  date,
  technician,
  status,
  statusColor = "#8B5CF6",
  onSave,
  ao_number,
}: EditOrderDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<EditOrderFormData>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      from_status: status,
      to_status: undefined,
      has_update: true,
      update_details: "",
    },
  });

  useEffect(() => {
    if (open) {
      setValue("from_status", status);
    }
  }, [open, status, setValue]);

  const onSubmit = async (data: EditOrderFormData) => {
    try {
      await onSave?.(orderId, data);
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
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
          maxWidth={500}
          width="90%"
        >
          <Dialog.Title fontSize="$6" fontWeight="700" color="$gray12">
            Edit Order
          </Dialog.Title>

          <Dialog.Description fontSize="$3" color="$gray10">
            {orderId}
          </Dialog.Description>

          <YStack gap="$4">
            <XStack alignItems="center" gap="$2">
              <Text fontSize="$4" fontWeight="600" color="$gray11">
                Current Status:
              </Text>
              <XStack
                backgroundColor={statusColor}
                paddingHorizontal="$3"
                paddingVertical="$1.5"
                borderRadius="$2"
              >
                <Text fontSize="$3" fontWeight="600" color="white">
                  {status}
                </Text>
              </XStack>
            </XStack>

            <YStack
              gap="$3"
              padding="$4"
              backgroundColor="$gray2"
              borderRadius="$3"
            >
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10">
                  Date:
                </Text>
                <Text fontSize="$3" fontWeight="600" color="$gray12">
                  {date}
                </Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10">
                  Technician:
                </Text>
                <Text fontSize="$3" fontWeight="600" color="$gray12">
                  {technician}
                </Text>
              </XStack>
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$gray10">
                  Ao Number:
                </Text>
                <Text fontSize="$3" fontWeight="600" color="$gray12">
                  {ao_number}
                </Text>
              </XStack>
            </YStack>

            <YStack gap="$3">
              <Controller
                control={control}
                name="from_status"
                render={({ field: { value } }) => (
                  <Input disabled value={value} />
                )}
              />

              <YStack gap="$2">
                <Label fontSize="$3" fontWeight="600" color="$gray11">
                  Change Status To
                </Label>
                <Controller
                  control={control}
                  name="to_status"
                  render={({ field: { onChange, value } }) => (
                    <YStack gap="$2">
                      <RNPickerSelect
                        value={value}
                        onValueChange={onChange}
                        items={STATUS_OPTIONS}
                        placeholder={{
                          label: "Select new status",
                          value: null,
                          color: "#999",
                        }}
                        style={{
                          inputAndroid: {
                            fontSize: 16,
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            borderWidth: 1.5,
                            borderColor: "#d1d5db",
                            borderRadius: 10,
                            color: "#111827",
                            backgroundColor: "#f9fafb",
                          },
                          inputAndroidContainer: {
                            borderRadius: 10,
                          },
                          placeholder: {
                            color: "#9ca3af",
                          },
                          iconContainer: {
                            top: 12,
                            right: 12,
                          },
                        }}
                        useNativeAndroidPickerStyle={false}
                        disabled={isSubmitting}
                      />

                      {errors.to_status && (
                        <Text fontSize="$2" color="$red10">
                          {errors.to_status.message}
                        </Text>
                      )}
                    </YStack>
                  )}
                />
              </YStack>

              <FormInput
                control={control}
                name="update_details"
                label="Update Details"
                placeholder="Enter update details"
                error={errors.update_details?.message}
                disabled={isSubmitting}
                multiline
                numberOfLines={4}
              />
            </YStack>
          </YStack>

          <XStack gap="$3" marginTop="$3" justifyContent="flex-end">
            <Dialog.Close displayWhenAdapted asChild>
              <Button
                backgroundColor="$gray5"
                color="$gray11"
                onPress={handleClose}
                pressStyle={{ opacity: 0.8 }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              backgroundColor="$blue9"
              color="white"
              onPress={handleSubmit(onSubmit)}
              pressStyle={{ opacity: 0.8 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
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
              disabled={isSubmitting}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
