import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AuthSaga from "./auth/login/saga";

// general
import generalSaga from "./general/saga";

// search
import searchSaga from "./search/saga";

//user
import userSaga from "./user/saga";

//role
import roleSaga from "./role/saga";

//contact
import contactSaga from './contact/saga';

// product
import productSaga from './product/saga';
// expense category
import expenseCategorySaga from './ExpenseCategory/saga';
// expense reference
import expenseReferenceSaga from './ExpenseReference/saga';
// expense list
import expenseListSaga from './ExpenseList/saga';

// productBrand
import productBrandSaga from './productBrand/saga';

// product Category
import productCategorySaga from './productCategories/saga';

// product Models
import productModelsSaga from './productModels/saga';

// purchase
import purchaseSaga from './purchase/saga';

//SKU TRANSFER
import skuTransferSaga from "./skuTransfer/saga";

// purchase Variations
import purchaseVariationsSaga from './purchaseVatiations/saga';

// purchase Variations
import averagePurchasePriceSaga from './AveragePurchasePrice/saga';

// product location
import productLocationSaga from './productLocation/saga';

// sale
import saleSaga from "./sale/saga";

// payment
import paymentSaga from "./payment/saga";

// report
import reportSaga from "./report/saga";

// profit loss report
import profitLossReportSaga from "./proftLossReport/saga";

//salesman report FP
import ReportFPSaga from "./salesmanReportFP/saga";

//salesman report TP
import ReportTPSaga from "./salesmanReportTP/saga";

// record
import recordSaga from "./record/saga";

// pool
import poolSaga from "./pool/saga";

export default function* rootSaga() {
  yield all([
    fork(LayoutSaga),
    fork(AuthSaga),
    fork(generalSaga),
    fork(searchSaga),
    fork(userSaga),
    fork(roleSaga),
    fork(contactSaga),
    fork(productSaga),
    fork(expenseCategorySaga),
    fork(expenseReferenceSaga),
    fork(expenseListSaga),
    fork(productBrandSaga),
    fork(productCategorySaga),
    fork(productModelsSaga),
    fork(purchaseSaga),
    fork(purchaseVariationsSaga),
    fork(averagePurchasePriceSaga),
    fork(productLocationSaga),
    fork(saleSaga),
    fork(paymentSaga),
    fork(recordSaga),
    fork(reportSaga),
    fork(profitLossReportSaga),
    fork(skuTransferSaga),
    fork(poolSaga),
    fork(ReportFPSaga),
    fork(ReportTPSaga),
  ]);
}
