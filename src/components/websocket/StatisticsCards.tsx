import React from "react";

//** Material-UI components */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Fab, IconButton, Tooltip } from "@mui/material";

//** Iconify components */
import { Icon } from "@iconify/react";

//** my components */
import CustomChip from "../chip/CustomeChip";
import { Error500 } from "../../pages";
import { useWebSocket } from "../../hook";
import CircularIndeterminate from "../spinner/CircularIndeterminate";

//** interface */
import { CardData } from "../../interfaces";

const StatisticsCards: React.FC = () => {
  const url =
    process.env.WEBSCOKET_URL ||
    "wss://stream.base-mainnet.jojo.exchange/v1/multiple?streams=btcusdc@market";

  //** Custom hook to get market data */
  const { marketData, error } = useWebSocket(url);

  //** Card data */
  const cardData: CardData[] = [
    {
      totalUsers: marketData?.["24hVolume"],
      title: "All 24h volume",
      icon: "tabler:volume",
      color: "warning",
      tooltip: "Number Price 24h ago ",
      changePercentage: marketData?.price24HAgo,
    },
    {
      totalUsers: marketData?.fundingRate,
      title: "Funding Rate",
      icon: "material-symbols:star-rate",
      color: "success",
      tooltip: "Number of funding rate subscriptions",
      changePercentage: marketData?.fundingRate,
    },
    {
      totalUsers: marketData?.lastTradePrice,
      title: "Last Trade Price",
      icon: "solar:tag-price-bold",
      color: "error",
      tooltip: "Number of Last Trade Price subscriptions",
      changePercentage: marketData?.lastTradePrice,
    },
    {
      totalUsers: marketData?.markPrice,
      title: "Last Mark Price",
      icon: "fa6-solid:money-bills",
      color: "info",
      tooltip: "Number of Last index Price subscriptions",
      changePercentage: marketData?.indexPrice,
    },
    {
      totalUsers: marketData?.liquidationPriceOff,
      title: "Last liquidation Price Off",
      icon: "pepicons-pencil:dollar-off",
      color: "info",
      tooltip: "Number of liquidation Threshold ",
      changePercentage: marketData?.liquidationThreshold,
    },
    {
      totalUsers: marketData?.lastTradePrice,
      title: "Last trade off",
      icon: "pepicons-pencil:dollar-off",
      color: "error",
      tooltip: "Next funding time",
      changePercentage: marketData?.nextFundingTime,
    },
    {
      totalUsers: marketData?.openInterest,
      title: "Open Interest",
      icon: "pepicons-pencil:lock-open",
      color: "warning",
      tooltip: "Threshold",
      changePercentage: marketData?.liquidationThreshold,
    },
    // Add more CardData objects as needed
  ];

  //** If marketData is not available, show spinner */
  if (!marketData) return <CircularIndeterminate />;

  //** If error occurs, show Error500 component */
  if (error) return <Error500 />;

  return (
    <Grid container spacing={6} className="match-height">
      <Grid container spacing={5} sx={{ ml: 1 }}>
        {cardData.map((item, index: number) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    mb: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box display={"flex"} gap={2}>
                    <Typography sx={{ color: "text.secondary" }}>
                      {item.title}
                    </Typography>
                    {item.changePercentage ? (
                      <CustomChip
                        rounded
                        size="small"
                        skin="light"
                        color={
                          Number(item.changePercentage) < 0
                            ? "error"
                            : "success"
                        }
                        label={
                          Number(item.changePercentage) < 0
                            ? `${item.changePercentage}%`
                            : `+ ${item.changePercentage}%`
                        }
                      />
                    ) : null}
                  </Box>
                  <Tooltip title={item.tooltip}>
                    <IconButton>
                      <Icon icon="mdi:question-mark-circle-outline" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  {typeof item.totalUsers === "number" ? (
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {item.totalUsers}
                    </Typography>
                  ) : (
                    item.totalUsers
                  )}
                  <Fab
                    size="small"
                    color={item.color}
                    sx={{ color: "text.disabled" }}
                  >
                    <Icon icon={item.icon} color="white" />
                  </Fab>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default StatisticsCards;
