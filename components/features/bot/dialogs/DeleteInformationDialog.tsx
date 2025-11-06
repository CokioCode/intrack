import { XStack, Button, Dialog } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { useInformationDeleteQuery } from "@/hooks/useInformation";

interface DeleteInformationDialogProps {
  information: any;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteInformationDialog = ({
  information,
  title,
  open,
  onOpenChange,
}: DeleteInformationDialogProps) => {
  const deleteMutation = useInformationDeleteQuery();
  const handleDelete = async () => {
    await deleteMutation.mutateAsync({ id: information.id });
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
          maxWidth={450}
          width="90%"
        >
          <Dialog.Title fontSize="$6" fontWeight="700" color="$red10">
            Delete Information
          </Dialog.Title>

          <Dialog.Description fontSize="$4" color="$gray11" lineHeight={22}>
            Are you sure you want to delete information "{title}" (
            {information.id.substring(0, 8)}...)? This action cannot be undone.
          </Dialog.Description>

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
              backgroundColor="$red9"
              color="white"
              onPress={handleDelete}
              pressStyle={{ opacity: 0.8 }}
            >
              Delete
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
