import { takeLatest } from "redux-saga/effects";
import { ADD_PRODUCT_CALLER } from "./actionTypes";
import axiosInstance from "../../util/function/axiosInstance";
import {
  fireAlertMessage,
  fireAlertRegister,
} from "../../util/error/errorMessage";

// eslint-disable-next-line require-yield
export function* addProductCaller(action) {
  console.log(action.data);
  const formData = new FormData();
  formData.append("title", action.data.name);
  formData.append("description", action.data.description);
  formData.append("price", action.data.price);
  formData.append("quantity", action.data.quantity);
  formData.append("salePrice", action.data.salePrice);
  formData.append("unit", action.data.unit);
  formData.append("image", action.data.image);
  formData.append("image1", action.data.image1);
  formData.append("image2", action.data.image2);
  formData.append("discountInPercent", action.data.discountInPercent);
  formData.append("tenentId", localStorage.getItem("cmsUserId"));
  action.data.tag.forEach((e, index) => {
    formData.append(`categories[${index}]`, e.categoryId);
  });
  formData.append(
    "type",
    action.data.type.filter((item) => item.value)
  );
  axiosInstance
    .post("product", formData)
    .then((response) => {
      fireAlertRegister("Product Created!");
    })
    .catch((error) => {
      console.log(error);
      fireAlertMessage("Something went wrong!");
    });
}

function* watchProductSagas() {
  yield takeLatest(ADD_PRODUCT_CALLER, addProductCaller);
}

// {
//     "name": "Gathsara Umesh",
//     "description": "sdfds",
//     "price": 230,
//     "unit": "234",
//     "salePrice": 229,
//     "discountInPercent": 230,
//     "quantity": 229,
//     "tag": [
//         {
//             "categoryId": "1758897b-dbfc-49ce-87bf-fd0472652e72",
//             "title": "Meat & Fish",
//             "icon": "https://storage.googleapis.com/ecoms-dev.appspot.com/e49049a5-c70a-4cda-b9b1-b91c08a50131-download%20(3).jpeg",
//             "type": "grocery",
//             "slug": "Meat & Fish-osksrg",
//             "children": [
//                 {
//                     "type": "grocery",
//                     "title": "Fresh Fish"
//                 },
//                 {
//                     "type": "grocery",
//                     "title": "Meat"
//                 }
//             ],
//             "tenentId": {
//                 "cmsUserId": "b39dcfdb-651c-4acd-a4b2-f2817d2045b6",
//                 "tenantId": "Gathsara-Gathsara-156xn",
//                 "storeName": "Gathsara",
//                 "domain": "gathsara.ecomsforyou.store",
//                 "firstName": "Gathsara",
//                 "lastName": "Umesh",
//                 "type": "Grocery",
//                 "tpNumber": "0716318013",
//                 "email": "umeshgathsara@gmail.com"
//             }
//         }
//     ],
//     "type": [
//         {
//             "value": "grocery",
//             "name": "Grocery",
//             "id": "1"
//         }
//     ]
// }

const productSagas = [watchProductSagas];

export default productSagas;
