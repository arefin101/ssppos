import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import Calendar from "./calendar/reducer";
//Chat
import chat from "./chat/reducer";
//Ecommerce
// import Ecommerce from "./ecommerce/reducer";

//Project
import Projects from "./projects/reducer";

// Tasks
import Tasks from "./tasks/reducer";
//Form advanced
import changeNumber from "./formAdvanced/reducer";

//Crypto
import Crypto from "./crypto/reducer";

//TicketsList
import Tickets from "./tickets/reducer";
//Crm
import Crm from "./crm/reducer";

//Invoice
import Invoice from "./invoice/reducer";




// general
import General from "./general/reducer";
//User
import User from "./user/reducer";
//User
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

// purchase Variations
import PurchaseVariations from "./purchaseVatiations/reducer";


// average purchase price
import AveragePurchasePrice from "./AveragePurchasePrice/reducer";

// sale
import Sale from "./sale/reducer";

const rootReducer = combineReducers({
    // public
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Calendar,
    chat,
    Projects,
    // Ecommerce,
    Tasks,
    changeNumber,
    Crypto,
    Tickets,
    Crm,
    Invoice,
    
    General,
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
    PurchaseVariations,
    AveragePurchasePrice,
    Sale,
});

export default rootReducer;