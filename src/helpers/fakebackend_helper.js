import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// Logout Method
export const postLogout = () => api.create(url.POST_LOGOUT );
// postForgetPwd
export const postFakeForgetPwd = data => api.create(url.POST_FAKE_PASSWORD_FORGET, data);


// Register Method
export const postJwtRegister = (url,data) => {
  return api.create(url, data)
  .catch(err => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message = "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};
// Login Method
export const postJwtLogin = data => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = data => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => api.create(url.SOCIAL_LOGIN, data);

// Search
export const imeiSearch = (imei) => api.get(`${url.IMEI_SEARCH}?imei=${imei}`);



// user
export const getUsers = () => api.get(url.GET_USERS);
export const getUserById = (id) => api.get(`${url.GET_USER_BY_ID}/${id}`);
export const addUser = data => api.create(url.ADD_USER, data);
export const updateUserById = (id, data) => api.create(`${url.UPDATE_USER_BY_ID}/${id}`, data);
export const addUserRole = data => api.create(url.ADD_USER_ROLE, data);
export const hasPermission = permissionName => api.get(url.HAS_PERMISSION, { permission: permissionName });
export const getCuaList = () => api.get(url.GET_CUA_LIST);

// cua
export const cuaAssign = data => api.create(url.CUA_ASSIGN, data); 
export const getCuaAssignView = () => api.get(url.GET_CUA_ASSIGN_VIEW);

//roles
export const getRoles = () => api.get(url.GET_ROLE);
export const getRoleById = id => api.get(`${url.GET_ROLE_BY_ID}/${id}`);
export const createRole = data => api.create(url.CREATE_ROLE, data);
export const getPermissions = id => api.get(`${url.GET_PERMISSION}/${id}`);
export const assignPermission = data => api.create(url.ASSIGN_PERMISSION, data);

// brand
export const getBrandList = () => api.get(url.GET_BRAND_LIST );
export const createBrand = data => api.create(url.CREATE_BRAND, data);

// SUPPLIER
export const getSuppliers = () => api.get(url.GET_SUPPLIERS );
export const createSupplier = data => api.create(url.CREATE_SUPPLIER, data);
export const getSupplierById = (id) => api.get(`${url.GET_SUPPLIER_BY_ID}/${id}`);
export const updateSupplierById = (id, data) => api.create(`${url.UPDATE_SUPPLIER_BY_ID}/${id}`, data);
export const getSupplierCredit = (id) => api.get(`${url.GET_SUPPLIER_CREDIT}/${id}`);

// CUSTOMER
export const getCustomerList = () => api.get(url.GET_CUSTOMER_LIST )
export const getCustomerById = (id) => api.get(`${url.GET_CUSTOMER_BY_ID}/${id}`);
export const createCustomr = data => api.create(url.CREATE_CUSTOMER, data);
export const updateCustomerById = (id, data) => api.create(`${url.UPDATE_CUSTOMER_BY_ID}/${id}`, data);
export const getCustomerCredit = (id) => api.get(`${url.GET_CUSTOMER_CREDIT}/${id}`);
// customer shipping address
export const getShippingAddress = (id) => api.get(`${url.GET_SHIPPING_ADDRESS}/${id}`);
export const addShippingAddress = (id, value) => api.create(`${url.ADD_SHIPPING_ADDRESS}/${id}`, value);
export const editShippingAddress = (id, value) => api.create(`${url.EDIT_SHIPPING_ADDRESS}/${id}`, value);
export const deleteShippingAddress = (id, index) => api.create(`${url.DELETE_SHIPPING_ADDRESS}/${id}`, index);

//product
// export const getBrandList = () => api.get(url.GET_BRAND_LIST );
 
// product
export const getProductCategoryList = () => api.get(url.GET_PRODUCT_CATEGORY_LIST );
export const getProductList = () => api.get(url.GET_PRODUCT_LIST );
export const createPhone = data => api.create(url.CREATE_PRODUCT_PHONE, data);
export const createCharger = data => api.create(url.CREATE_PRODUCT_CHARGER, data);
export const getVariationsByProduct = id => api.get(`${url.GET_VARIATIONS_BY_PRODUCTS}/${id}`);

// product model list
export const getProductModelList = () => api.get(url.GET_PRODUCT_MODEL_LIST );
export const createProductModel = data => api.create(url.CREATE_PRODUCT_MODEL, data);

//Product Brand Selected data
export const getProductBrandSelect = () => api.get(url.GET_PRODUCT_BRAND_SELECT );

//get product Category
export const getProductCategory = id => api.get(`${url.GET_PRODUCT_CATEGORY}/${id}`);

//Purchase
export const getPurchases = () => api.get(url.GET_PURCHASE );
export const getStorePurchaseView = () => api.get(url.GET_STORE_PURCHASE_VIEW );
export const getPurchaseInvoice = (id) => api.get(`${url.GET_PURCHASE_INVOICE}/${id}`);
export const purchaseToggleLock = (id) => api.get(`${url.PURCHASE_TOGGLE_LOCK}/${id}`);
export const purchaseVerification = data => api.create(url.PURCHASE_VERIFICATION, data);

//Purchase Return
export const getPurchaseReturnList = () => api.get(url.GET_PURCHASE_RETURN_LIST);
export const getPurchaseReturnVariationsById = (id) => api.get(`${url.GET_PURCHASE_RETURN_VARIATIONS}/${id}`);
export const purchaseReturnVerification = data => api.create(url.PURCHASE_RETURN_VERIFICATION, data);
export const createPurchaseReturn = data => api.create(url.CREATE_PURCHASE_RETURN, data);

// Product Location
export const getProductsOnHand = () => api.get(url.GET_PRODUCTS_ON_HAND );
export const getProductsOnHandVariations = (id) => api.get(`${url.GET_PRODUCTS_ON_HAND_VARIATIONS}/${id}`);
export const getProductTransferView = () => api.get(url.GET_PRODUCT_TRANSFER_VIEW);
export const getProductTransferHistory = () => api.get(url.GET_PRODUCT_TRANSFER_HISTORY );
export const getProductTransferHistoryDetails = (id) => api.get(`${url.GET_PRODUCT_TRANSFER_HISTORY_DETAILS}/${id}`);
export const productTransfer = data => api.create(url.CREATE_PRODUCT_TRANSFER, data);
export const getPurchaseInvoiceList = data => api.get(url.GET_PURCHASE_INVOICE_LIST);
export const getLastTrinsaction = data => api.get(url.GET_LAST_TRANSACTION);
export const getProductsByPurchaseInvoice = id => api.get(`${url.GET_PRODUCT_BY_PURCHASE_INVOICE}/${id}`);
export const getProductsByLastTransaction = id => api.get(`${url.GET_PRODUCT_BY_LAST_TRANSACTION}/${id}`);
export const getProductByImeiScan = imei => api.get(`${url.GET_PRODUCT_BY_IMEI_SCAN}/${imei}`);




//SKU TRANSFER
export const getSkuTransferViewData = () => api.get(url.GET_SKU_TRANSFER_VIEW_DATA);
export const getSkuTransferViewStore = (id) => api.get(`${url.GET_SKU_TRANSFER_STORE_DATA}?purchase_transaction_id=${id}`);
export const skuTransfer = (data) => api.create(url.SKU_TRANSFER, data);
export const getSkuTransferHistory = () => api.get(url.SKU_TRANSFER_HISTORY);
export const getHistoryDetails = (batch_no) => api.get(`${url.SKU_TRANSFER_HISTORY_DETAILS}/${batch_no}`);

//Role permission
export const getRolePermission = () => api.get(url.GET_ROLE_PERMISSION_SELECT );

// expense
export const getExpenseCategoryList = () => api.get(url.GET_EXPENSE_CATEGORY_LIST );
export const createExpenseCategory = data => api.create(url.CREATE_EXPENSE_CATEGORY, data);
export const getExpenseReferenceList = () => api.get(url.GET_EXPENSE_REFERENCE_LIST );
export const createExpenseReference = data => api.create(url.CREATE_EXPENSE_REFERENCE, data);
export const getExpenseList = () => api.get(url.GET_EXPENSE_LIST);
export const getExpenseView = () => api.get(url.GET_EXPENSE_VIEW);
export const getExpenseSummary = () => api.get(url.GET_EXPENSE_SUMMARY);
export const expenseVerification = data => api.create(url.EXPENSE_TRANSACTION_VERIFICATION, data);
// expense reference store 
export const createExpense = data => api.create(url.CREATE_EXPENSE_STORE, data);
export const getPurchaseVariationsById = id => api.get(`${url.GET_PURCHASE_VARIATIONS_BY_ID}/${id}`);
export const createPurchaseVariations = data => api.create(url.CREATE_PURCHASE_VARIATION, data);

//purchase variation
export const getPurchaseVariations = () => api.get(url.GET_PURCHASE_VARIATION );
export const getStorePurchaseVariationView = () => api.get(url.GET_STORE_PURCHASE_VARIATION_VIEW );

// sales
export const imeiScan = imei => api.get(`${url.IMEI_SCAN}?imei=${imei}`);
export const createSaleTransaction = data => api.create(url.CREATE_SALE_TRANSACTION, data);
export const getStoreSaleView = () => api.get(url.GET_STORE_SALE_VIEW );
export const getSaleVariations = id => api.get(`${url.GET_SALE_VARIATIONS}/${id}`);
export const getPurchaseVariationsSale = (modelId, productId) => api.get(`${url.GET_PURCHASE_VARIATIONS_SALE}?product_model_id=${modelId}&product_id=${productId}`);
export const saleVerification = data => api.create(url.SALE_TRANSACTION_VERIFICATION, data);

//SALE RETURN
export const saleReturnList = () => api.get(url.SALE_RETURN_LIST);
export const saleReturnVariationById = (id) => api.get(`${url.SALE_RETURN_VARIATION_BY_ID}/${id}`);
export const createSaleReturn = (data) => api.create(url.CREATE_SALE_RETURN, data);
export const getSaleReturnInvoice = id => api.get(`${url.GET_SALE_RETURN_INVOICE}/${id}`);
export const alternativeScan = id => api.get(`${url.ALTERNATIVE_SCAN}?purchase_variation_id=${id}`);
export const saleReturnVerification = data => api.create(url.SALE_RETURN_TRANSACTION_VERIFICATION, data);
export const sellingPriceApproval = data => api.create(url.SELLING_PRICE_APPROVAL, data);

//average purchase prices
export const getAveragePurchasePrices = () => api.get(url.GET_AVERAGE_PURCHASE_PRICES);
export const createPurchase = data => api.create(url.CREATE_PURCHASE, data);
export const getPurchaseProductList = (sku) => api.get(`${url.GET_PURCHASE_PRODUCT_LIST}/${sku}`);

// sale
export const getSaleList = () => api.get(url.GET_SALE_LIST);
export const getSaleReturnStoreView = id => api.get(`${url.GET_SALE_RETURN_STORE_VIEW}/${id}`);
export const getSaleInvoice = id => api.get(`${url.GET_SALE_INVOICE}/${id}`);
export const downloadSaleInvoice = id => api.get(`${url.DOWNLOAD_SALE_INVOICE}/${id}`);
export const emailSaleInvoice = id => api.get(`${url.EMAIL_SALE_INVOICE}/${id}`);

// Payment
export const getPaymentMethods = () => api.get(url.GET_PAYMENT_METHODS);
export const getCustomerDropdown = () => api.get(url.GET_CUSTOMER_DROPDOWN );
export const makePaymentView = () => api.get(url.MAKE_PAYMENT_VIEW);
export const getPaymentMethodReport = () => api.get(url.GET_PAYMENT_METHOD_REPORT);
export const getPaymentMethodSummary = () => api.get(url.GET_PAYMENT_METHOD_SUMMARY);
export const getPaymentsByMethod = (id) => api.get(`${url.GET_PAYMENTS_BY_METHOD}/${id}`);
// Money Transactions
export const getInvoiceList = () => api.get(url.GET_INVOICE_LIST);
export const getCollectivePaymentView = (customerId) => api.get(`${url.GET_COLLECTIVE_PAYMENT_VIEW}?customer_id=${customerId}` );
export const getPurchasePaymentView = () => api.get(url.GET_PURCHASE_PAYMENT_VIEW);
export const createPaymentMethod = data => api.create(url.CREATE_PAYMENT_METHOD, data);
export const createSalePayment = (data) => api.create(url.CREATE_SALE_PAYMENT, data);
export const createCollectivePayment = (data) => api.create(url.CREATE_COLLECTIVE_PAYMENT, data);
export const createPurchasePayment = (data) => api.create(url.CREATE_PURCHASE_PAYMENT, data);
export const getExpensePaymentView = () => api.get(url.GET_EXPENSE_PAYMENT_VIEW);
export const createExpensePayment = (data) => api.create(url.CREATE_EXPENSE_PAYMENT, data);
export const paymentVerification = (data) => api.create(url.PAYMENT_VERIFICATION, data);
export const getAddCustomerCreditView = () => api.get(url.GET_ADD_CUSTOMER_CREDIT_VIEW );
export const getAvailableCustomerCredit = (id) => api.get(`${url.GET_AVAILABLE_CUSTOMER_CREDIT}?customer_id=${id}` );
export const createCustomerCredit = (id, data) => api.create(`${url.CREATE_CUSTOMER_CREDIT}/${id}`, data);
export const withdrawCustomerCredit = (id, data) => api.create(`${url.WITHDRAW_CUSTOMER_CREDIT}/${id}`, data);

// Record
export const getTransactionRecords = () => api.get(url.GET_TRANSACTION_RECORDS);
export const getCashInRecords = () => api.get(url.GET_CASH_IN_RECORDS);
export const getCashOutRecords = () => api.get(url.GET_CASH_OUT_RECORDS);
export const getVerificationRecord = () => api.get(url.GET_VERIFICATION_RECORD);
export const getUserLog = () => api.get(url.GET_USER_LOG);

// Pool
export const getPoolHistory = () => api.get(url.GET_POOL_HISTORY );
export const deletePoolHistory = (id) => api.delete(`${url.DELETE_POOL_HISTORY}/${id}`,id);
export const updatePoolHistory = (id, data) => api.create(`${url.UPDATE_POOL_HISTORY}/${id}`, data);
export const addPool = (data) => api.create(url.ADD_POOL, data);
export const withdrawPool = (data) => api.create(url.WITHDRAW_POOL, data);

// Report 
export const getCasIndex = id => api.get(`${url.GET_CAS_INDEX}?customer_id=${id}`);
export const getCasIndexView = () => api.get(url.GET_CAS_INDEX_VIEW);
export const getSasIndex = id => api.get(`${url.GET_SAS_INDEX}?supplier_id=${id}`);
export const getSasIndexView = () => api.get(url.GET_SAS_INDEX_VIEW);
export const getSprIndex = () => api.get(url.GET_SPR_INDEX);
export const getPprIndex = () => api.get(url.GET_PPR_INDEX);
export const getEprIndex = () => api.get(url.GET_EPR_INDEX);
export const getVerificationReportList = () => api.get(url.GET_VERIFICATION_REPORT_LIST);

// Salesman Report FP
export const getSaleInvoiceFp = (data) => api.get(`${url.GET_COMMISSION_BY_SALE_INVOICE_FP}?payment_status=${data}`);
export const getCommissionByCustomerFp = () => api.get(url.GET_COMMISSION_BY_CUSTOMER_FP);
export const getSalesDueFPView = () => api.get(url.GET_SALES_DUE_FP);
export const getComissionByReturnInvoiceFPView = () => api.get(url.GET_COMISSION_BY_RETURN_INVOICE_FP);

// Salesman Report TP
export const getCommissionByCustomerTp = data => api.get(`${url.GET_COMMISSION_BY_CUSTOMER_TP}?salesman_id=${data}`);
export const getSalesmanDropdown = () => api.get(url.GET_SALESMAN_DROPDOWN);
export const getSaleInvoiceTp = (id, data) => api.get(`${url.GET_COMMISSION_BY_SALE_INVOICE_TP}?salesman_id=${id}&payment_status=${data}`);
export const getSalesDueTp = id => api.get(`${url.GET_SALES_DUE_TP}?salesman_id=${id}`);
export const getCommByReturnInvoiceTp = id => api.get(`${url.GET_COMM_BY_RETURN_INVOICE_TP}?salesman_id=${id}`);
export const getCommissionSummary = () => api.get(url.GET_COMMISSION_SUMMARY);
export const getSalesDueSummary = () => api.get(url.SALES_DUE_SUMMARY);

// Profit Loss Report
export const getProfitBySaleInvoice = () => api.get(url.GET_PROFIT_BY_SALE_INVOICE);
export const getProfitByCustomer = id => api.get(`${url.GET_PROFIT_BY_CUSTOMER}?customer_id=${id}`);
export const getProfitByCustomerView = () => api.get(url.GET_PROFIT_BY_CUSTOMER_VIEW);
export const getProfitByDate = () => api.get(url.GET_PROFIT_BY_DATE);
export const getProfitByProducts = () => api.get(url.GET_PROFIT_BY_PRODUCTS);
export const getProfitByProductModels = () => api.get(url.GET_PROFIT_BY_PRODUCT_MODELS);
export const getProfitByProductCatagories = () => api.get(url.GET_PROFIT_BY_PRODUCT_CATAGORIES);