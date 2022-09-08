import React from "react";
import { Redirect } from "react-router-dom";


//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//Search
import ImeiSearch from "../pages/ImeiSearch/ImeiSearch";

//User
import User from "../pages/Users/List/UserList";
import AddUser from "../pages/Users/Add/AddUser";
import UserDetails from "../pages/Users/Details/UserDetails";
import UpdateUserDetails from "../pages/Users/Details/UpdateUserDetails";
import AssignRoles from "../pages/Users/AssignRole/AssignRoles";
import CUA from "../pages/CUA/CUA";

//role
import RoleList from "../pages/Roles/List/RoleList";
import RoleAdd from "../pages/Roles/Add/RoleAdd";
import AssignPermission from "../pages/Roles/Permissions/AssignPermission"

// Contact
//Customer
import CustomerList from "../pages/Customers/List/CustomerList";
import CustomerAdd from "../pages//Customers/Add/CustomerAdd";
import CustomerDetails from "../pages/Customers/Details/CustomerDetails";
import UpdateCustomerDetails from "../pages/Customers/Details/UpdateCustomerDetails";
import CustomerCredit from "../pages/Customers/CustomerCredit/CustomerCredit";

//supliers
import SupplierList from "../pages/Suppliers/List/SupplierList";
import SupplierAdd from "../pages/Suppliers/Add/SupplierAdd";
import SupplierDetails from "../pages/Suppliers/Details/SupplierDetails";
import UpdateSupplierDetails from "../pages/Suppliers/Details/UpdateSupplierDetails";
import SupplierCredit from "../pages/Suppliers/SupplierCredit/SupplierCredit";

// products
import BrandCreate from "../pages/Brands/Add/Create";
import BrandList from "../pages/Brands/BrandList";
import ProductCategoryList from "../pages/ProductCategory/List/ProductCategoryList";
import ProductList from "../pages/Products/List/ProductList";
import PhoneAdd from "../pages/Products/Add/PhoneAdd";
import ChargerAdd from "../pages/Products/Add/ChargerAdd";
import VariationListByProduct from "../pages/Products/Variation/VariationList";

//product Models
import ProductModelList from "../pages/ProductModel/List/ProductModelList";
import ProductModelAdd from "../pages/ProductModel/Add/addProductModel";

//expense category
import ExpenseCategoryList from "../pages/ExpenseCategory/List/ExpenseCategoryList";
import ExpenseCategoryAdd from "../pages/ExpenseCategory/Add/ExpenseCategoryAdd";

//expense references 
// import ExpenseReferenceList from "../pages/ExpenseReferences/List/ExpenseReferenceList";
// import ExpenseReferenceAdd from "../pages/ExpenseReferences/Add/ExpenseReferenceAdd";

//expense list
import ExpenseList from "../pages/ExpenseList/List/ExpenseList";
import ExpenseListAdd from "../pages/ExpenseList/Add/ExpenseListAdd";
import ExpenseSummary from "../pages/ExpenseSummary/ExpenseSummary";

//purchase
import PurchaseList from "../pages/Purchases/List/PurchaseList";
import PurchaseAdd from "../pages/Purchases/Add/PurchaseAdd";
import VariationList from "../pages/Purchases/VariationList/VariationList";
import PurchaseReturnTerminal from "../pages/Purchases/PurchaseReturnTerminal/PurchaseReturnTerminal";
//average purchase price
import AveragePurchasePriceList from "../pages/AveragePurchasePrice/AveragePurchasePriceList";
import PurchaseVariationsStore from "../pages/PurchaseVariations/Add/PurchaseVariations";
import PurchaseVariationList from "../pages/PurchaseVariations/List/PurchaseVariationList";

// Purchase Return
import PurchaseReturnList from "../pages/PurchaseReturn/List/PurchaseReturnList";
import PurchaseReturnVariationList from "../pages/PurchaseReturn/PurchaseReturnVariations/PurchaseReturnVariationList";

// Product Location
import ProductsOnHand from "../pages/ProductsOnHand/ProductsOnHand";
import ProductTransfer from "../pages/ProductTransfer/ProductTransfer";
import ProductTransferHistory from "../pages/ProductHistory/ProductTransferHistory";
import ProductTransferForm from "../pages/ProductTransfer/ProductTransferForm/ProductTransferForm";

