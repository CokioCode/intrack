import React, { useMemo } from "react";
import { YStack, XStack, Text, Card, Button, Circle } from "tamagui";
import {
  Package,
  RefreshCw,
  AlertCircle,
  PhoneOff,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Wifi,
  Clock,
  User,
  Mail,
  MapPin,
  Building2,
} from "@tamagui/lucide-icons";

const ISSUE_CONFIG = {
  PENDING: { icon: Clock, color: "#9E9E9E", bg: "#F5F5F5" },
  RNA: { icon: PhoneOff, color: "#FF9800", bg: "#FFF3E0" },
  QC: { icon: CheckCircle2, color: "#2196F3", bg: "#E3F2FD" },
  FCC: { icon: Calendar, color: "#9C27B0", bg: "#F3E5F5" },
  PI: { icon: AlertTriangle, color: "#F44336", bg: "#FFEBEE" },
  PS: { icon: Wifi, color: "#4CAF50", bg: "#E8F5E9" },
};

interface OrderStatusCardProps {
  order: any;
  onRefresh: () => void;
  onClear?: () => void;
}

export const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  order,
  onRefresh,
  onClear,
}) => {
  const getIssueConfig = (code: string) => {
    return (
      ISSUE_CONFIG[code as keyof typeof ISSUE_CONFIG] || {
        icon: AlertCircle,
        color: "#666",
        bg: "#F5F5F5",
      }
    );
  };

  const daysElapsed = useMemo(() => {
    if (!order?.created_at) return 0;
    const created = new Date(order.created_at);
    const now = new Date();
    return Math.max(
      0,
      Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    );
  }, [order?.created_at]);

  const formattedDate = useMemo(() => {
    const dateString = order?.created_at;
    const date = dateString ? new Date(dateString) : new Date();
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [order?.created_at]);

  const hasSteps = order?.steps && order.steps.length > 0;
  const currentStep = order?.steps?.find((s: any) => s.is_current);
  const completedSteps =
    order?.steps?.filter((s: any) => s.is_completed)?.length || 0;
  const totalSteps = order?.steps?.length || 0;
  const progressPercentage =
    totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <YStack gap="$3">
      <Card
        backgroundColor="white"
        borderRadius="$4"
        padding="$4"
        elevate
        shadowColor="#000"
        shadowOpacity={0.08}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 2 }}
      >
        <YStack gap="$3">
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" gap="$3" flex={1}>
              <Circle
                size={48}
                backgroundColor="#E3F2FD"
                alignItems="center"
                justifyContent="center"
              >
                <Package size={24} color="#2490A9" />
              </Circle>

              <YStack flex={1}>
                <Text
                  fontWeight="700"
                  fontSize="$6"
                  color="#333"
                  marginBottom="$1"
                >
                  {order?.id || "N/A"}
                </Text>
                <XStack alignItems="center" gap="$2">
                  <Clock size={14} color="#666" />
                  <Text fontSize="$2" color="#666">
                    {formattedDate} • {daysElapsed}{" "}
                    {daysElapsed === 1 ? "day" : "days"}
                  </Text>
                </XStack>
              </YStack>
            </XStack>
          </XStack>

          {hasSteps && (
            <YStack gap="$2" marginTop="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$2" color="#666" fontWeight="600">
                  Progress
                </Text>
                <Text fontSize="$2" color="#2490A9" fontWeight="700">
                  {completedSteps}/{totalSteps} steps
                </Text>
              </XStack>
              <YStack
                width="100%"
                height={6}
                backgroundColor="#E0E0E0"
                borderRadius="$6"
                overflow="hidden"
              >
                <YStack
                  width={`${progressPercentage}%`}
                  height="100%"
                  backgroundColor="#2490A9"
                  borderRadius="$6"
                />
              </YStack>
            </YStack>
          )}

          {currentStep && (
            <XStack
              backgroundColor={getIssueConfig(currentStep.code).bg}
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$3"
              alignItems="center"
              gap="$2"
              alignSelf="flex-start"
            >
              <Circle
                size={8}
                backgroundColor={getIssueConfig(currentStep.code).color}
              />
              <Text
                fontSize="$2"
                fontWeight="700"
                color={getIssueConfig(currentStep.code).color}
              >
                {currentStep.subtitle}
              </Text>
            </XStack>
          )}
        </YStack>
      </Card>

      {order?.indibiz && (
        <Card
          backgroundColor="white"
          borderRadius="$4"
          padding="$4"
          elevate
          shadowColor="#000"
          shadowOpacity={0.08}
          shadowRadius={8}
          shadowOffset={{ width: 0, height: 2 }}
        >
          <YStack gap="$3">
            <Text fontWeight="600" fontSize="$4" color="#333">
              Customer Information
            </Text>

            <YStack gap="$2.5">
              <XStack alignItems="center" gap="$2.5">
                <Circle
                  size={32}
                  backgroundColor="#E3F2FD"
                  alignItems="center"
                  justifyContent="center"
                >
                  <User size={16} color="#2490A9" />
                </Circle>
                <YStack flex={1}>
                  <Text fontSize="$2" color="#999" fontWeight="500">
                    Customer Name
                  </Text>
                  <Text fontSize="$3" color="#333" fontWeight="600">
                    {order.indibiz.name}
                  </Text>
                </YStack>
              </XStack>

              <XStack alignItems="center" gap="$2.5">
                <Circle
                  size={32}
                  backgroundColor="#FFF3E0"
                  alignItems="center"
                  justifyContent="center"
                >
                  <User size={16} color="#FF9800" />
                </Circle>
                <YStack flex={1}>
                  <Text fontSize="$2" color="#999" fontWeight="500">
                    PIC Name
                  </Text>
                  <Text fontSize="$3" color="#333" fontWeight="600">
                    {order.indibiz.pic_name}
                  </Text>
                </YStack>
              </XStack>

              {order.indibiz.sales && (
                <>
                  <YStack
                    height={1}
                    backgroundColor="#E0E0E0"
                    marginVertical="$1"
                  />

                  <XStack alignItems="center" gap="$2.5">
                    <Circle
                      size={32}
                      backgroundColor="#E8F5E9"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Mail size={16} color="#4CAF50" />
                    </Circle>
                    <YStack flex={1}>
                      <Text fontSize="$2" color="#999" fontWeight="500">
                        Sales
                      </Text>
                      <Text fontSize="$3" color="#333" fontWeight="600">
                        {order.indibiz.sales.name}
                      </Text>
                      <Text fontSize="$2" color="#666">
                        {order.indibiz.sales.code}
                      </Text>
                    </YStack>
                  </XStack>

                  {order.indibiz.sales.region && (
                    <XStack alignItems="center" gap="$2.5">
                      <Circle
                        size={32}
                        backgroundColor="#F3E5F5"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <MapPin size={16} color="#9C27B0" />
                      </Circle>
                      <YStack flex={1}>
                        <Text fontSize="$2" color="#999" fontWeight="500">
                          Region
                        </Text>
                        <Text fontSize="$3" color="#333" fontWeight="600">
                          {order.indibiz.sales.region.name}
                        </Text>
                        {order.indibiz.sales.agency && (
                          <Text fontSize="$2" color="#666">
                            {order.indibiz.sales.agency.name}
                          </Text>
                        )}
                      </YStack>
                    </XStack>
                  )}
                </>
              )}
            </YStack>
          </YStack>
        </Card>
      )}

      <Card
        backgroundColor="white"
        borderRadius="$4"
        padding="$4"
        elevate
        shadowColor="#000"
        shadowOpacity={0.08}
        shadowRadius={8}
        shadowOffset={{ width: 0, height: 2 }}
      >
        <YStack gap="$4">
          <Text fontWeight="600" fontSize="$4" color="#333">
            Order Timeline
          </Text>

          {!hasSteps ? (
            <YStack
              paddingVertical="$6"
              alignItems="center"
              justifyContent="center"
              gap="$2"
            >
              <AlertCircle size={48} color="#999" />
              <Text color="#666" fontSize="$3" textAlign="center">
                No timeline data available
              </Text>
            </YStack>
          ) : (
            <YStack gap="$3" paddingVertical="$2">
              {order.steps.map((step: any, index: number) => {
                const isActive = step.is_completed;
                const isCurrent = step.is_current;
                const config = getIssueConfig(step.code);
                const Icon = config.icon;
                const isLastStep = index === order.steps.length - 1;
                const nextStepCompleted =
                  !isLastStep && order.steps[index + 1]?.is_completed;

                return (
                  <XStack
                    key={`${step.code}-${index}`}
                    gap="$3"
                    alignItems="flex-start"
                    opacity={isActive ? 1 : 0.6}
                  >
                    <YStack alignItems="center" width={44}>
                      <Circle
                        size={44}
                        backgroundColor={isActive ? config.bg : "#F5F5F5"}
                        borderWidth={2}
                        borderColor={isActive ? config.color : "#E0E0E0"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon
                          size={20}
                          color={isActive ? config.color : "#999"}
                        />
                      </Circle>

                      {!isLastStep && (
                        <YStack
                          width={2}
                          height={48}
                          backgroundColor={
                            isActive && nextStepCompleted
                              ? config.color
                              : "#E0E0E0"
                          }
                          marginTop="$2"
                        />
                      )}
                    </YStack>

                    <YStack flex={1} gap="$1.5" paddingTop="$1.5">
                      <XStack alignItems="center" gap="$2">
                        <Text
                          fontSize="$4"
                          fontWeight={isCurrent ? "700" : "600"}
                          color={isActive ? "#333" : "#999"}
                        >
                          {step.subtitle || "Step"}
                        </Text>
                        {isCurrent && (
                          <XStack
                            backgroundColor={config.color}
                            paddingHorizontal="$2"
                            paddingVertical="$0.5"
                            borderRadius="$2"
                          >
                            <Text fontSize="$1" color="white" fontWeight="700">
                              CURRENT
                            </Text>
                          </XStack>
                        )}
                      </XStack>

                      <Text
                        fontSize="$3"
                        color={isActive ? "#666" : "#999"}
                        lineHeight={20}
                      >
                        {step.description || "No description"}
                      </Text>

                      {step.has_update && step.update_details && (
                        <XStack
                          backgroundColor="#E3F2FD"
                          padding="$2.5"
                          borderRadius="$3"
                          marginTop="$1.5"
                          borderLeftWidth={3}
                          borderLeftColor="#2490A9"
                        >
                          <Text fontSize="$2" color="#2490A9" fontWeight="600">
                            📋 {step.update_details}
                          </Text>
                        </XStack>
                      )}
                    </YStack>
                  </XStack>
                );
              })}
            </YStack>
          )}

          <XStack gap="$2" marginTop="$2">
            <Button
              flex={1}
              onPress={onRefresh}
              backgroundColor="#2490A9"
              color="white"
              pressStyle={{ backgroundColor: "#1d7a8f", opacity: 0.9 }}
              size="$3.5"
              borderRadius="$3"
              fontWeight="600"
              icon={<RefreshCw size={18} color="white" />}
            >
              Refresh
            </Button>

            {onClear && (
              <Button
                onPress={onClear}
                backgroundColor="#F5F5F5"
                color="#666"
                borderWidth={1}
                borderColor="#E0E0E0"
                pressStyle={{ backgroundColor: "#E0E0E0" }}
                size="$3.5"
                borderRadius="$3"
                paddingHorizontal="$4"
                fontWeight="600"
              >
                Clear
              </Button>
            )}
          </XStack>
        </YStack>
      </Card>
    </YStack>
  );
};

export default OrderStatusCard;
