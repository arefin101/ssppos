
//LOGIN
export const POST_FAKE_LOGIN = "login";
export const POST_LOGOUT = "logout";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

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

// supplier
export const GET_SUPPLIERS = "user/index-supplier";
export const CREATE_SUPPLIER = "user/register-supplier";
export const GET_SUPPLIER_BY_ID = "user/show-supplier";
export const UPDATE_SUPPLIER_BY_ID = "user/update-supplier";
export const GET_SUPPLIER_CREDIT ="/user/supplier/get-supplier-credit-history";

// customer
export const GET_CUSTOMER_LIST = "user/index-customer";
export const CREATE_CUSTOMER = "user/register-customer";
export const GET_CUSTOMER_BY_ID = "user/show-customer";
export const UPDATE_CUSTOMER_BY_ID = "user/update-customer";
export const GET_CUSTOMER_CREDIT = "user/customer/get-customer-credit-history"
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

// Sale
export const GET_SALE_LIST = "/sale/index";
export const IMEI_SCAN = "/sale/imei-scan";
export const CREATE_SALE_TRANSACTION = "/sale/store";
export const GET_STORE_SALE_VIEW = "/sale/store-sale-view";
export const GET_SALE_VARIATIONS = "/sale/get-sale-variations";
export const GET_PURCHASE_VARIATIONS_SALE = "/sale/purchase-variations-for-sale";
export const ALTERNATIVE_SCAN = "/sale/imei-scan-alternative";
export const GET_SALE_RETURN_STORE_VIEW = "/sale-return/store-sale-return-view";
export const GET_SALE_INVOICE = "/sale/get-sale-invoice";
export const DOWNLOAD_SALE_INVOICE = "/sale/downlaod-sale-invoice";
export const EMAIL_SALE_INVOICE = "/sale/email-sale-invoice";
export const SALE_TRANSACTION_VERIFICATION = "/sale/verification";
export const SELLING_PRICE_APPROVAL = "/sale/selling-price-approval";

// SALE RETURN
export const SALE_RETURN_LIST = "/sale-return/index";
export const SALE_RETURN_VARIATION_BY_ID = "/sale-return/get-sale-return-variations";
export const CREATE_SALE_RETURN = "/sale-return/store";
export const GET_SALE_RETURN_INVOICE = "/sale-return/get-sale-return-invoice";
export const SALE_RETURN_TRANSACTION_VERIFICATION = "/sale-return/verification";

//expense
export const GET_EXPENSE_CATEGORY_LIST = "/expense-category/index";
export const CREATE_EXPENSE_CATEGORY = "/expense-category/store";
export const GET_EXPENSE_REFERENCE_LIST = "/expense-reference/index";
export const CREATE_EXPENSE_REFERENCE = "/expense-reference/store";
export const GET_EXPENSE_LIST = "/expense/index";
export const CREATE_EXPENSE_STORE = "/expense/store";
export const GET_EXPENSE_VIEW = "/expense/store-expense-view";
export const GET_EXPENSE_SUMMARY = "/expense/summary";
export const EXPENSE_TRANSACTION_VERIFICATION = "/expense/verification";

//Purchase
export const GET_PURCHASE = "purchase/index";
export const GET_STORE_PURCHASE_VIEW = "/purchase/store-purchase-view";
export const GET_PURCHASE_INVOICE = "/purchase/get-purchase-invoice";
export const PURCHASE_TOGGLE_LOCK = "/purchase/toggle-lock";
export const PURCHASE_VERIFICATION = "/purchase/verification";

//Purchase Return
export const GET_PURCHASE_RETURN_LIST = "/purchase-return/index";
export const GET_PURCHASE_RETURN_VARIATIONS = "/purchase-return/get-purchase-return-variations";
export const CREATE_PURCHASE_RETURN = "/purchase-return/store";
export const PURCHASE_RETURN_VERIFICATION = "/purchase-return/verification";

// SKU TRANSFER
export const GET_SKU_TRANSFER_VIEW_DATA = "/sku-transfer/view";
export const GET_SKU_TRANSFER_STORE_DATA = "/sku-transfer/store-view";
export const SKU_TRANSFER = "/sku-transfer/store";
export const SKU_TRANSFER_HISTORY = "/sku-transfer/history";
export const SKU_TRANSFER_HISTORY_DETAILS = "/sku-transfer/history-details";

//Purchase Variations
export const GET_PURCHASE_VARIATION = "purchase-variation/index";
export const GET_PURCHASE_VARIATIONS_BY_ID = "purchase/get-purchase-variations";
export const CREATE_PURCHASE_VARIATION = "purchase-variation/store";
export const CREATE_PURCHASE = "/purchase/store";
export const GET_STORE_PURCHASE_VARIATION_VIEW = "/purchase-variation/store-purchase-variation-view";

// Average Purchase Prices
export const GET_AVERAGE_PURCHASE_PRICES = "/purchase-variation/get-average-purchase-price";
export const GET_PURCHASE_PRODUCT_LIST = "/purchase-variation/get-purchase-product-list";

// Payment
export const GET_PAYMENT_METHODS = "/payment-method/index";
export const CREATE_PAYMENT_METHOD = "/payment-method/store";
export const GET_INVOICE_LIST = "/money-transaction/sale-payment-view";
export const MAKE_PAYMENT_VIEW = "/money-transaction/make-payment-view";
export const CREATE_SALE_PAYMENT = "/money-transaction/store";
export const GET_PAYMENT_METHOD_REPORT = "/payment-method/report";
export const GET_PAYMENT_METHOD_SUMMARY = "/payment-method/summary";
export const GET_PAYMENTS_BY_METHOD = "/payment-method/payments";

