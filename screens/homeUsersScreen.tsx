import React, { useMemo, memo } from "react";
import {
  YStack,
  XStack,
  Text,
  Card,
  Button,
  Circle,
  Spinner,
  ScrollView,
} from "tamagui";
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
  Search,
} from "@tamagui/lucide-icons";
import { AdminLayouts } from "@/components/layouts/adminLayouts";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTrackStore } from "@/stores/trackStore";
import { useTrackAoNumberQuery } from "@/hooks/useTrack";
import { Keyboard, ToastAndroid, Dimensions } from "react-native";
import { getAoNumber } from "@/utils/getAoNumber";
import { useAuthStore } from "@/stores/authStrore";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = (size: number) => (SCREEN_WIDTH / 375) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / 667) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const getMinHeight = () => SCREEN_HEIGHT * 0.6;

const ISSUE_CONFIG = {
  RNA: { icon: PhoneOff, color: "#FF9800", bg: "#FFF3E0" },
  QC: { icon: CheckCircle2, color: "#2196F3", bg: "#E3F2FD" },
  FCC: { icon: Calendar, color: "#9C27B0", bg: "#F3E5F5" },
  PI: { icon: AlertTriangle, color: "#F44336", bg: "#FFEBEE" },
  PS: { icon: Wifi, color: "#4CAF50", bg: "#E8F5E9" },
};

const TimelineStep = memo(
  ({ step, index, isLastStep, nextStepCompleted }: any) => {
    const isActive = step.is_completed;
    const isCurrent = step.is_current;
    const config = ISSUE_CONFIG[step.code as keyof typeof ISSUE_CONFIG] || {
      icon: AlertCircle,
      color: "#666",
      bg: "#F5F5F5",
    };
    const Icon = config.icon;

    return (
      <XStack gap="$3" alignItems="flex-start" opacity={isActive ? 1 : 0.6}>
        <YStack alignItems="center" width={moderateScale(44)}>
          <Circle
            size={moderateScale(44)}
            backgroundColor={isActive ? config.bg : "#F5F5F5"}
            borderWidth={2}
            borderColor={isActive ? config.color : "#E0E0E0"}
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              size={moderateScale(20)}
              color={isActive ? config.color : "#999"}
            />
          </Circle>

          {!isLastStep && (
            <YStack
              width={2}
              height={verticalScale(18)}
              backgroundColor={
                isActive && nextStepCompleted ? config.color : "#E0E0E0"
              }
              marginTop="$2"
            />
          )}
        </YStack>

        <YStack flex={1} gap="$1.5" paddingTop="$1.5">
          <XStack alignItems="center" gap="$2">
            <Text
              fontSize={moderateScale(14)}
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
                <Text
                  fontSize={moderateScale(10)}
                  color="white"
                  fontWeight="700"
                >
                  CURRENT
                </Text>
              </XStack>
            )}
          </XStack>

          <Text
            fontSize={moderateScale(12)}
            color={isActive ? "#666" : "#999"}
            lineHeight={moderateScale(20)}
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
              <Text
                fontSize={moderateScale(11)}
                color="#2490A9"
                fontWeight="600"
              >
                📋 {step.update_details}
              </Text>
            </XStack>
          )}
        </YStack>
      </XStack>
    );
  }
);

TimelineStep.displayName = "TimelineStep";

