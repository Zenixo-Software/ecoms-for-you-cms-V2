import React, { useCallback, useEffect, useState } from "react";
import { createThemedUseStyletron, styled, withStyle } from "baseui";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import Input from "components/Input/Input";
import { gql, useQuery } from "@apollo/client";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch } from "context/DrawerContext";
import {
  StyledCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Orders.style";
import NoResult from "components/NoResult/NoResult";
import { AiTwotoneEdit } from "react-icons/all";
import axiosInstance from "../../util/function/axiosInstance";
import { fireAlertMessage } from "../../util/error/errorMessage";
import { InLineLoader } from "../../components/InlineLoader/InlineLoader";

const GET_ORDERS = gql`
  query getOrders($status: String, $limit: Int, $searchText: String) {
    orders(status: $status, limit: $limit, searchText: $searchText) {
      id
      customer_id
      creation_date
      delivery_address
      amount
      payment_method
      contact_number
      status
    }
  }
`;

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Status = styled("div", ({ $theme }) => ({
  // @ts-ignore
  ...$theme.typography.fontBold14,
  // @ts-ignore
  color: $theme.colors.textDark,
  display: "flex",
  alignItems: "center",
  lineHeight: "1",
  textTransform: "capitalize",

  ":before": {
    content: '""',
    width: "10px",
    height: "10px",
    display: "inline-block",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    // @ts-ignore
    backgroundColor: $theme.borders.borderE6,
    marginRight: "10px",
  },
}));

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px)": {
    alignItems: "center",
  },
}));

