//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "login";
export const POST_LOGOUT = "logout";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//CALENDER
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

//Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";

//project list
export const GET_PROJECT_LIST = "/project/list";
//PRODUCTS
export const GET_PRODUCTS = "/products";
export const GET_ORDERS = "/orders";
export const GET_SELLERS = "/sellers";

//Task
export const GET_TASK_LIST = "/task-list";

//Crypto
export const GET_TRANSATION_LIST = "/transation-list";
export const GET_ORDRER_LIST = "/order-list";

//TicketsList
export const GET_TICKETS_LIST = "/tickets-list";

//Crm
export const GET_CONTACTS = "/crmcontacts";
export const GET_COMPANIES = "/companies";
export const GET_DEALS = "/deals";
export const GET_LEADS = "/leads";

//Invoice
export const GET_INVOICES = "/invoices";
//export const GET_CUSTOMERS = "/customers";

//User
export const GET_USERS = "/user/index-official";
export const GET_USER_BY_ID ="/user/show-official";
export const UPDATE_USER_BY_ID = "user/update-official";
export const ADD_USER = "/user/register-official";
export const ADD_USER_ROLE = "/user/assign-role";
export const GET_ROLE_BY_ID = "/user/assign-role-view";
export const GET_CUA_LIST = "/user/cua-index";

// CUA
export const CUA_ASSIGN = "/user/cua-assign";
export const GET_CUA_ASSIGN_VIEW = "/user/cua-assign-view";

//Role
export const GET_ROLE = "/role/index";
export const CREATE_ROLE = "/role/store";
export const GET_PERMISSION = "/role/assign-permission-view"
export const ASSIGN_PERMISSION = "role/assign-permission"
export const HAS_PERMISSION = "user/has-permission"

// contact
// supplier
export const GET_SUPPLIERS = "user/index-supplier";
export const CREATE_SUPPLIER = "user/register-supplier";
export const GET_SUPPLIER_BY_ID = "user/show-supplier";
export const UPDATE_SUPPLIER_BY_ID = "user/update-supplier";

// customer
export const GET_CUSTOMER_LIST = "user/index-customer";
export const CREATE_CUSTOMER = "user/register-customer";
export const GET_CUSTOMER_BY_ID = "user/show-customer";
export const UPDATE_CUSTOMER_BY_ID = "user/update-customer";

// customer shipping address
export const GET_SHIPPING_ADDRESS = "user/customer/get-shipping-addresses";
export const ADD_SHIPPING_ADDRESS = "user/customer/store-shipping-address";
export const EDIT_SHIPPING_ADDRESS = "user/customer/edit-shipping-address";
export const DELETE_SHIPPING_ADDRESS = "user/customer/delete-shipping-address";

//products

export const ADD_BRAND = "brand/store";

export const GET_PRODUCT_CATEGORY_LIST = "/product-category/index";
export const GET_BRAND_LIST = "brand/index";
export const CREATE_BRAND = "brand/store";
export const GET_PRODUCT_LIST = "product/index";
export const CREATE_PRODUCT_PHONE = "product/store-phone";
export const CREATE_PRODUCT_CHARGER = "/product/store-charger";
export const GET_PRODUCT_CATEGORY = "/purchase-variation/get-product-category-type";
export const GET_VARIATIONS_BY_PRODUCTS = "/product/get-purchase-variations"

//PRODUCT MODEL
export const GET_PRODUCT_MODEL_LIST = "product-model/index";
export const CREATE_PRODUCT_MODEL = "product-model/store";

//Product Brand Selected data
export const GET_PRODUCT_BRAND_SELECT = "product/store-product-view";
//role permission
export const GET_ROLE_PERMISSION_SELECT = "user/get-permissions";

// sales
export const IMEI_SCAN = "/sale/imei-scan";
export const CREATE_SALE_TRANSACTION = "/sale/store";
export const GET_STORE_SALE_VIEW = "/sale/store-sale-view";

//expense category list
export const GET_EXPENSE_CATEGORY_LIST = "expense-category/index";

//expense category store
export const CREATE_EXPENSE_CATEGORY = "expense-category/store";

//expense referene list
export const GET_EXPENSE_REFERENCE_LIST = "expense-reference/index";

//expense reference store
export const CREATE_EXPENSE_REFERENCE = "expense-reference/store";

//expense list
export const GET_EXPENSE_LIST = "expense/index";

//expense store
export const CREATE_EXPENSE_STORE = "expense/store";
export const GET_EXPENSE_VIEW = "expense/store-expense-view";

//Purchase
export const GET_PURCHASE = "purchase/index";
export const GET_STORE_PURCHASE_VIEW = "/purchase/store-purchase-view";

//Purchase Variations
export const GET_PURCHASE_VARIATION = "purchase-variation/index";
export const GET_PURCHASE_VARIATIONS_BY_ID = "purchase/get-purchase-variations";
export const CREATE_PURCHASE_VARIATION = "purchase-variation/store";
export const CREATE_PURCHASE = "/purchase/store";
export const GET_STORE_PURCHASE_VARIATION_VIEW = "/purchase-variation/store-purchase-variation-view";

// Average Purchase Prices
export const GET_AVERAGE_PURCHASE_PRICES = "/purchase-variation/get-average-purchase-price";

// Sale
export const GET_SALE_LIST = "/sale/index";
