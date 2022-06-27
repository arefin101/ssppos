import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//calendar
import calendarSaga from "./calendar/saga";
//chat
import chatSaga from "./chat/saga";
//ecommerce
// import ecommerceSaga from "./ecommerce/saga";

//Project
import projectSaga from "./projects/saga";
// Task
import taskSaga from "./tasks/saga";
//Counter
// import CounterSaga from './formAdvanced/saga';
// Crypto
import cryptoSaga from "./crypto/saga";
//TicketsList
import ticketsSaga from "./tickets/saga";

//crm
import crmSaga from "./crm/saga";
//invoice
import invoiceSaga from "./invoice/saga";

// general
import generalSaga from "./general/saga";

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

// purchase Variations
import purchaseVariationsSaga from './purchaseVatiations/saga';

// purchase Variations
import averagePurchasePriceSaga from './AveragePurchasePrice/saga';

// sale
import saleSaga from "./sale/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(chatSaga),
    fork(projectSaga),
    fork(taskSaga),
    fork(cryptoSaga),
    fork(ticketsSaga),
    fork(calendarSaga),
    // fork(ecommerceSaga),
    fork(crmSaga),
    fork(invoiceSaga),
    
    fork(generalSaga),
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
    fork(saleSaga),
  ]);
}