// Money Transaction
export const GET_CUSTOMER_DROPDOWN = "/money-transaction/customer-dropdown";
export const GET_COLLECTIVE_PAYMENT_VIEW = "/money-transaction/collective-sale-payment-view";
export const GET_PURCHASE_PAYMENT_VIEW = "/money-transaction/purchase-payment-view";
export const CREATE_COLLECTIVE_PAYMENT = "/money-transaction/store";
export const CREATE_PURCHASE_PAYMENT = "/money-transaction/store";
export const GET_EXPENSE_PAYMENT_VIEW = "/money-transaction/expense-payment-view";
export const CREATE_EXPENSE_PAYMENT = "/money-transaction/store";
export const PAYMENT_VERIFICATION = "/money-transaction/payment-verification";
export const GET_ADD_CUSTOMER_CREDIT_VIEW = "/money-transaction/add-customer-credit-view";
export const GET_AVAILABLE_CUSTOMER_CREDIT = "/money-transaction/customer-credit-available-credit";
export const CREATE_CUSTOMER_CREDIT = "/user/customer/store-customer-credit";
export const WITHDRAW_CUSTOMER_CREDIT = "/user/customer/withdraw-customer-credit";

// Record
export const GET_TRANSACTION_RECORDS = "/record/transactions";
export const GET_CASH_IN_RECORDS = "/record/cash-in";
export const GET_CASH_OUT_RECORDS = "/record/cash-out";
export const GET_VERIFICATION_RECORD = "record/verification-record";
export const GET_USER_LOG = "/record/user-log";

// POOL
export const GET_POOL_HISTORY = "/pool/history";
export const DELETE_POOL_HISTORY = "/pool/delete";
export const UPDATE_POOL_HISTORY = "/pool/update";
export const ADD_POOL = "/pool/add";
export const WITHDRAW_POOL = "/pool/withdraw";

// Report
export const GET_CAS_INDEX = "/report/cas-index";
export const GET_CAS_INDEX_VIEW = "/report/cas-index-view";
export const GET_SAS_INDEX = "/report/sas-index";
export const GET_SAS_INDEX_VIEW = "/report/sas-index-view";
export const GET_SPR_INDEX = "/report/spr-index";
export const GET_PPR_INDEX = "/report/ppr-index";
export const GET_EPR_INDEX = "/report/epr-index";
export const GET_VERIFICATION_REPORT_LIST = "/report/verification-report";

// Salesman Report FP
export const GET_COMMISSION_BY_SALE_INVOICE_FP = "/salesman-report/commission-by-sale-invoice-fp";
export const GET_COMMISSION_BY_CUSTOMER_FP = "/salesman-report/commission-by-customer-fp";
export const GET_COMISSION_BY_RETURN_INVOICE_FP = "/salesman-report/commission-by-return-invoice-fp";
export const GET_SALES_DUE_FP = "/salesman-report/sales-due-fp";

// Salesman Report TP
export const GET_SALESMAN_DROPDOWN = "/salesman-report/salesman-dropdown";
export const GET_SALES_DUE_TP = "/salesman-report/sales-due-tp";
export const GET_COMM_BY_RETURN_INVOICE_TP = "/salesman-report/commission-by-return-invoice-tp";
export const GET_COMMISSION_BY_SALE_INVOICE_TP = "/salesman-report/commission-by-sale-invoice-tp";
export const GET_COMMISSION_SUMMARY = "/salesman-report/commission-summary-tp";
export const SALES_DUE_SUMMARY = "/salesman-report/sales-due-summary-tp";
export const GET_COMMISSION_BY_CUSTOMER_TP = "/salesman-report/commission-by-customer-tp";

// Profit Loss Report
export const GET_PROFIT_BY_SALE_INVOICE = "/report/profit-by-sale-invoice";
export const GET_PROFIT_BY_CUSTOMER_VIEW = "/report/profit-by-customer-view";
export const GET_PROFIT_BY_CUSTOMER = "/report/profit-by-customer";
export const GET_PROFIT_BY_DATE = "/report/profit-by-date";
export const GET_PROFIT_BY_PRODUCTS = "/report/profit-by-products";
export const GET_PROFIT_BY_PRODUCT_MODELS = "/report/profit-by-product-models";
export const GET_PROFIT_BY_PRODUCT_CATAGORIES = "/report/profit-by-product-categories";

// Product Transfer
export const GET_PRODUCTS_ON_HAND = "/product-location/on-hand";
export const GET_PRODUCTS_ON_HAND_VARIATIONS = "/product-location/on-hand-variations";
export const GET_PRODUCT_TRANSFER_VIEW = "/product-location/transfer-view";
export const GET_PRODUCT_TRANSFER_HISTORY = "/product-location/transfer-history";
export const GET_PRODUCT_TRANSFER_HISTORY_DETAILS = "/product-location/transfer-history-details";
export const CREATE_PRODUCT_TRANSFER = "/product-location/transfer";
export const GET_PURCHASE_INVOICE_LIST = "/product-location/purchase-invoice-list";
export const GET_LAST_TRANSACTION = "/product-location/last_transactions";
export const GET_PRODUCT_BY_PURCHASE_INVOICE = "/product-location/product-by-purchase-invoice";
export const GET_PRODUCT_BY_LAST_TRANSACTION = "/product-location/product_by_last_transactions";
export const GET_PRODUCT_BY_IMEI_SCAN = "/product-location/product_by_imei"

// Search
export const IMEI_SEARCH = "/search/imei";