const statusSelectOptions = [
  { value: "delivered", label: "Delivered" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
];
const limitSelectOptions = [
  { value: 7, label: "Last 7 orders" },
  { value: 15, label: "Last 15 orders" },
  { value: 30, label: "Last 30 orders" },
];

export default function Orders() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [singleOrder, setSingleOrder] = useState(null);
  const dispatch = useDrawerDispatch();
  const [orders, setOrders] = useState([]);
  const openOderForm = useCallback(
    (data) =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "OPEN_ORDER_EDIT_FORM",
        data: data,
      }),
    [dispatch, singleOrder]
  );

  const openOrderForm = (data: any) => {
    console.log(data);
    setSingleOrder(data);
    if (data) {
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`order/${localStorage.getItem("cmsUserId")}`)
      .then((response) => setOrders(response.data))
      .catch((error) => fireAlertMessage("Something went wrong!"));
  }, []);

  const [useCss, theme] = themedUseStyletron();
  const sent = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const processing = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const paid = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });

  const [status, setStatus] = useState([]);
  const [limit, setLimit] = useState([]);
  const [search, setSearch] = useState([]);

  const { data, error, refetch } = useQuery(GET_ORDERS);
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleStatus({ value }) {
    setStatus(value);
    if (value.length) {
      refetch({
        status: value[0].value,
        limit: limit.length ? limit[0].value : null,
      });
    } else {
      refetch({ status: null });
    }
  }

  function handleLimit({ value }) {
    setLimit(value);
    if (value.length) {
      refetch({
        status: status.length ? status[0].value : null,
        limit: value[0].value,
      });
    } else {
      refetch({
        limit: null,
      });
    }
  }

  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    refetch({ searchText: value });
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map((order) => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Orders</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={status}
                    searchable={false}
                    onChange={handleStatus}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Select
                    options={limitSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={limit}
                    placeholder="Order Limits"
                    searchable={false}
                    onChange={handleLimit}
                  />
                </Col>

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Address"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(80px, auto) minmax(100px, auto) minmax(100px, auto) minmax(80px, auto) minmax(100px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                {/*<StyledHeadCell>*/}
                {/*  <Checkbox*/}
                {/*    type="checkbox"*/}
                {/*    value="checkAll"*/}
                {/*    checked={checked}*/}
                {/*    onChange={onAllCheck}*/}
                {/*    overrides={{*/}
                {/*      Checkmark: {*/}
                {/*        style: {*/}
                {/*          borderTopWidth: '2px',*/}
                {/*          borderRightWidth: '2px',*/}
                {/*          borderBottomWidth: '2px',*/}
                {/*          borderLeftWidth: '2px',*/}
                {/*          borderTopLeftRadius: '4px',*/}
                {/*          borderTopRightRadius: '4px',*/}
                {/*          borderBottomRightRadius: '4px',*/}
                {/*          borderBottomLeftRadius: '4px',*/}
                {/*        },*/}
                {/*      },*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</StyledHeadCell>*/}
                {/*<StyledHeadCell>ID</StyledHeadCell>*/}
                {/*<StyledHeadCell>Customer ID</StyledHeadCell>*/}
                {/*<StyledHeadCell>Time</StyledHeadCell>*/}
                {/*<StyledHeadCell>Delivery Address</StyledHeadCell>*/}
                {/*<StyledHeadCell>Amount</StyledHeadCell>*/}
                {/*<StyledHeadCell>Payment Method</StyledHeadCell>*/}
                {/*<StyledHeadCell>Contact</StyledHeadCell>*/}
                {/*<StyledHeadCell>Status</StyledHeadCell>*/}
                <StyledHeadCell>OrderId</StyledHeadCell>
                <StyledHeadCell>Store</StyledHeadCell>
                <StyledHeadCell>Customer</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Date</StyledHeadCell>
                <StyledHeadCell>Address</StyledHeadCell>
                <StyledHeadCell>Fee</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>More Details</StyledHeadCell>

                {orders ? (
                  orders.length ? (
                    orders.map((item: any, index) => (
                      <React.Fragment key={index}>
                        <StyledCell>{item.orderId.substring(0, 5)}</StyledCell>
                        <StyledCell>{item.cmsId.storeName}</StyledCell>
                        <StyledCell>{item.userId.name}</StyledCell>
                        <StyledCell>{item.amount}</StyledCell>
                        <StyledCell>{item.date}</StyledCell>
                        <StyledCell>{item.deliveryAddress}</StyledCell>
                        <StyledCell>{item.deliveryFee}</StyledCell>
                        <StyledCell>{item.status}</StyledCell>
                        <StyledCell>
                          <div
                            onClick={() => openOderForm(item)}
                            style={{ cursor: "pointer" }}
                          >
                            <AiTwotoneEdit />
                          </div>
                        </StyledCell>
                      </React.Fragment>
                    ))
                  ) : (
                    // .map((row, index) => (
                    //     <React.Fragment key={index}>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell><AiTwotoneEdit/></StyledCell>
                    //         <StyledCell>
                    //             <div onClick={()=>openOrderForm(row)} style={{cursor: 'pointer'}}><AiTwotoneEdit/>
                    //             </div>
                    //         </StyledCell>
                    //         {/*<StyledCell>*/}
                    //         {/*  <Checkbox*/}
                    //         {/*    name={row[1]}*/}
                    //         {/*    checked={checkedId.includes(row[1])}*/}
                    //         {/*    onChange={handleCheckbox}*/}
                    //         {/*    overrides={{*/}
                    //         {/*      Checkmark: {*/}
                    //         {/*        style: {*/}
                    //         {/*          borderTopWidth: '2px',*/}
                    //         {/*          borderRightWidth: '2px',*/}
                    //         {/*          borderBottomWidth: '2px',*/}
                    //         {/*          borderLeftWidth: '2px',*/}
                    //         {/*          borderTopLeftRadius: '4px',*/}
                    //         {/*          borderTopRightRadius: '4px',*/}
                    //         {/*          borderBottomRightRadius: '4px',*/}
                    //         {/*          borderBottomLeftRadius: '4px',*/}
                    //         {/*        },*/}
                    //         {/*      },*/}
                    //         {/*    }}*/}
                    //         {/*  />*/}
                    //         {/*</StyledCell>*/}
                    //         {/*<StyledCell>{row[1]}</StyledCell>*/}
                    //         {/*<StyledCell>{row[2]}</StyledCell>*/}
                    //         {/*<StyledCell>*/}
                    //         {/*  {dayjs(row[3]).format('DD MMM YYYY')}*/}
                    //         {/*</StyledCell>*/}
                    //         {/*<StyledCell>{row[4]}</StyledCell>*/}
                    //         {/*<StyledCell>${row[5]}</StyledCell>*/}
                    //         {/*<StyledCell>{row[6]}</StyledCell>*/}
                    //         {/*<StyledCell>{row[7]}</StyledCell>*/}
                    //         {/*<StyledCell style={{ justifyContent: 'center' }}>*/}
                    //         {/*  <Status*/}
                    //         {/*    className={*/}
                    //         {/*      row[8].toLowerCase() === 'delivered'*/}
                    //         {/*        ? sent*/}
                    //         {/*        : row[8].toLowerCase() === 'pending'*/}
                    //         {/*        ? paid*/}
                    //         {/*        : row[8].toLowerCase() === 'processing'*/}
                    //         {/*        ? processing*/}
                    //         {/*        : row[8].toLowerCase() === 'failed'*/}
                    //         {/*        ? failed*/}
                    //         {/*        : ''*/}
                    //         {/*    }*/}
                    //         {/*  >*/}
                    //         {/*    {row[8]}*/}
                    //         {/*  </Status>*/}
                    //         {/*</StyledCell>*/}
                    //     </React.Fragment>
                    // ))
                    <>
                      {/* <NoResult
                        hideButton={false}
                        style={{
                          gridColumnStart: "1",
                          gridColumnEnd: "one",
                        }}
                      /> */}
                      <InLineLoader />
                    </>
                  )
                ) : (
                  <InLineLoader />
                )}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