// SKU TRANSFER
import SkuTransfer from "../pages/SkuTransfer/SkuTransfer";
import SkuTransferHistory from "../pages/SkuTransferHistory/SkuTransferHistory";

//sale
import SaleList from "../pages/SaleList/saleList";
import SaleTerminal from "../pages/SaleTerminal/saleTerminal";
import SaleVariations from "../pages/SaleVariations/SaleVariations";
import SaleReturnTerminal from "../pages/SaleList/SaleReturnTerminal/SaleReturnTerminal";
import SaleReturnList from "../pages/SaleReturn/List/SaleReturnList";
import SaleReturnVariationList from "../pages/SaleReturn/SaleReturnVariation/SaleReturnVariationList";

// Payment
import PaymentMethods from "../pages/Payment Methods/List/PaymentMethods";
import AddPaymentMethod from "../pages/Payment Methods/Add/AddPaymentMethod";
import PaymentMethodReport from "../pages/PaymentMethodReport/PaymentMethodReport";
import PaymentMethodSummary from "../pages/PaymentMethodReport/Summary/Summary";
import PaymentsByPaymentMethod from "../pages/PaymentsByPaymentMethod/PaymentsByPaymentMethod";

import MoneyTransactionIndex from "../pages/MoneyTransaction/Index";
import AddSalePayment from "../pages/MoneyTransaction/SalePayment/Add/AddSalePayment";
import SalePaymentList from "../pages/MoneyTransaction/SalePayment/SalePaymentList/SalePaymentList";
import AddCustomerCredit from "../pages/MoneyTransaction/CustomerCredit/CustomerCredit";
import CollectivePaymentList from "../pages/MoneyTransaction/CollectivePayment/List/CollectivePaymentList";
import AddCollectivePayment from "../pages/MoneyTransaction/CollectivePayment/Add/AddCollectivePayment";
import PurchasePaymentList from "../pages/MoneyTransaction/PurchasePayment/List/PurchasePaymentList";
import AddPurchasePayment from "../pages/MoneyTransaction/PurchasePayment/Add/AddPurchasePayment";
import ExpensePaymentList from "../pages/MoneyTransaction/ExpensePayment/List/ExpensePaymentList";
import AddExpensePayment from "../pages/MoneyTransaction/ExpensePayment/Add/AddExpensePayment";
import WithdrawCustomerCredit from "../pages/MoneyTransaction/WithdrawCustomerCredit/WithdrawCustomerCredit";

// Pool
import PoolHistory from "../pages/Pool/History/PoolHistory";
import PoolAdd from "../pages/Pool/Add/PoolAdd";
import PoolWithdraw from "../pages/Pool/Withdraw/PoolWithdraw";
import UpdatePoolHistory from "../pages/Pool/History/Update/UpdatePoolHistory";

// Record
import Transactions from "../pages/Transactions/Transactions";
import CashIn from "../pages/CashIn/CashIn";
import CashOut from "../pages/CashOut/CashOut";
import VerificationRecord from "../pages/VerificationRecord/VerificationRecord";
import UserLog from "../pages/UserLog/UserLog";

// Report
import CAS from "../pages/CAS/CAS";
import SAS from "../pages/SAS/SAS";
import SPR from "../pages/SPR/SprList";
import PPR from "../pages/PPR/PprList";
import EPR from "../pages/EPR/EprList";
import VerificationReportList from "../pages/VerificationReport/VerificationReportList";

// Profit/Loss Report
import ProfitBySaleInvoiceList from "../pages/ProfitBySaleInvoice/ProfitBySaleInvoiceList";
import ProfitByCustomer from "../pages/ProfitByCustomer/ProfitByCustomer";
import ProfitByDate from "../pages/ProfitByDate/ProfitByDate";
import ProfitByProducts from "../pages/ProfitByProducts/ProfitByProducts";
import ProfitByProductModels from "../pages/ProfitByProductModels/ProfitByProductModels";
import ProfitByProductCatagories from "../pages/ProfitByProductCatagories/ProfitByProductCatagories";

