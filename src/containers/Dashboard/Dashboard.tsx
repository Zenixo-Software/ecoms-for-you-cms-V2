import React, { useEffect, useState } from "react";
import { withStyle, useStyletron } from "baseui";
import { Grid, Row, Col as Column } from "components/FlexBox/FlexBox";
import RadialBarChart from "components/Widgets/RadialBarChart/RadialBarChart";
import LineChart from "components/Widgets/LineChart/LineChart";
import ColumnChart from "components/Widgets/ColumnChart/ColumnChart";
import DonutChart from "components/Widgets/DonutChart/DonutChart";
import GraphChart from "components/Widgets/GraphChart/GraphChart";
import GradiantGraphChart from "components/Widgets/GradiantGraphChart/GradiantGraphChart";
import MapWidget from "components/Widgets/MapWidget/MapWidget";
import StickerCard from "components/Widgets/StickerCard/StickerCard";

import { Revenue } from "assets/icons/Revenue";
import { Refund } from "assets/icons/Refund";
import { CoinIcon } from "assets/icons/CoinIcon";
import { CartIconBig } from "assets/icons/CartIconBig";
import { UserIcon } from "assets/icons/UserIcon";
import { DeliveryIcon } from "assets/icons/DeliveryIcon";
import axiosInstance from "../../util/function/axiosInstance";
import { fireAlertMessage } from "../../util/error/errorMessage";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Dashboard = () => {
  const [css] = useStyletron();
  const mb30 = css({
    "@media only screen and (max-width: 990px)": {
      marginBottom: "16px",
    },
  });
  const [revenue, setRevenue] = useState([]);
  const [totalCustomers, setTotalCustomer] = useState([]);
  const [totalProduct, setTotalProduct] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`order/${localStorage.getItem("cmsUserId")}`)
      .then((response) => setRevenue(response.data))
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`shop-user/shop/${localStorage.getItem("cmsUserId")}`)
      .then((response) => setTotalCustomer(response.data))
  }, []);

  React.useEffect(() => {
    axiosInstance
      .get(`product/${localStorage.getItem("cmsUserId")}`)
      .then((response) => setTotalProduct(response.data))
  }, []);


  return (
    <Grid fluid={true}>
      <Row>
        <Col md={5} lg={4} sm={6}>
          <RadialBarChart
            widgetTitle="Target"
            series={[43, 75]}
            label={["$1,342", "$8,908"]}
            colors={["#03D3B5", "#666d92"]}
            helperText={["Weekly Targets", "Monthly Targets"]}
          />
        </Col>
        <Col md={7} lg={8} sm={6}>
          <LineChart
            widgetTitle="User Hit Rate"
            color={["#03D3B5"]}
            categories={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
            seriesName="Unique visitors"
            series={[
              200, 150, 430, 320, 600, 468, 309, 500, 273, 370, 260, 180,
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={3} sm={6} xs={12} className={mb30}>
          <StickerCard
            title="Total Revenue"
            subtitle="(Last 30 Days)"
            icon={<CoinIcon />}
            price={
              revenue.length === 0
                ? "0"
                : revenue.length === 1
                ? String(revenue[0].subtotal)
                : String(
                    revenue.reduce((accumulator: any, currentValue: any) => {
                      return accumulator + Number(currentValue.subtotal);
                    }, 0)
                  )
            }
            indicator="up"
            indicatorText="Revenue up"
            note="(previous days)"
            link="#"
            linkText="Full Details"
            data={revenue}
            fileName='revenue.csv'
          />
        </Col>
        <Col lg={3} sm={6} xs={12} className={mb30}>
          <StickerCard
            title="Total Order"
            subtitle="(Last 30 Days)"
            icon={<CartIconBig />}
            price={revenue.length === 0 ? '0' : String(revenue.length)}
            indicator="down"
            indicatorText="Order down"
            note="(previous days)"
            link="#"
            linkText="Full Details"
            data={revenue}
            fileName='totalOrder.csv'
          />
        </Col>
        <Col lg={3} sm={6} xs={12}>
          <StickerCard
            title="New Customer"
            subtitle="(Last 30 Days)"
            icon={<UserIcon />}
            price={totalCustomers.length === 0 ? '0' : String(totalCustomers.length)}
            indicator="up"
            indicatorText="Customer up"
            note="(previous days)"
            link="#"
            linkText="Full Details"
            data={totalCustomers}
            fileName='customers.csv'
          />
        </Col>
        <Col lg={3} sm={6} xs={12}>
          <StickerCard
            title="Total Product"
            subtitle="(Last 30 Days)"
            icon={<DeliveryIcon />}
            price={totalProduct.length === 0 ? '0' : String(totalProduct.length)}
            indicator="up"
            indicatorText="Delivery up"
            note="(previous days)"
            link="#"
            linkText="Full Details"
            data={totalProduct}
            fileName='products.csv'
          />
        </Col>
      </Row>

      <Row>
        <Col md={7} lg={8}>
          <GraphChart
            widgetTitle="Sales From Social Media"
            colors={["#03D3B5"]}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              "2019-05-12",
              "2019-05-13",
              "2019-05-14",
              "2019-05-15",
              "2019-05-16",
              "2019-05-17",
              "2019-05-18",
            ]}
          />
        </Col>

        <Col md={5} lg={4}>
          <DonutChart
            widgetTitle="Target"
            series={[30634, 6340]}
            labels={["Todays Revenue", "Todays Refund"]}
            colors={["#03D3B5", "#666d92"]}
            helperText={["Weekly Targets", "Monthly Targets"]}
            icon={[<Revenue />, <Refund />]}
            prefix="$"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={12}>
          <ColumnChart
            widgetTitle="Sale History"
            colors={["#03D3B5"]}
            prefix="$"
            totalValue="1,92,564"
            position="up"
            percentage="1.38%"
            text="More than last year"
            series={[44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]}
            categories={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col md={5} lg={4}>
          <GradiantGraphChart
            colors={["#03D3B5"]}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              "2019-05-12",
              "2019-05-13",
              "2019-05-14",
              "2019-05-15",
              "2019-05-16",
              "2019-05-17",
              "2019-05-18",
            ]}
            topRowTitle="Performance"
            bottomRowData={[
              {
                label: "Last Week Profit",
                valueText: "+29.7%",
                value: 29.7,
                color: "#03D3B5",
              },
              {
                label: "This Week Losses",
                valueText: "-53.4%",
                value: 53.4,
                color: "#FC747A",
              },
            ]}
          />
        </Col>

        <Col md={7} lg={8}>
          <MapWidget
            data={[
              {
                name: "Williamburgs",
                value: 69922,
                color: "#2170FF",
              },
              {
                name: "Brooklyn",
                value: 41953,
                color: "#29CAE4",
              },
              {
                name: "New York",
                value: 23307,
                color: "#666D92",
              },
              {
                name: "Jersey City",
                value: 20200,
                color: "#03D3B5",
              },
            ]}
            totalText="Total Client"
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default Dashboard;