const CustomerInfoCard = memo(({ indibiz }: any) => {
  if (!indibiz) return null;

  return (
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
        <Text fontWeight="600" fontSize={moderateScale(14)} color="#333">
          Customer Information
        </Text>

        <YStack gap="$2.5">
          <XStack alignItems="center" gap="$2.5">
            <Circle
              size={moderateScale(32)}
              backgroundColor="#E3F2FD"
              alignItems="center"
              justifyContent="center"
            >
              <User size={moderateScale(16)} color="#2490A9" />
            </Circle>
            <YStack flex={1}>
              <Text fontSize={moderateScale(11)} color="#999" fontWeight="500">
                Customer Name
              </Text>
              <Text fontSize={moderateScale(12)} color="#333" fontWeight="600">
                {indibiz.name}
              </Text>
            </YStack>
          </XStack>

          <XStack alignItems="center" gap="$2.5">
            <Circle
              size={moderateScale(32)}
              backgroundColor="#FFF3E0"
              alignItems="center"
              justifyContent="center"
            >
              <User size={moderateScale(16)} color="#FF9800" />
            </Circle>
            <YStack flex={1}>
              <Text fontSize={moderateScale(11)} color="#999" fontWeight="500">
                PIC Name
              </Text>
              <Text fontSize={moderateScale(12)} color="#333" fontWeight="600">
                {indibiz.pic_name}
              </Text>
            </YStack>
          </XStack>

          {indibiz.sales && (
            <>
              <YStack
                height={1}
                backgroundColor="#E0E0E0"
                marginVertical="$1"
              />

              <XStack alignItems="center" gap="$2.5">
                <Circle
                  size={moderateScale(32)}
                  backgroundColor="#E8F5E9"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Mail size={moderateScale(16)} color="#4CAF50" />
                </Circle>
                <YStack flex={1}>
                  <Text
                    fontSize={moderateScale(11)}
                    color="#999"
                    fontWeight="500"
                  >
                    Sales
                  </Text>
                  <Text
                    fontSize={moderateScale(12)}
                    color="#333"
                    fontWeight="600"
                  >
                    {indibiz.sales.name}
                  </Text>
                  <Text fontSize={moderateScale(11)} color="#666">
                    {indibiz.sales.code}
                  </Text>
                </YStack>
              </XStack>

              {indibiz.sales.region && (
                <XStack alignItems="center" gap="$2.5">
                  <Circle
                    size={moderateScale(32)}
                    backgroundColor="#F3E5F5"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <MapPin size={moderateScale(16)} color="#9C27B0" />
                  </Circle>
                  <YStack flex={1}>
                    <Text
                      fontSize={moderateScale(11)}
                      color="#999"
                      fontWeight="500"
                    >
                      Region
                    </Text>
                    <Text
                      fontSize={moderateScale(12)}
                      color="#333"
                      fontWeight="600"
                    >
                      {indibiz.sales.region.name}
                    </Text>
                    {indibiz.sales.agency && (
                      <Text fontSize={moderateScale(11)} color="#666">
                        {indibiz.sales.agency.name}
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
  );
});

CustomerInfoCard.displayName = "CustomerInfoCard";

const OrderStatusCard = memo(({ order, onRefresh, onClear }: any) => {
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

  const progressData = useMemo(() => {
    const steps = order?.steps || [];
    const completedSteps = steps.filter((s: any) => s.is_completed).length;
    const totalSteps = steps.length;
    const percentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
    const currentStep = steps.find((s: any) => s.is_current);

    return { completedSteps, totalSteps, percentage, currentStep };
  }, [order?.steps]);

  const hasSteps = order?.steps && order.steps.length > 0;

  return (
    <YStack gap="$3" flex={1}>
      d
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
                size={moderateScale(48)}
                backgroundColor="#E3F2FD"
                alignItems="center"
                justifyContent="center"
              >
                <Package size={moderateScale(24)} color="#2490A9" />
              </Circle>

              <YStack flex={1}>
                <Text
                  fontWeight="700"
                  fontSize={moderateScale(18)}
                  color="#333"
                  marginBottom="$1"
                >
                  {order?.id || "N/A"}
                </Text>
                <XStack alignItems="center" gap="$2">
                  <Clock size={moderateScale(14)} color="#666" />
                  <Text fontSize={moderateScale(11)} color="#666">
                    {formattedDate} • {daysElapsed}{" "}
                    {daysElapsed === 1 ? "day" : "days"}
                  </Text>
                </XStack>
              </YStack>
            </XStack>
          </XStack>
          d
          {hasSteps && (
            <YStack gap="$2" marginTop="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <Text
                  fontSize={moderateScale(11)}
                  color="#666"
                  fontWeight="600"
                >
                  Progress
                </Text>
                <Text
                  fontSize={moderateScale(11)}
                  color="#2490A9"
                  fontWeight="700"
                >
                  {progressData.completedSteps}/{progressData.totalSteps} steps
                </Text>
              </XStack>
              <YStack
                width="100%"
                height={moderateScale(6)}
                backgroundColor="#E0E0E0"
                borderRadius="$6"
                overflow="hidden"
              >
                <YStack
                  width={`${progressData.percentage}%`}
                  height="100%"
                  backgroundColor="#2490A9"
                  borderRadius="$6"
                />
              </YStack>
            </YStack>
          )}
          d
          {progressData.currentStep && (
            <XStack
              backgroundColor={
                ISSUE_CONFIG[
                  progressData.currentStep.code as keyof typeof ISSUE_CONFIG
                ]?.bg || "#F5F5F5"
              }
              paddingHorizontal="$3"
              paddingVertical="$2"
              borderRadius="$3"
              alignItems="center"
              gap="$2"
              alignSelf="flex-start"
            >
              <Circle
                size={moderateScale(8)}
                backgroundColor={
                  ISSUE_CONFIG[
                    progressData.currentStep.code as keyof typeof ISSUE_CONFIG
                  ]?.color || "#666"
                }
              />
              <Text
                fontSize={moderateScale(11)}
                fontWeight="700"
                color={
                  ISSUE_CONFIG[
                    progressData.currentStep.code as keyof typeof ISSUE_CONFIG
                  ]?.color || "#666"
                }
              >
                {progressData.currentStep.subtitle}
              </Text>
            </XStack>
          )}
        </YStack>
      </Card>
      d
      <CustomerInfoCard indibiz={order?.indibiz} />d
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
          <Text fontWeight="600" fontSize={moderateScale(14)} color="#333">
            Order Timeline
          </Text>

          {!hasSteps ? (
            <YStack
              paddingVertical="$6"
              alignItems="center"
              justifyContent="center"
              gap="$2"
            >
              <AlertCircle size={moderateScale(48)} color="#999" />
              <Text
                color="#666"
                fontSize={moderateScale(12)}
                textAlign="center"
              >
                No timeline data available
              </Text>
            </YStack>
          ) : (
            <YStack gap="$3" paddingVertical="$2">
              {order.steps.map((step: any, index: number) => (
                <TimelineStep
                  key={`${step.code}-${index}`}
                  step={step}
                  index={index}
                  isLastStep={index === order.steps.length - 1}
                  nextStepCompleted={
                    index < order.steps.length - 1 &&
                    order.steps[index + 1]?.is_completed
                  }
                />
              ))}
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
              icon={<RefreshCw size={moderateScale(18)} color="white" />}
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
});

OrderStatusCard.displayName = "OrderStatusCard";

const EmptyState = memo(() => (
  <YStack
    flex={1}
    justifyContent="center"
    alignItems="center"
    minHeight={getMinHeight()}
  >
    <YStack alignItems="center" gap="$3">
      <Circle
        size={moderateScale(80)}
        backgroundColor="#E3F2FD"
        alignItems="center"
        justifyContent="center"
      >
        <Search size={moderateScale(40)} color="#2490A9" />
      </Circle>
      <YStack alignItems="center" gap="$1.5">
        <Text fontSize={moderateScale(16)} fontWeight="700" color="#333">
          Track Your Order
        </Text>
        <Text
          fontSize={moderateScale(12)}
          color="#666"
          textAlign="center"
          lineHeight={moderateScale(20)}
          maxWidth={"70%"}
        >
          Enter your SC Number above to track your service order status in
          real-time
        </Text>
      </YStack>
    </YStack>
  </YStack>
));

EmptyState.displayName = "EmptyState";

const LoadingState = memo(() => (
  <YStack
    flex={1}
    justifyContent="center"
    alignItems="center"
    minHeight={getMinHeight()}
  >
    <YStack alignItems="center" gap="$3">
      <Spinner size="large" color="#2490A9" />
      <Text fontSize={moderateScale(14)} fontWeight="600" color="#666">
        Loading order data...
      </Text>
    </YStack>
  </YStack>
));

LoadingState.displayName = "LoadingState";

const ErrorState = memo(({ aoNumber, onRetry }: any) => (
  <YStack
    flex={1}
    justifyContent="center"
    alignItems="center"
    minHeight={getMinHeight()}
  >
    <YStack alignItems="center" gap="$3">
      <Circle
        size={moderateScale(64)}
        backgroundColor="#FFEBEE"
        alignItems="center"
        justifyContent="center"
      >
        <AlertCircle size={moderateScale(32)} color="#F44336" />
      </Circle>
      <YStack alignItems="center" gap="$1.5">
        <Text fontSize={moderateScale(14)} fontWeight="700" color="#333">
          Order Not Found
        </Text>
        <Text
          fontSize={moderateScale(12)}
          color="#666"
          textAlign="center"
          lineHeight={moderateScale(20)}
          maxWidth={"70%"}
        >
          We couldn't find order "{aoNumber}". Please check the SC Number and
          try again.
        </Text>
      </YStack>
      <Button
        onPress={onRetry}
        backgroundColor="#2490A9"
        color="white"
        pressStyle={{ backgroundColor: "#1d7a8f" }}
        size="$3"
        borderRadius="$3"
        marginTop="$2"
        fontWeight="600"
      >
        Try Again
      </Button>
    </YStack>
  </YStack>
));

ErrorState.displayName = "ErrorState";

const HomeUsersScreen = () => {
  const [aoNumber, setAoNumber] = useState<string>("");
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  const setTrackedOrder = useTrackStore((state) => state.setTrackedOrder);
  const getTrackedOrder = useTrackStore((state) => state.getTrackedOrder);
  const clearTrackedOrders = useTrackStore((state) => state.clearTrackedOrders);

  const searchOrder = useTrackAoNumberQuery();

  const handleSearch = useCallback(
    async (value?: string) => {
      const searchValue = value ?? aoNumber;
      const trimmedAO = searchValue.trim().toUpperCase();

      if (!trimmedAO) {
        clearTrackedOrders();
        setCurrentOrder(null);
        return;
      }

      if (value) {
        setAoNumber(value);
      }

      Keyboard.dismiss();

      const cachedOrder = getTrackedOrder(trimmedAO);
      if (cachedOrder) {
        setCurrentOrder(cachedOrder);
        return;
      }

      try {
        const result = await searchOrder.mutateAsync(trimmedAO);

        if (result?.data) {
          setTrackedOrder(result.data);
          setCurrentOrder(result.data);
        }
      } catch (error: any) {
        const aoNum = getAoNumber(error.message);
        ToastAndroid.show(
          `Order "${aoNum}" not found. Please check and retry.`,
          ToastAndroid.SHORT
        );
        setCurrentOrder(null);
      }
    },
    [
      aoNumber,
      clearTrackedOrders,
      getTrackedOrder,
      searchOrder,
      setTrackedOrder,
    ]
  );

  const handleClearSearch = useCallback(() => {
    setAoNumber("");
    setCurrentOrder(null);
  }, []);

  const renderOrderStatus = useCallback(() => {
    if (searchOrder.isPending) {
      return <LoadingState />;
    }

    if (searchOrder.isError && !currentOrder) {
      return <ErrorState aoNumber={aoNumber} onRetry={handleSearch} />;
    }

    if (currentOrder) {
      return (
        <OrderStatusCard
          order={currentOrder}
          onRefresh={handleSearch}
          onClear={handleClearSearch}
        />
      );
    }

    return <EmptyState />;
  }, [
    searchOrder.isPending,
    searchOrder.isError,
    currentOrder,
    aoNumber,
    handleSearch,
    handleClearSearch,
  ]);

  const user = useAuthStore((state) => state.user);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <AdminLayouts
        onSearch={handleSearch}
        username={user?.username || "User"}
        avatarUrl={user?.avatar}
        searchPlaceholder="Enter SC Number"
      >
        <ScrollView>
          <YStack
            flex={1}
            paddingHorizontal="$4"
            paddingTop="$4"
            paddingBottom="$6"
          >
            <YStack gap="$3" flex={1}>
              <Text
                fontWeight="600"
                fontSize={moderateScale(16)}
                color="#333"
                letterSpacing={-0.3}
              >
                Service Order Status
              </Text>
              {renderOrderStatus()}
            </YStack>
          </YStack>
        </ScrollView>
      </AdminLayouts>
    </SafeAreaView>
  );
};

export default HomeUsersScreen;