//Salseman Report FP
import CommBySaleInvoiceFP from "../pages/CommBySaleInvoiceFP/CommBySaleInvoiceFP";
import CommByReturnInvoiceFP from "../pages/CommByReturnInvoiceFP/CommByReturnInvoiceFP";
import CommByCustomerFP from "../pages/CommByCustomerFP/CommByCustomerFP";
import SalesDueFP from "../pages/SalesDueFP/SalesDueFP";

// Salesman Report TP
import CommByCustomerTP from "../pages/CommByCustomerTP/CommByCustomerTP";
import CommByReturnInvoiceTP from "../pages/CommByReturnInvoiceTP/CommByReturnInvoiceTP";
import CommBySaleInvoiceTP from "../pages/CommBySaleInvoiceTP/CommBySaleInvoiceTP";
import SalesDueTP from "../pages/SalesDueTP/SalesDueTP";
import SalesDueSummary from "../pages/SalesDueSummary/SalesDueSummary";
import CommissionSummary from "../pages/CommissionSummary/CommissionSummary";

//pages
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";




const authProtectedRoutes = [


    { path: "/dashboard", component: DashboardEcommerce ,permission:"all"},

    //Search
    { path: "/search-imei", component: ImeiSearch, permission:"search.imei" },

    //User
    { path: "/user-list", component: User, permission:"user.index-official" },
    { path: "/add-user", component: AddUser, permission:"user.register-official" },
    { path: "/user-list/assign-role/:id", component: AssignRoles, permission:"user.assign-role"},
    { path: "/user-details/:id", component: UserDetails, permission:"user.index-official" },
    { path: "/update-user-details/:id", component: UpdateUserDetails, permission:"user.update-official" },
    { path: "/cua", component: CUA, permission:"user.cua" },

    //role
    { path: "/role-List", component: RoleList , permission:"role.index"  },
    { path: "/role/add", component: RoleAdd, permission:"role.store"  },
    { path: "/role/assign-permission/:id", component: AssignPermission, permission: "role.assign-permission"  },

    //Contact
    {path: "/customer-list" , component: CustomerList, permission: "user.index-customer"},
    {path: "/customer/add" , component: CustomerAdd, permission: "user.register-customer"},
    {path: "/customer-details/:id" , component: CustomerDetails, permission: "user.index-customer"},
    {path: "/update-customer-details/:id", component: UpdateCustomerDetails, permission: "user.update-customer" },
    {path: "/customer-credit/:id" , component: CustomerCredit, permission: "user.index-customer"},

    {path: "/supplier-List" , component: SupplierList, permission: "user.index-supplier"},
    {path: "/supplier/Add" , component: SupplierAdd, permission:"user.register-supplier"},
    {path: "/supplier-details/:id", component: SupplierDetails, permission: "user.index-supplier"},
    {path: "/update-supplier-details/:id", component: UpdateSupplierDetails, permission:"user.update-supplier"},
    {path: "/supplier-credit/:id" , component: SupplierCredit, permission: "user.index-supplier"},

    //Brands
    {path: "/brand-create", component: BrandCreate, permission: "brand.store"},
    {path: "/brand-list" , component: BrandList, permission: "brand.index"},
    
    //Categories
    {path: "/category-list" , component: ProductCategoryList, permission: "product-category.index"},
    
    //SKU TRANSFER
    {path: "/sku-transfer", component: SkuTransfer, permission: "sku-transfer.store"},

    //Products
    {path: "/product-list" , component: ProductList, permission: "product.index"},
    {path: "/phone-add" , component: PhoneAdd, permission: "product.store-phone"},
    {path: "/charger-add" , component: ChargerAdd, permission: "product.store-charger"},
    {path: "/purchase-variations-List", component:PurchaseVariationList , permission: "purchase-variation.index"},
    {path: "/variation-list-by-product/:id", component:VariationListByProduct , permission: "product.index"},
    
    //SKU TRANSFER
    {path: "/sku-transfer", component: SkuTransfer, permission: "sku-transfer.store"},
    {path: "/sku-transfer-history", component: SkuTransferHistory, permission: "sku-transfer.history"},

    //Product Models
    {path: "/models" , component: ProductModelList, permission: "product-model.index"},
    {path: "/models/add" , component: ProductModelAdd, permission: "product-model.store"},

    //Expense Category
    {path: "/expense-categories" , component: ExpenseCategoryList, permission: "expense-category.index"},
    {path: "/expense-categories/add" , component: ExpenseCategoryAdd, permission: 'expense-category.store'},

    //Expense Reference
    // {path: "/expense-references" , component: ExpenseReferenceList, permission: "expense-reference.index"},
    // {path: "/expense-references/add" , component: ExpenseReferenceAdd, permission: 'expense-reference.store'},
    
    //Expense List
    {path: "/expense-list" , component: ExpenseList, permission: "expense.index"},
    {path: "/expense-list/add" , component: ExpenseListAdd, permission: "expense.store"},
    {path: "/expense-summary" , component: ExpenseSummary, permission: "expense.summary"},
    
    {path: "/models" , component: ProductModelList, permission: "product-model.index"},
    {path: "/models/add" , component: ProductModelAdd, permission: "product-model.store"},

    //Purchase
    {path: "/purchase-list" , component: PurchaseList, permission: "purchase.index"},
    {path: "/purchases/add" , component: PurchaseAdd, permission: "purchase.store"},
    {path: "/variation-list/:id", component:VariationList, permission: "purchase.index"},
    {path:"/purchase-return-terminal/:id", component: PurchaseReturnTerminal, permission: "purchase-return.store"},

    // Purchase Variation 
    {path:"/purchase-variations-List", component: PurchaseVariationList , permission: "purchase-variation.index"},
    {path: "/variation-store/:id", component:  PurchaseVariationsStore, permission: 'purchase-variation.store'},

    // Purchase Return 
    {path: "/purchase-return-list" , component: PurchaseReturnList, permission: "purchase-return.index"},
    {path: "/purchase-return-variations/:id" , component: PurchaseReturnVariationList, permission: "purchase-return-variation.index"},

    // AveragePurchasePrice
    {path:"/average-purchase-price", component: AveragePurchasePriceList , permission: "purchase-variation.avg-purchase-price"},

    // Product Location
    {path:"/product-on-hand", component: ProductsOnHand , permission: "product-location.on-hand"},
    {path:"/product-transfer", component: ProductTransfer , permission: "product-location.transfer"},
    {path:"/product-history", component: ProductTransferHistory , permission: "product-location.history"},
    {path:"/transfer-product", component: ProductTransferForm , permission: "product-location.transfer"},

    // Sale
    {path:"/sale-list", component: SaleList, permission: "sale.index"},
    {path:"/variation-for-sale/:id", component: SaleVariations, permission: "sale.index"},
    {path:"/sale-return-terminal/:id", component: SaleReturnTerminal, permission: "sale-return.store"},
    {path:"/sale-return-list", component: SaleReturnList, permission: "sale-return.index"},
    {path:"/sale-return-variations/:id", component: SaleReturnVariationList, permission: "sale-return.index"},

    // Payment
    {path:"/payment-methods", component: PaymentMethods, permission: "payment-method.index"},
    {path:"/add-payment-methods", component: AddPaymentMethod, permission: "payment-method.store"},
    {path:"/payment-method-report", component: PaymentMethodReport, permission: "payment-method.report"},
    {path:"/payment-method-report/summary", component: PaymentMethodSummary, permission: "payment-method.summary"},
    {path:"/payment-method/payments/:id", component: PaymentsByPaymentMethod, permission: "payment-method.payments"},
    
    // Payment -- Money Transactions
    {path:"/money-transactions", component: MoneyTransactionIndex, permission:"all"},
    {path:"/sale-payment-list", component: SalePaymentList, permission: "money-transaction.sale-payment"},
    {path:"/add-sale-payment/:id", component: AddSalePayment, permission: "money-transaction.sale-payment"},
    {path:"/collective-payment-list", component: CollectivePaymentList, permission: "money-transaction.sale-payment"},
    {path:"/add-collective-payment/:id", component: AddCollectivePayment, permission: "money-transaction.sale-payment"},
    {path:"/add-customer-credit", component: AddCustomerCredit, permission: "money-transaction.customer-credit"},
    {path:"/purchase-payment-list", component: PurchasePaymentList, permission: "money-transaction.purchase-payment"},
    {path:"/add-purchase-payment/:id", component: AddPurchasePayment, permission: "money-transaction.purchase-payment"},
    {path:"/expense-payment-list", component: ExpensePaymentList, permission: "money-transaction.expense-payment"},
    {path:"/add-expense-payment/:id", component: AddExpensePayment, permission: "money-transaction.expense-payment"},
    {path:"/withdraw-customer-credit", component: WithdrawCustomerCredit, permission: "money-transaction.customer-credit"},

    // Pool
    {path:"/pool-history", component: PoolHistory, permission: "pool.history"},
    {path:"/pool-add", component: PoolAdd, permission: "pool.add"},
    {path:"/pool-withdraw", component: PoolWithdraw, permission: "pool.withdraw"},
    {path:"/pool-update-history/:id", component: UpdatePoolHistory, permission: "pool.update"},

    // Record
    {path:"/transactions", component: Transactions, permission: "record.transactions"},
    {path:"/cash-in", component: CashIn, permission: "record.money"},
    {path:"/cash-out", component: CashOut, permission: "record.money"},
    {path:"/verification-record", component: VerificationRecord, permission: "record.verification"},
    {path:"/user-log", component: UserLog, permission: "record.user-log"},

    // Report
    {path:"/cas", component: CAS, permission: "report.cas-index"},
    {path:"/sas", component: SAS, permission: "report.sas-index"},
    {path:"/spr", component: SPR, permission: "report.spr-index"},
    {path:"/ppr", component: PPR, permission: "report.ppr-index"},
    {path:"/epr", component: EPR, permission: "report.epr-index"},
    {path:"/verification-report", component: VerificationReportList, permission: "report.verification"},

    // Profit/Loss Report
    {path:"/profit-by-sale-invoice", component: ProfitBySaleInvoiceList, permission: "report.pbsi"},
    {path:"/profit-by-customer", component: ProfitByCustomer, permission: "report.pbc"},
    {path:"/profit-by-date", component: ProfitByDate, permission: "report.pbd"},
    {path:"/profit-by-products", component: ProfitByProducts, permission: "report.pbp"},
    {path:"/profit-by-product-models", component: ProfitByProductModels, permission: "report.pbpm"},
    {path:"/profit-by-product-catagories", component: ProfitByProductCatagories, permission: "report.pbpc"},

    //Salesman Report FP
    {path:"/commission-by-sale-invoice-fp", component: CommBySaleInvoiceFP, permission: "srfp"},
    {path:"/commission-by-customer-fp", component: CommByCustomerFP, permission: "srfp"},
    {path:"/commission-by-return-invoice-fp", component: CommByReturnInvoiceFP, permission: "srfp"},
    {path:"/sales-due-fp", component: SalesDueFP, permission: "srfp"},

    //Salesman Report TP
    {path:"/commission-by-sale-invoice-tp", component: CommBySaleInvoiceTP, permission: "srtp"},
    {path:"/commission-by-customer-tp", component: CommByCustomerTP, permission: "srtp"},
    {path:"/commission-by-return-invoice-tp", component: CommByReturnInvoiceTP, permission: "srtp"},
    {path:"/sales-due-tp", component: SalesDueTP, permission: "srtp"},
    {path:"/commission-summary", component: CommissionSummary, permission: "srtp"},
    {path:"/sales-due-summary", component: SalesDueSummary, permission: "srtp"},

    {
        path: "/",
        permission:"all",
        exact: true,
        component: () => <Redirect to="/login" />
       
    },
];

const publicRoutes = [
    
    { path: "/logout", component: Logout, permission:"all" },
    { path: "/login", component: Login , permission:"all"},
    { path: "/auth-404-basic", component: Basic404 ,permission:"all"},
    { path: "/auth-404-cover", component: Cover404, permission:"all"},
    { path: "/auth-404-alt", component: Alt404, permission:"all" },

];

const saleTerminalRoute = [
    
    { path:"/sale-terminal", component: SaleTerminal, permission: "sale.store"},

];

export { authProtectedRoutes, saleTerminalRoute, publicRoutes };