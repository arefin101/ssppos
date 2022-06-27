import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();
// Gets the logged in user data from local session


// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};
  
// Register Method
export const postFakeRegister = (data) => {
  return api.create(url.POST_FAKE_REGISTER, data)
    .catch(err => {
      let message;
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
export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// Logout Method
export const postLogout = () => api.create(url.POST_LOGOUT );
// postForgetPwd
export const postFakeForgetPwd = data => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = data => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = data => api.create(url.POST_EDIT_PROFILE, data);

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


// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// get Events
export const getCategories = () => api.get(url.GET_CATEGORIES);

// get Upcomming Events
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);

// add Events
export const addNewEvent = event => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => api.update(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event => api.delete(url.DELETE_EVENT, { headers: { event } });

// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get messages
export const getMessages = roomId => api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

//add message
export const addMessage = message => api.create(url.ADD_MESSAGE, message);

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);

//project list 
export const getProjectList = () => api.get(url.GET_PROJECT_LIST);
//Ecommerce

// get Products
export const getProducts = () => api.get(url.GET_PRODUCTS);
// get Orders
export const getOrders = () => api.get(url.GET_ORDERS);
// get Sellers
export const getSellers = () => api.get(url.GET_SELLERS);
// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);
// get Customers
// export const getCustomers = () => api.get(url.GET_CUSTOMERS);

//Crypto
export const getTransationList = () => api.get(url.GET_TRANSATION_LIST);
export const getOrderList = () => api.get(url.GET_ORDRER_LIST);

export const getTicketsList = () => api.get(url.GET_TICKETS_LIST);
//Crm

// get Contacts
export const getContacts = () => api.get(url.GET_CONTACTS);
// get Companies
export const getCompanies = () => api.get(url.GET_COMPANIES);
// get Deals
export const getDeals = () => api.get(url.GET_DEALS);
// get leads
export const getLeads = () => api.get(url.GET_LEADS);

//get invoice
export const getInvoices = () => api.get(url.GET_INVOICES);

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

// contact
export const getSuppliers = () => api.get(url.GET_SUPPLIERS );
export const createSupplier = data => api.create(url.CREATE_SUPPLIER, data);
export const getSupplierById = (id) => api.get(`${url.GET_SUPPLIER_BY_ID}/${id}`);
export const updateSupplierById = (id, data) => api.create(`${url.UPDATE_SUPPLIER_BY_ID}/${id}`, data);

export const getCustomerList = () => api.get(url.GET_CUSTOMER_LIST )
export const getCustomerById = (id) => api.get(`${url.GET_CUSTOMER_BY_ID}/${id}`);
export const createCustomr = data => api.create(url.CREATE_CUSTOMER, data);
export const updateCustomerById = (id, data) => api.create(`${url.UPDATE_CUSTOMER_BY_ID}/${id}`, data);

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

//Role permission
export const getRolePermission = () => api.get(url.GET_ROLE_PERMISSION_SELECT );

// expense
export const getExpenseCategoryList = () => api.get(url.GET_EXPENSE_CATEGORY_LIST );
export const createExpenseCategory = data => api.create(url.CREATE_EXPENSE_CATEGORY, data);
export const getExpenseReferenceList = () => api.get(url.GET_EXPENSE_REFERENCE_LIST );
export const createExpenseReference = data => api.create(url.CREATE_EXPENSE_REFERENCE, data);
export const getExpenseList = () => api.get(url.GET_EXPENSE_LIST);
export const getExpenseView = () => api.get(url.GET_EXPENSE_VIEW);  //for add-transection dropdown

//purchase variation
export const getPurchaseVariations = () => api.get(url.GET_PURCHASE_VARIATION );
export const getStorePurchaseVariationView = () => api.get(url.GET_STORE_PURCHASE_VARIATION_VIEW );

// sales
export const imeiScan = imei => api.get(`${url.IMEI_SCAN}?imei=${imei}`);
export const createSaleTransaction = data => api.create(url.CREATE_SALE_TRANSACTION, data);
export const getStoreSaleView = () => api.get(url.GET_STORE_SALE_VIEW );

// expense reference store 
export const createExpense = data => api.create(url.CREATE_EXPENSE_STORE, data);
export const getPurchaseVariationsById = id => api.get(`${url.GET_PURCHASE_VARIATIONS_BY_ID}/${id}`);
export const createPurchaseVariations = data => api.create(url.CREATE_PURCHASE_VARIATION, data);

//average purchase prices
export const getAveragePurchasePrices = () => api.get(url.GET_AVERAGE_PURCHASE_PRICES);
export const createPurchase = data => api.create(url.CREATE_PURCHASE, data);

// sale
export const getSaleList = () => api.get(url.GET_SALE_LIST);
