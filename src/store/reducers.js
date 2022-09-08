import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer"

// general
import General from "./general/reducer";
//Search
import Search from "./search/reducer";
//User
import User from "./user/reducer";
//Role
import Role from "./role/reducer";
//contact
import Contact from "./contact/reducer";

// product
import Product from "./product/reducer";
// expense category
import ExpenseCategory from"./ExpenseCategory/reducer";

//expense reference
import ExpenseReference from"./ExpenseReference/reducer";

//expense list
import ExpenseList from"./ExpenseList/reducer";

// product
import productBrand from "./productBrand/reducer";

// product Categoy
import productCategories from "./productCategories/reducer";

// product Model
import productModels from "./productModels/reducer"

// purchase
import Purchase from "./purchase/reducer";

//SKU TRANSFER
import skuTransfer from "./skuTransfer/reducer";

// purchase Variations
import PurchaseVariations from "./purchaseVatiations/reducer";

// average purchase price
import AveragePurchasePrice from "./AveragePurchasePrice/reducer";

// product location
import productLocation from "./productLocation/reducer";

// sale
import Sale from "./sale/reducer";

// payment
import Payment from "./payment/reducer";

// record
import Record from "./record/reducer";

// report
import Report from "./report/reducer";

// profit loss report
import ProfitLossReport from "./proftLossReport/reducer";

//salesman report FP
import ReportFP from "./salesmanReportFP/reducer";

//salesman report TP
import ReportTP from "./salesmanReportTP/reducer";

// pool
import Pool from "./pool/reducer";

const rootReducer = combineReducers({
    Layout,
    Login,
    General,
    Search,
    User,
    Role,
    Contact,
    Product,
    ExpenseCategory,
    ExpenseReference,
    ExpenseList,
    productBrand,
    productCategories,
    productModels,
    Purchase,
    skuTransfer,
    PurchaseVariations,
    AveragePurchasePrice,
    productLocation,
    Sale,
    Payment,
    Record,
    Report,
    ProfitLossReport,
    Pool,
    ReportFP,
    ReportTP,
});

export default rootReducer;