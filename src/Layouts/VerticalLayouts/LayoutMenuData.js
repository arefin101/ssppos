import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getRolePermission } from "../../store/actions";


const Navdata = () => {
    let data =[]
    const dispatch = useDispatch();

    const { permissions_role } =  useSelector( state => ({
        permissions_role: state.Role.permissions_role.permissions
    }));

    useEffect(() => {
      
        dispatch(getRolePermission())
        
    }, []);
 
    
    const history = useHistory();
    //state data
    const [isDashboard, setIsDashboard] = useState(false);
    
    const [isSearch, setIsSearch] = useState(false);
    const [searchVisibility, setSearchVisibility] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [userVisibility, setUserVisibility] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [contactVisibility, setContactVisibility] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [productVisibility, setProductVisibility] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false);
    const [purchaseVisibility, setPurchaseVisibility] = useState(false);
    const [isSkuTransfer, setIsSkuTransfer] = useState(false);
    const [skuTransferVisibility, setSkuTransferVisibility] = useState(false);
    const [isProductLocation, setIsProductLocation] = useState(false);
    const [productLocationVisibility, setProductLocationVisibility] = useState(false);
    const [isExpense, setIsExpense] = useState(false);
    const [expenseVisibility, setExpenseVisibility] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [paymentVisibility, setPaymentVisibility] = useState(false);
    const [isRecord, setIsRecord] = useState(false);
    const [recordVisibility, setRecordVisibility] = useState(false);
    const [isPool, setIsPool] = useState(false);
    const [poolVisibility, setPoolVisibility] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const [reportVisibility, setReportVisibility] = useState(false);
    const [isProfitLossReport, setIsProfitLossReport] = useState(false);
    const [profitLossReportVisibility, setProfitLossReportVisibility] = useState(false);
    const [isReportFP, setIsReportFP] = useState(false);
    const [reportFPVisibility, setReportFPVisibility] = useState(false);
    const [isReportTP, setIsReportTP] = useState(false);
    const [reportTPVisibility, setReportTPVisibility] = useState(false);

    const [isApps, setIsApps] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isBaseUi, setIsBaseUi] = useState(false);
    const [isAdvanceUi, setIsAdvanceUi] = useState(false);
    const [isForms, setIsForms] = useState(false);
    const [isTables, setIsTables] = useState(false);
    const [isCharts, setIsCharts] = useState(false);
    const [isIcons, setIsIcons] = useState(false);
    const [isMaps, setIsMaps] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Home
    const [isHome, setIsHome] = useState(false);

    // Search
    const [searchImeiVisibility, setSearchImeiVisibility] = useState(false);

    // User
    const [isUsers, setIsUsers] = useState(false);
    const [usersVisibility, setUsersVisibility] = useState(false);
    const [isRoles, setIsRoles] = useState(false);
    const [rolesVisibility, setRolesVisibility] = useState(false);

    const [cuaVisibility, setCuaVisibility] = useState(false);

    // Contact
    const [isCustomers, setIsCustomers] = useState(false);
    const [customersVisibility, setCustomersVisibility] = useState(false);
    const [isSuppliers, setIsSuppliers] = useState(false);
    const [suppliersVisibility, setSuppliersVisibility] = useState(false);

    // Product
    const [isBrands, setIsBrands] = useState(false);
    const [brandsVisibility, setBrandsVisibility] = useState(false);
    const [isCategories, setIsCategories] = useState(false);
    const [categoriesVisibility, setCategoriesVisibility] = useState(false)
    const [isModels, setIsModels] = useState(false);
    const [modelsVisibility, setModelsVisibility] = useState(false);
    const [isProducts, setIsProducts] = useState(false);
    const [productsVisibility, setProductsVisibility] = useState(false);

    // Purchase
    const [isPurchaseList, setIsPurchaseList] = useState(false);
    const [purchaseListVisibility, setPurchaseListVisibility] = useState(false);
    const [isPurchaseVariations, setIsPurchaseVariations] = useState(false);
    const [purchaseVariationsVisibility, setPurchaseVariationsVisibility] = useState(false);
    const [isVariationStore, setIsVariationStore] = useState(false);
    const [averagePurchasePriceVisibility, setAveragePurchasePriceVisibility] = useState(false);
    const [purchaseReturnListVisibility, setPurchaseReturnListVisibility] = useState(false);

    // SKU Transfer
    const [transferSkuVisibility, setTransferSkuVisibility] = useState(false);
    const [historySkuVisibility, setHistorySkuVisibility] = useState(false);
    
    // Product Location
    const [onHandVisibility, setOnHandVisibility] = useState(false);
    const [productTransferVisibility, setProductTransferVisibility] = useState(false);
    const [productHistoryVisibility, setProductHistoryVisibility] = useState(false);

    //expense
    const [isExpenseList, setIsExpenseList] = useState(false);
    const [expenseListVisibility, setExpenseListVisibility] = useState(false);
    // const [isExpenseReferences, setIsExpenseReferences] = useState(false);
    // const [expenseReferencesVisibility, setExpenseReferencesVisibility] = useState(false);
    const [isExpenseCategories, setIsExpenseCategories] = useState(false);
    const [expenseCategoriesVisibility, setExpenseCategoriesVisibility] = useState(false);
    const [expenseSummaryVisibility, setExpenseSummaryVisibility] = useState(false);

    //Payment
    const [paymentMethodsVisibility, setPaymentMethodsVisibility] = useState(false);
    const [moneyTransactionsVisibility, setMoneyTransactionsVisibility] = useState(false);
    const [paymentMethodReportVisibility, setPaymentMethodReportVisibility] = useState(false);
    const [cashInVisibility, setCashInVisibility] = useState(false);
    const [cashOutVisibility, setCashOutVisibility] = useState(false);

    // Pool
    const [poolHistoryVisibility, setPoolHistoryVisibility] = useState(false);
    const [poolAddVisibility, setPoolAddVisibility] = useState(false);
    const [poolWithdrawVisibility, setPoolWithdrawVisibility] = useState(false);

    // Record
    const [transactionsVisibility, setTransactionsVisibility] = useState(false);
    const [verificationRecordVisibility, setVerificationRecordVisibility] = useState(false);
    const [userLogVisibility, setUserLogVisibility] = useState(false);

    //Report
    const [casVisibility, setCasVisibility] = useState(false);
    const [sasVisibility, setSasVisibility] = useState(false);
    const [sprVisibility, setSprVisibility] = useState(false);
    const [pprVisibility, setPprVisibility] = useState(false);
    const [eprVisibility, setEprVisibility] = useState(false);
    const [verificationVisibility, setVerificationVisibility] = useState(false);
    
    //Profit Loss Report
    const [profitBySaleInvoiceVisibility, setProfitBySaleInvoiceVisibility] = useState(false);
    const [profitByCustomerVisibility, setProfitByCustomerVisibility] = useState(false);
    const [profitByDateVisibility, setProfitByDateVisibility] = useState(false);
    const [profitByProductsVisibility, setProfitByProductsVisibility] = useState(false);
    const [profitByProductModelsVisibility, setProfitByProductModelsVisibility] = useState(false);
    const [profitByProductCatagoriesVisibility, setProfitByProductCatagoriesVisibility] = useState(false);

    //Salesman Report FP
    const [commBySaleInvoiceFpVisibility, setCommBySaleInvoiceFpVisibility] = useState(false);
    const [commByCustomerFpVisibility, setCommByCustomerFpVisibility] = useState(false);
    const [salesDueFpVisibility, setSalesDueFpVisibility] = useState(false);
    const [commByReturnInvoiceFpVisibility, setCommByReturnInvoiceFpVisibility] = useState(false);
    
    //Salesman Report TP
    const [commBySaleInvoiceTpVisibility, setCommBySaleInvoiceTpVisibility] = useState(false);
    const [commByCustomerTpVisibility, setCommByCustomerTpVisibility] = useState(false);
    const [salesDueTpVisibility, setSalesDueTpVisibility] = useState(false);
    const [commByReturnInvoiceTpVisibility, setCommByReturnInvoiceTpVisibility] = useState(false);
    const [commSummaryVisibility, setCommSummaryVisibility] = useState(false);
    const [salesDueSummaryVisibility, setSalesDueSummaryVisibility] = useState(false);

    //Sale
    const [isSale, setIsSale] = useState(false);
    const [saleVisibility, setSaleVisibility] = useState(false);
    const [saleListVisibility, setSaleListVisibility] = useState(false);
    const [saleTerminalVisibility, setSaleTerminalVisibility] = useState(false);
    const [saleReturnVisibility, setSaleReturnVisibility] = useState(false);

    // Apps
    const [isEcommerce, setIsEcommerce] = useState(false);
    const [isProjects, setIsProjects] = useState(false);
    const [isTasks, setIsTasks] = useState(false);
    const [isCRM, setIsCRM] = useState(false);
    const [isCrypto, setIsCrypto] = useState(false);
    const [isInvoices, setIsInvoices] = useState(false);
    const [isSupportTickets, setIsSupportTickets] = useState(false);

    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [isLockScreen, setIsLockScreen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [isError, setIsError] = useState(false);

    // Pages
    const [isProfile, setIsProfile] = useState(false);

    // Charts
    const [isApex, setIsApex] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Dashboard');

    function updateIconSidebar(e) {
        if (e && e.target && e.target.getAttribute("subitems")) {
            const ul = document.getElementById("two-column-menu");
            const iconItems = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id = item.getAttribute("subitems");
                if (document.getElementById(id))
                    document.getElementById(id).classList.remove("show");
            });
        }
    }
    // console.log(permissions_role)
    useEffect(() =>{
        if(permissions_role){

            if(permissions_role.includes('search.imei') || permissions_role === 'all'){
                setSearchImeiVisibility(true)
            }
            if(searchImeiVisibility){
                setSearchVisibility(true)
            }

            if(permissions_role.includes('user.index-official') || permissions_role === 'all'){
                setUsersVisibility(true)
            }
            if(permissions_role.includes('role.index') || permissions_role === 'all'){
                setRolesVisibility(true)
            }//
            if(permissions_role.includes('user.cua') || permissions_role === 'all'){
                setCuaVisibility(true)
            }

            if(usersVisibility || rolesVisibility || cuaVisibility ){
                setUserVisibility(true)
            }

            if(permissions_role.includes('user.index-customer') || permissions_role === 'all'){
                setCustomersVisibility(true)
            }
            if(permissions_role.includes('user.index-supplier') || permissions_role === 'all'){
                setSuppliersVisibility(true)
            }

            if(customersVisibility || suppliersVisibility ){
                setContactVisibility(true)
            }

            if(permissions_role.includes('brand.index') || permissions_role === 'all'){
                setBrandsVisibility(true)
            }
            if(permissions_role.includes('product-category.index') || permissions_role === 'all'){
                setCategoriesVisibility(true)
            }
            if(permissions_role.includes('product-model.index') || permissions_role === 'all'){
                setModelsVisibility(true)
            }
            if(permissions_role.includes('product.index') || permissions_role === 'all'){
                setProductsVisibility(true)
            }
            if(brandsVisibility || categoriesVisibility || modelsVisibility|| productsVisibility ){
                setProductVisibility(true)
            }

            if(permissions_role.includes('purchase.index') || permissions_role === 'all'){
                setPurchaseListVisibility(true)
            }
            if(permissions_role.includes('purchase-variation.index') || permissions_role === 'all'){
                setPurchaseVariationsVisibility(true)
            }
            if(permissions_role.includes('purchase-variation.avg-purchase-price') || permissions_role === 'all'){
                setAveragePurchasePriceVisibility(true)
            }
            if(permissions_role.includes('purchase-return.index') || permissions_role === 'all'){
                setPurchaseReturnListVisibility(true)
            }
            if(purchaseListVisibility || purchaseVariationsVisibility || averagePurchasePriceVisibility || purchaseReturnListVisibility ){
                setPurchaseVisibility(true)
            }
            
            if(permissions_role.includes('sku-transfer.store') || permissions_role === 'all'){
                setTransferSkuVisibility(true)
            }
            if(permissions_role.includes('sku-transfer.history') || permissions_role === 'all'){
                setHistorySkuVisibility(true)
            }
            if(transferSkuVisibility || historySkuVisibility){
                setSkuTransferVisibility(true)
            }
            
            
            if(permissions_role.includes('product-location.on-hand') || permissions_role === 'all'){
                setOnHandVisibility(true)
            }
            if(permissions_role.includes('product-location.transfer') || permissions_role === 'all'){
                setProductTransferVisibility(true)
            }
            if(permissions_role.includes('product-location.history') || permissions_role === 'all'){
                setProductHistoryVisibility(true)
            }
            if(onHandVisibility || productTransferVisibility || productHistoryVisibility){
                setProductLocationVisibility(true)
            }

            if(permissions_role.includes('expense-category.index') || permissions_role === 'all'){
                setExpenseCategoriesVisibility(true)
            }
            // if(permissions_role.includes('expense-reference.index') || permissions_role === 'all'){
            //     setExpenseReferencesVisibility(true)
            // }
            if(permissions_role.includes('expense.index') || permissions_role === 'all'){
                setExpenseListVisibility(true)
            }
            if(permissions_role.includes('expense.summary') || permissions_role === 'all'){
                setExpenseSummaryVisibility(true)
            }
            if(expenseCategoriesVisibility || expenseListVisibility || expenseSummaryVisibility ){
                setExpenseVisibility(true)
            }

            if(permissions_role.includes('sale.index') || permissions_role === 'all'){
                setSaleListVisibility(true)
            }
            if(permissions_role.includes('sale.store') || permissions_role === 'all'){
                setSaleTerminalVisibility(true)
            }
            if(permissions_role.includes('sale-return.index') || permissions_role === 'all'){
                setSaleReturnVisibility(true)
            }
            if(saleListVisibility || saleTerminalVisibility || saleReturnVisibility ){
                setSaleVisibility(true)
            }

            if(permissions_role.includes('payment-method.index') || permissions_role === 'all'){
                setPaymentMethodsVisibility(true);
            }

            if(permissions_role.includes('payment-method.report') || permissions_role === 'all'){
                setPaymentMethodReportVisibility(true);
            }
            if(permissions_role.includes('money-transaction.sale-payment') || permissions_role.includes('money-transaction.purchase-payment') || permissions_role.includes('money-transaction.customer-credit') || permissions_role === 'all'){
                setMoneyTransactionsVisibility(true);
            }
            if(paymentMethodsVisibility || moneyTransactionsVisibility || cashInVisibility || cashOutVisibility || paymentMethodReportVisibility){
                setPaymentVisibility(true);
            }

            if(permissions_role.includes('pool.history') || permissions_role === 'all'){
                setPoolHistoryVisibility(true)
            }
            if(permissions_role.includes('pool.add') || permissions_role === 'all'){
                setPoolAddVisibility(true)
            }
            if(permissions_role.includes('pool.withdraw') || permissions_role === 'all'){
                setPoolWithdrawVisibility(true)
            }
            if(poolHistoryVisibility || poolAddVisibility || poolWithdrawVisibility ){
                setPoolVisibility(true)
            }
            
            if(permissions_role.includes('report.cas-index') || permissions_role === 'all'){
                setCasVisibility(true);
            }
            if(permissions_role.includes('report.sas-index') || permissions_role === 'all'){
                setSasVisibility(true);
            }
            if(permissions_role.includes('report.spr-index') || permissions_role === 'all'){
                setSprVisibility(true);
            }
            if(permissions_role.includes('report.ppr-index') || permissions_role === 'all'){
                setPprVisibility(true);
            }
            if(permissions_role.includes('report.epr-index') || permissions_role === 'all'){
                setEprVisibility(true);
            }
            if(permissions_role.includes('report.verification') || permissions_role === 'all'){
                setVerificationVisibility(true);
            }
            if(casVisibility || sasVisibility || sprVisibility || pprVisibility || eprVisibility){
                setReportVisibility(true);
            }

            if(permissions_role.includes('report.pbsi') || permissions_role === 'all'){
                setProfitBySaleInvoiceVisibility(true);
            }
            if(permissions_role.includes('report.pbc') || permissions_role === 'all'){
                setProfitByCustomerVisibility(true);
            }
            if(permissions_role.includes('report.pbd') || permissions_role === 'all'){
                setProfitByDateVisibility(true);
            }
            if(permissions_role.includes('report.pbp') || permissions_role === 'all'){
                setProfitByProductsVisibility(true);
            }
            if(permissions_role.includes('report.pbpm') || permissions_role === 'all'){
                setProfitByProductModelsVisibility(true);
            }
            if(permissions_role.includes('report.pbpc') || permissions_role === 'all'){
                setProfitByProductCatagoriesVisibility(true);
            }
            if(profitBySaleInvoiceVisibility || profitByCustomerVisibility || profitByDateVisibility || profitByProductsVisibility || profitByProductModelsVisibility || profitByProductCatagoriesVisibility){
                setProfitLossReportVisibility(true);
            }

            

            if(permissions_role.includes('srfp') || permissions_role === 'all'){
                setCommBySaleInvoiceFpVisibility(true)
            }
            if(permissions_role.includes('srfp') || permissions_role === 'all'){
                setCommByCustomerFpVisibility(true)
            }
            if(permissions_role.includes('srfp') || permissions_role === 'all'){
                setSalesDueFpVisibility(true)
            }
            if(permissions_role.includes('srfp') || permissions_role === 'all'){
                setCommByReturnInvoiceFpVisibility(true)
            }
            if(commBySaleInvoiceFpVisibility || commByCustomerFpVisibility || salesDueFpVisibility || commByReturnInvoiceFpVisibility){
                setReportFPVisibility(true)
            }

            

            if(permissions_role.includes('srtp') || permissions_role === 'all'){
                setCommBySaleInvoiceTpVisibility(true)
            }
            if(permissions_role.includes('srtp') || permissions_role === 'all'){
                setCommByCustomerTpVisibility(true)
            }
            if(permissions_role.includes('srtp') || permissions_role === 'all'){
                setSalesDueTpVisibility(true)
            }
            if(permissions_role.includes('srtp') || permissions_role === 'all'){
                setCommByReturnInvoiceTpVisibility(true)
            }
            if(permissions_role.includes('srtp') || permissions_role === 'all'){
                setCommSummaryVisibility(true)
            }
            if(permissions_role.includes('srtp') || permissions_role === 'all'){
                setSalesDueSummaryVisibility(true)
            }
            if(commBySaleInvoiceTpVisibility || commByCustomerTpVisibility || salesDueTpVisibility || commByReturnInvoiceTpVisibility || commSummaryVisibility || salesDueSummaryVisibility){
                setReportTPVisibility(true)
            }

            
            if(permissions_role.includes('record.transactions') || permissions_role === 'all'){
                setTransactionsVisibility(true);
            }
            if(permissions_role.includes('record.money') || permissions_role === 'all'){
                setCashInVisibility(true);
            }
            if(permissions_role.includes('record.money') || permissions_role === 'all'){
                setCashOutVisibility(true);
            }
            if(permissions_role.includes('record.verification') || permissions_role === 'all'){
                setVerificationRecordVisibility(true);
            }
            if(permissions_role.includes('record.user-log') || permissions_role === 'all'){
                setUserLogVisibility(true);
            }
            if(transactionsVisibility || verificationRecordVisibility || userLogVisibility){
                setRecordVisibility(true);
            }


        }
    },[
        permissions_role,
        usersVisibility, 
        rolesVisibility, 
        cuaVisibility,
        customersVisibility, 
        suppliersVisibility,
        brandsVisibility,
        categoriesVisibility,
        modelsVisibility,
        productsVisibility,
        purchaseListVisibility,
        purchaseReturnListVisibility,
        purchaseVariationsVisibility,
        averagePurchasePriceVisibility,
        expenseCategoriesVisibility,
        expenseSummaryVisibility,
        // expenseReferencesVisibility,
        expenseListVisibility,
        saleListVisibility,
        saleTerminalVisibility,
        saleReturnVisibility,
        paymentVisibility,
        paymentMethodsVisibility,
        moneyTransactionsVisibility,
        reportVisibility,
        casVisibility,
        sasVisibility,
        sprVisibility,
        pprVisibility,
        eprVisibility,
        verificationVisibility,
        profitLossReportVisibility,
        profitByCustomerVisibility,
        profitBySaleInvoiceVisibility,
        transactionsVisibility,
        cashInVisibility,
        cashOutVisibility,
        recordVisibility,
        profitByDateVisibility,
        profitByProductsVisibility,
        profitByProductModelsVisibility,
        profitByProductCatagoriesVisibility,
        verificationRecordVisibility,
        userLogVisibility,
        paymentMethodReportVisibility,
        transferSkuVisibility,
        historySkuVisibility,
        skuTransferVisibility,
        onHandVisibility,
        productHistoryVisibility,
        productTransferVisibility,
        productLocationVisibility,
        searchVisibility,
        searchImeiVisibility,
        poolAddVisibility,
        poolHistoryVisibility,
        poolWithdrawVisibility,
        poolVisibility,
        commBySaleInvoiceFpVisibility,
        commByCustomerFpVisibility,
        salesDueFpVisibility,
        commByReturnInvoiceFpVisibility,
        commBySaleInvoiceTpVisibility,
        commByCustomerTpVisibility,
        salesDueTpVisibility,
        commByReturnInvoiceTpVisibility,
        commSummaryVisibility,
        salesDueSummaryVisibility,
        reportFPVisibility,
        reportTPVisibility
    ])


    
    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        let item = [];
        
        if (iscurrentState !== 'Dashboard') {
            setIsDashboard(false);
        }
        if (iscurrentState !== 'Search') {
            setIsSearch(false);
        }
        if (iscurrentState !== 'Home') {
            setIsHome(false);
        }
        if (iscurrentState !== 'User') {
            setIsUser(false);
        }
        if (iscurrentState !== 'Contact') {
            setIsContact(false);
        }
        if (iscurrentState !== 'Product') {
            setIsProduct(false);
        }
        if (iscurrentState !== 'Purchase') {
            setIsPurchase(false);
        }
        if (iscurrentState !== 'SKU Transfer') {
            setIsSkuTransfer(false);
        }
        if (iscurrentState !== 'Product Location') {
            setIsProductLocation(false);
        }
        if (iscurrentState !== 'Expense') {
            setIsExpense(false);
        }
        if (iscurrentState !== 'Payment') {
            setIsPayment(false);
        }
        if (iscurrentState !== 'Pool') {
            setIsPool(false);
        }
        if (iscurrentState !== 'Record') {
            setIsRecord(false);
        }
        if (iscurrentState !== 'Report') {
            setIsReport(false);
        }
        if (iscurrentState !== 'ReportFP') {
            setIsReportFP(false);
        }
        if (iscurrentState !== 'ReportTP') {
            setIsReportTP(false);
        }
        if (iscurrentState !== 'ProfitLossReport') {
            setIsProfitLossReport(false);
        }
        if (iscurrentState !== 'Sale') {
            setIsSale(false);
        }
        if (iscurrentState !== 'Apps') {
            setIsApps(false);
        }
        if (iscurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (iscurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (iscurrentState !== 'BaseUi') {
            setIsBaseUi(false);
        }
        if (iscurrentState !== 'AdvanceUi') {
            setIsAdvanceUi(false);
        }
        if (iscurrentState !== 'Forms') {
            setIsForms(false);
        }
        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Charts') {
            setIsCharts(false);
        }
        if (iscurrentState !== 'Icons') {
            setIsIcons(false);
        }
        if (iscurrentState !== 'Maps') {
            setIsMaps(false);
        }
        if (iscurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (iscurrentState === 'Widgets') {
            history.push("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
    }, [
        history,
        iscurrentState,
        isDashboard,
        isHome,
        isUser,
        isContact,
        isProduct,
        isPurchase,
        isExpense,
        isPayment,
        isReport,
        isProfitLossReport,
        isSale,
        isApps,
        isAuth,
        isPages,
        isBaseUi,
        isAdvanceUi,
        isForms,
        isTables,
        isCharts,
        isIcons,
        isMaps,
        isMultiLevel,
        isRecord,
        isSkuTransfer,
        isProductLocation,
        isSearch,
        isPool,
        isReportFP,
        isReportTP,
    ]);

    const menuItems = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "search",
            label: "Search",
            icon: "bx bx-search-alt-2",
            link: "/#",
            visibility:searchVisibility,
            stateVariables: isSearch,
            click: function (e) {
                e.preventDefault();
                setIsSearch(!isSearch);
                setIscurrentState('Search');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "searchImei",
                    label: "IMEI Search",
                    visibility: searchImeiVisibility,
                    link: "/search-imei",
                    parentId: "search",
                },
            ],
        },
        {
            id: "home",
            label: "Home",
            icon: "bx bx-home-alt",
            link: "/dashboard",
            stateVariables: isHome,
            click: function (e) {
                e.preventDefault();
                setIsHome(!isHome);
                setIscurrentState('Home');
                updateIconSidebar(e);
            }
        },
        // {
        //     id: "dashboard",
        //     label: "My Dashboards",
        //     icon: "ri-dashboard-2-line",
        //     link: "/#",
        //     stateVariables: isDashboard,
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsDashboard(!isDashboard);
        //         setIscurrentState('Dashboard');
        //         updateIconSidebar(e);
        //     },
        //     subItems: [
        //         {
        //             id: "analytics",
        //             label: "Analytics",
        //             link: "/dashboard-analytics",
        //             parentId: "dashboard",
        //         },
        //         {
        //             id: "crm",
        //             label: "CRM",
        //             link: "/dashboard-crm",
        //             parentId: "dashboard",
        //         },
        //         {
        //             id: "ecommerce",
        //             label: "Ecommerce",
        //             link: "/dashboard",
        //             parentId: "dashboard",
        //         },
        //         {
        //             id: "crypto",
        //             label: "Crypto",
        //             link: "/dashboard-crypto",
        //             parentId: "dashboard",
        //         },
        //         {
        //             id: "projects",
        //             label: "Projects",
        //             link: "/dashboard-projects",
        //             parentId: "dashboard",
        //         },
        //     ],
        // },
        {
            id: "user",
            label: "User",
            icon: "ri-user-3-line",
            link: "/#",
            visibility:userVisibility,
            stateVariables: isUser,
            click: function (e) {
                e.preventDefault();
                setIsUser(!isUser);
                setIscurrentState('User');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "users",
                    label: "Users",
                    visibility: usersVisibility,
                    link: "/user-list",
                    parentId: "user",
                },
                {
                    id: "roles",
                    label: "Roles",
                    visibility: rolesVisibility,
                    link: "/role-List",
                    parentId: "user",
                },
                {
                    id: "cua",
                    label: "CUA",
                    visibility: cuaVisibility,
                    link: "/cua",
                    parentId: "user",
                },
            ],
        },
        {
            id: "contact",
            label: "Contact",
            icon: "ri-contacts-line",
            link: "/#",
            visibility:contactVisibility,
            stateVariables: isContact,
            click: function (e) {
                e.preventDefault();
                setIsContact(!isContact);
                setIscurrentState('Contact');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "customers",
                    label: "Customers",
                    visibility: customersVisibility,
                    link: "/customer-list",
                    parentId: "contact",
                },
                {
                    id: "suppliers",
                    label: "Suppliers",
                    visibility: suppliersVisibility,
                    link: "/supplier-List",
                    parentId: "contact",
                },
            ],
        },
        {
            id: "product",
            label: "Product",
            icon: "mdi mdi-package-variant",
            visibility: productVisibility,
            link: "/#",
            stateVariables: isProduct,
            click: function (e) {
                e.preventDefault();
                setIsProduct(!isProduct);
                setIscurrentState('Product');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "brands",
                    label: "Brands",
                    visibility: brandsVisibility,
                    link: "/brand-list",
                    parentId: "product",
                },
                {
                    id: "categories",
                    label: "Categories",
                    visibility: categoriesVisibility,
                    link: "/category-list",
                    parentId: "product",

                },
                {
                    id: "models",
                    label: "Models",
                    visibility: modelsVisibility,
                    link: "/models",
                    parentId: "product",
                },
                {
                    id: "products",
                    label: "Products",
                    visibility: productsVisibility,
                    link: "/product-list",
                    parentId: "product",
                },
            ],
        },
        {
            id: "purchase",
            label: "Purchase",
            icon: "ri-arrow-down-circle-line",
            visibility:purchaseVisibility,
            link: "/#",
            stateVariables: isPurchase,
            click: function (e) {
                e.preventDefault();
                setIsPurchase(!isPurchase);
                setIscurrentState('Purchase');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "purchaseList",
                    label: "Purchase List",
                    visibility:purchaseListVisibility,
                    link: "/purchase-list",
                    parentId: "purchase",
                },
                {
                    id: "purchaseVariations",
                    label: "Purchase Variations",
                    visibility:purchaseVariationsVisibility,
                    link: "/purchase-variations-List",
                    parentId: "purchase",
                },
                {
                    id: "averagePurchasePrice",
                    label: "Avg Purchase Price",
                    visibility:averagePurchasePriceVisibility,
                    link: "/average-purchase-price",
                    parentId: "purchase",
                },
                {
                    id: "purchaseReturnList",
                    label: "Purchase Return List",
                    visibility:purchaseReturnListVisibility,
                    link: "/purchase-return-list",
                    parentId: "purchase",
                },
            ],
        },
        {
            id: "skuTransfer",
            label: "SKU Change",
            icon: "bx bx-package",
            visibility:skuTransferVisibility,
            link: "/#",
            stateVariables: isSkuTransfer,
            click: function (e) {
                e.preventDefault();
                setIsSkuTransfer(!isSkuTransfer);
                setIscurrentState('SKU Transfer');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "transferSku",
                    label: "Transfer",
                    visibility:transferSkuVisibility,
                    link: "/sku-transfer",
                    parentId: "skuTransfer",
                },
                {
                    id: "historySku",
                    label: "History",
                    visibility:historySkuVisibility,
                    link: "/sku-transfer-history",
                    parentId: "skuTransfer",
                },
            ],
        },
        {
            id: "productLocation",
            label: "Product Transfer",
            icon: "bx bxs-package",
            visibility:productLocationVisibility,
            link: "/#",
            stateVariables: isProductLocation,
            click: function (e) {
                e.preventDefault();
                setIsProductLocation(!isProductLocation);
                setIscurrentState('Product Location');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "productOnHand",
                    label: "On Hand",
                    visibility:onHandVisibility,
                    link: "/product-on-hand",
                    parentId: "productLocation",
                },
                {
                    id: "productTransfer",
                    label: "Transfer ",
                    visibility:productTransferVisibility,
                    link: "/product-transfer",
                    parentId: "productLocation",
                },
                {
                    id: "productHistory",
                    label: "History",
                    visibility:productHistoryVisibility,
                    link: "/product-history",
                    parentId: "productLocation",
                },
            ],
        },
        {
            id: "sale",
            label: "Sale",
            icon: "ri-arrow-up-circle-line",
            visibility:saleVisibility,
            link: "/#",
            stateVariables: isSale,
            click: function (e) {
                e.preventDefault();
                setIsSale(!isSale);
                setIscurrentState('Sale');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "saleList",
                    label: "Sale List",
                    visibility:saleListVisibility,
                    link: "/sale-list",
                    parentId: "sale",
                },
                {
                    id: "saleTerminal",
                    label: "Sale Terminal",
                    visibility:saleTerminalVisibility,
                    link: "/sale-terminal",
                    parentId: "sale",
                },
                {
                    id: "saleReturn",
                    label: "Sale Return List",
                    visibility:saleReturnVisibility,
                    link: "/sale-return-list",
                    parentId: "sale",
                },
            ],
        },
        {
            id: "expense",
            label: "Expense",
            icon: "ri-coins-line",
            visibility:expenseVisibility,
            link: "/#",
            stateVariables: isExpense,
            click: function (e) {
                e.preventDefault();
                setIsExpense(!isExpense);
                setIscurrentState('Expense');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "expenselist",
                    label: "Expense List",
                    visibility:expenseListVisibility,
                    link: "/expense-list",
                    parentId: "expense",
                },
                {
                    id: "expenseCategories",
                    label: "Expense Categories",
                    visibility:expenseCategoriesVisibility,
                    link: "/expense-categories",
                    parentId: "expense",
                },
                {
                    id: "expenseSummary",
                    label: "Expense Summary",
                    visibility:expenseSummaryVisibility,
                    link: "/expense-summary",
                    parentId: "expense",
                },
                // {
                //     id: "expensereferences",
                //     label: "Expense References",
                //     visibility:expenseReferencesVisibility,
                //     link: "/expense-references",
                //     parentId: "expense",
                // },
            ],
        },
        {
            id: "payment",
            label: "Payment",
            icon: "las la-money-bill-wave",
            visibility:paymentVisibility,
            link: "/#",
            stateVariables: isPayment,
            click: function (e) {
                e.preventDefault();
                setIsPayment(!isPayment);
                setIscurrentState('Payment');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "paymentMethods",
                    label: "Payment Methods",
                    visibility: paymentMethodsVisibility,
                    link: "/payment-methods",
                    parentId: "payment",
                },
                {
                    id: "moneyTransactions",
                    label: "Money Transactions",
                    visibility: moneyTransactionsVisibility,
                    link: "/money-transactions",
                    parentId: "payment",
                },
                {
                    id: "paymentMethodReport",
                    label: "Payment Method Report",
                    visibility: paymentMethodReportVisibility,
                    link: "/payment-method-report",
                    parentId: "payment",
                },
                {
                    id: "cashIn",
                    label: "Cash In",
                    visibility:cashInVisibility,
                    link: "/cash-in",
                    parentId: "payment",
                },
                {
                    id: "cashOut",
                    label: "Cash Out",
                    visibility:cashOutVisibility,
                    link: "/cash-out",
                    parentId: "payment",
                },
            ],
        },
        {
            id: "pool",
            label: "Pool",
            icon: "ri-bank-fill",
            link: "/#",
            visibility:poolVisibility,
            stateVariables: isPool,
            click: function (e) {
                e.preventDefault();
                setIsPool(!isPool);
                setIscurrentState('Pool');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "pool_history",
                    label: "History",
                    visibility: poolHistoryVisibility,
                    link: "/pool-history",
                    parentId: "pool",
                },
                {
                    id: "pool_add",
                    label: "Add",
                    visibility: poolAddVisibility,
                    link: "/pool-add",
                    parentId: "pool",
                },
                {
                    id: "pool_withdraw",
                    label: "Withdraw",
                    visibility: poolWithdrawVisibility,
                    link: "/pool-withdraw",
                    parentId: "pool",
                },
            ],
        },
        {
            id: "report",
            label: "Report",
            icon: "ri-bar-chart-box-line",
            visibility: reportVisibility,
            link: "/#",
            stateVariables: isReport,
            click: function (e) {
                e.preventDefault();
                setIsReport(!isReport);
                setIscurrentState('Report');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "cas",
                    label: "CAS",
                    visibility:casVisibility,
                    link: "/cas",
                    parentId: "report",
                },
                {
                    id: "sas",
                    label: "SAS",
                    visibility:sasVisibility,
                    link: "/sas",
                    parentId: "report",
                },
                {
                    id: "spr",
                    label: "SPR",
                    visibility:sprVisibility,
                    link: "/spr",
                    parentId: "report",
                },
                {
                    id: "ppr",
                    label: "PPR",
                    visibility:pprVisibility,
                    link: "/ppr",
                    parentId: "report",
                },
                {
                    id: "epr",
                    label: "EPR",
                    visibility:eprVisibility,
                    link: "/epr",
                    parentId: "report",
                },
                {
                    id: "verification",
                    label: "Verification",
                    visibility:verificationVisibility,
                    link: "/verification-report",
                    parentId: "report",
                },
            ],
        },
        {
            id: "profitLossReport",
            label: "Profit/Loss Report",
            icon: "ri-bar-chart-box-line",
            visibility: profitLossReportVisibility,
            link: "/#",
            stateVariables: isProfitLossReport,
            click: function (e) {
                e.preventDefault();
                setIsProfitLossReport(!isProfitLossReport);
                setIscurrentState('ProfitLossReport');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "profitBySaleInvoice",
                    label: "Profit By Sale Invoice",
                    visibility: profitBySaleInvoiceVisibility,
                    link: "/profit-by-sale-invoice",
                    parentId: "profitLossReport",
                },
                {
                    id: "profitByCustomer",
                    label: "Profit By Customer",
                    visibility: profitByCustomerVisibility,
                    link: "/profit-by-customer",
                    parentId: "profitLossReport",
                },
                {
                    id: "profitByDate",
                    label: "Profit By Date",
                    visibility: profitByDateVisibility,
                    link: "/profit-by-date",
                    parentId: "profitLossReport",
                },
                {
                    id: "profitByProducts",
                    label: "Profit By Products",
                    visibility: profitByProductsVisibility,
                    link: "/profit-by-products",
                    parentId: "profitLossReport",
                },
                {
                    id: "profitByProductModels",
                    label: "Profit By Product Models",
                    visibility: profitByProductModelsVisibility,
                    link: "/profit-by-product-models",
                    parentId: "profitLossReport",
                },
                {
                    id: "profitByProductCatagories",
                    label: "Profit By Product Catagories",
                    visibility: profitByProductCatagoriesVisibility,
                    link: "/profit-by-product-catagories",
                    parentId: "profitLossReport",
                },
            ],
        },
        {
            id: "reportFP",
            label: "Salesman Report FP",
            icon: "ri-bar-chart-box-line",
            visibility: reportFPVisibility,
            link: "/#",
            stateVariables: isReportFP,
            click: function (e) {
                e.preventDefault();
                setIsReportFP(!isReportFP);
                setIscurrentState('ReportFP');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "commBysaleInvoiceFp",
                    label: "Commission By Sale Invoice",
                    visibility: commBySaleInvoiceFpVisibility,
                    link: "/commission-by-sale-invoice-fp",
                    parentId: "reportFP",
                },
                {
                    id: "commByCustomerFp",
                    label: "Commission By Customer",
                    visibility: commByCustomerFpVisibility,
                    link: "/commission-by-customer-fp",
                    parentId: "reportFP",
                },
                {
                    id: "salesDueFp",
                    label: "Sales Due",
                    visibility: salesDueFpVisibility,
                    link: "/sales-due-fp",
                    parentId: "reportFP",
                },
                {
                    id: "commByReturnInvoiceFp",
                    label: "Commission By Return Invoice",
                    visibility: commByReturnInvoiceFpVisibility,
                    link: "/commission-by-return-invoice-fp",
                    parentId: "reportFP",
                },
            ],
        },
        {
            id: "reportTP",
            label: "Salesman Report TP",
            icon: "ri-bar-chart-box-line",
            visibility: reportTPVisibility,
            link: "/#",
            stateVariables: isReportTP,
            click: function (e) {
                e.preventDefault();
                setIsReportTP(!isReportTP);
                setIscurrentState('ReportTP');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "commBysaleInvoiceTp",
                    label: "Commission By Sale Invoice",
                    visibility: commBySaleInvoiceTpVisibility,
                    link: "/commission-by-sale-invoice-tp",
                    parentId: "reportTP",
                },
                {
                    id: "commByCustomerTp",
                    label: "Commission By Customer",
                    visibility: commByCustomerTpVisibility,
                    link: "/commission-by-customer-tp",
                    parentId: "reportTP",
                },
                {
                    id: "salesDueTp",
                    label: "Sales Due",
                    visibility: salesDueTpVisibility,
                    link: "/sales-due-tp",
                    parentId: "reportTP",
                },
                {
                    id: "commByReturnInvoiceTp",
                    label: "Commission By Return Invoice",
                    visibility: commByReturnInvoiceTpVisibility,
                    link: "/commission-by-return-invoice-tp",
                    parentId: "reportTP",
                },
                {
                    id: "commSummary",
                    label: "Commission Summary",
                    visibility: commSummaryVisibility,
                    link: "/commission-summary",
                    parentId: "reportTP",
                },
                {
                    id: "salesDueSummary",
                    label: "Sales Due Summary",
                    visibility: salesDueSummaryVisibility,
                    link: "/sales-due-summary",
                    parentId: "reportTP",
                },
            ],
        },
        {
            id: "record",
            label: "Record",
            icon: "ri-file-list-2-line",
            visibility:recordVisibility,
            link: "/#",
            stateVariables: isRecord,
            click: function (e) {
                e.preventDefault();
                setIsRecord(!isRecord);
                setIscurrentState('Record');
                updateIconSidebar(e);
            },
            subItems: [
                {
                    id: "transactions",
                    label: "Transactions",
                    visibility:transactionsVisibility,
                    link: "/transactions",
                    parentId: "record",
                },
                {
                    id: "verificationRecord",
                    label: "Verification Record",
                    visibility:verificationRecordVisibility,
                    link: "/verification-record",
                    parentId: "record",
                },
                {
                    id: "userLog",
                    label: "User Log",
                    visibility:userLogVisibility,
                    link: "/user-log",
                    parentId: "record",
                },
            ],
        },
        // {
        //     id: "apps",
        //     label: "Apps",
        //     icon: "ri-apps-2-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsApps(!isApps);
        //         setIscurrentState('Apps');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isApps,
        //     subItems: [
        //         {
        //             id: "calendar",
        //             label: "Calendar",
        //             link: "/apps-calendar",
        //             parentId: "apps",
        //         },
        //         {
        //             id: "chat",
        //             label: "Chat",
        //             link: "/apps-chat",
        //             parentId: "apps",
        //         },
        //         {
        //             id: "mailbox",
        //             label: "Mailbox",
        //             link: "/apps-mailbox",
        //             parentId: "apps",
        //         },
        //         {
        //             id: "appsecommerce",
        //             label: "Ecommerce",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsEcommerce(!isEcommerce);
        //             },
        //             parentId: "apps",
        //             stateVariables: isEcommerce,
        //             childItems: [
        //                 { id: 1, label: "Products", link: "/apps-ecommerce-products", parentId: "apps" },
        //                 { id: 2, label: "Product Details", link: "/apps-ecommerce-product-details", parentId: "apps" },
        //                 { id: 3, label: "Create Product", link: "/apps-ecommerce-add-product", parentId: "apps" },
        //                 { id: 4, label: "Orders", link: "/apps-ecommerce-orders", parentId: "apps" },
        //                 { id: 5, label: "Order Details", link: "/apps-ecommerce-order-details", parentId: "apps" },
        //                 { id: 6, label: "Customers", link: "/apps-ecommerce-customers", parentId: "apps" },
        //                 { id: 7, label: "Shopping Cart", link: "/apps-ecommerce-cart", parentId: "apps" },
        //                 { id: 8, label: "Checkout", link: "/apps-ecommerce-checkout", parentId: "apps" },
        //                 { id: 9, label: "Sellers", link: "/apps-ecommerce-sellers", parentId: "apps" },
        //                 { id: 10, label: "Seller Details", link: "/apps-ecommerce-seller-details", parentId: "apps" },
        //             ]
        //         },
        //         {
        //             id: "appsprojects",
        //             label: "Projects",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsProjects(!isProjects);
        //             },
        //             parentId: "apps",
        //             stateVariables: isProjects,
        //             childItems: [
        //                 { id: 1, label: "List", link: "/apps-projects-list", parentId: "apps", },
        //                 { id: 2, label: "Overview", link: "/apps-projects-overview", parentId: "apps", },
        //                 { id: 3, label: "Create Project", link: "/apps-projects-create", parentId: "apps", },
        //             ]
        //         },
        //         {
        //             id: "tasks",
        //             label: "Tasks",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsTasks(!isTasks);
        //             },
        //             parentId: "apps",
        //             stateVariables: isTasks,
        //             childItems: [
        //                 { id: 1, label: "Kanban Board", link: "/apps-tasks-kanban", parentId: "apps", },
        //                 { id: 2, label: "List View", link: "/apps-tasks-list-view", parentId: "apps", },
        //                 { id: 3, label: "Task Details", link: "/apps-tasks-details", parentId: "apps", },
        //             ]
        //         },
        //         {
        //             id: "appscrm",
        //             label: "CRM",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsCRM(!isCRM);
        //             },
        //             parentId: "apps",
        //             stateVariables: isCRM,
        //             childItems: [
        //                 { id: 1, label: "Contacts", link: "/apps-crm-contacts" },
        //                 { id: 2, label: "Companies", link: "/apps-crm-companies" },
        //                 { id: 3, label: "Deals", link: "/apps-crm-deals" },
        //                 { id: 4, label: "Leads", link: "/apps-crm-leads" },
        //             ]
        //         },
        //         {
        //             id: "appscrypto",
        //             label: "Crypto",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsCrypto(!isCrypto);
        //             },
        //             parentId: "apps",
        //             stateVariables: isCrypto,
        //             childItems: [
        //                 { id: 1, label: "Transactions", link: "/apps-crypto-transactions" },
        //                 { id: 2, label: "Buy & Sell", link: "/apps-crypto-buy-sell" },
        //                 { id: 3, label: "Orders", link: "/apps-crypto-orders" },
        //                 { id: 4, label: "My Wallet", link: "/apps-crypto-wallet" },
        //                 { id: 5, label: "ICO List", link: "/apps-crypto-ico" },
        //                 { id: 6, label: "KYC Application", link: "/apps-crypto-kyc" },
        //             ]
        //         },
        //         {
        //             id: "invoices",
        //             label: "Invoices",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsInvoices(!isInvoices);
        //             },
        //             parentId: "apps",
        //             stateVariables: isInvoices,
        //             childItems: [
        //                 { id: 1, label: "List View", link: "/apps-invoices-list" },
        //                 { id: 2, label: "Details", link: "/apps-invoices-details" },
        //                 { id: 3, label: "Create Invoice", link: "/apps-invoices-create" },
        //             ]
        //         },
        //         {
        //             id: "supportTickets",
        //             label: "Support Tickets",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsSupportTickets(!isSupportTickets);
        //             },
        //             parentId: "apps",
        //             stateVariables: isSupportTickets,
        //             childItems: [
        //                 { id: 1, label: "List View", link: "/apps-tickets-list" },
        //                 { id: 2, label: "Ticket Details", link: "/apps-tickets-details" },
        //             ]
        //         }
        //     ],
        // },
        // {
        //     label: "pages",
        //     isHeader: true,
        // },
        // {
        //     id: "authentication",
        //     label: "Authentication",
        //     icon: "ri-account-circle-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsAuth(!isAuth);
        //         setIscurrentState('Auth');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isAuth,
        //     subItems: [
        //         {
        //             id: "signIn",
        //             label: "Sign In",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsSignIn(!isSignIn);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isSignIn,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-signin-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-signin-cover" },
        //             ]
        //         },
        //         {
        //             id: "signUp",
        //             label: "Sign Up",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsSignUp(!isSignUp);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isSignUp,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-signup-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-signup-cover" },
        //             ]
        //         },
        //         {
        //             id: "passwordReset",
        //             label: "Password Reset",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsPasswordReset(!isPasswordReset);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isPasswordReset,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-pass-reset-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-pass-reset-cover" },
        //             ]
        //         },
        //         {
        //             id: "lockScreen",
        //             label: "Lock Screen",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsLockScreen(!isLockScreen);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isLockScreen,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-lockscreen-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-lockscreen-cover" },
        //             ]
        //         },
        //         {
        //             id: "logout",
        //             label: "Logout",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsLogout(!isLogout);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isLogout,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-logout-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-logout-cover" },
        //             ]
        //         },
        //         {
        //             id: "successMessage",
        //             label: "Success Message",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsSuccessMessage(!isSuccessMessage);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isSuccessMessage,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-success-msg-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-success-msg-cover" },
        //             ]
        //         },
        //         {
        //             id: "twoStepVerification",
        //             label: "Two Step Verification",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsVerification(!isVerification);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isVerification,
        //             childItems: [
        //                 { id: 1, label: "Basic", link: "/auth-twostep-basic" },
        //                 { id: 2, label: "Cover", link: "/auth-twostep-cover" },
        //             ]
        //         },
        //         {
        //             id: "errors",
        //             label: "Errors",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsError(!isError);
        //             },
        //             parentId: "authentication",
        //             stateVariables: isError,
        //             childItems: [
        //                 { id: 1, label: "404 Basic", link: "/auth-404-basic" },
        //                 { id: 2, label: "404 Cover", link: "/auth-404-cover" },
        //                 { id: 3, label: "404 Alt", link: "/auth-404-alt" },
        //                 { id: 4, label: "500", link: "/auth-500" },
        //             ]
        //         },
        //     ],
        // },
        // {
        //     id: "pages",
        //     label: "Pages",
        //     icon: "ri-pages-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsPages(!isPages);
        //         setIscurrentState('Pages');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isPages,
        //     subItems: [
        //         {
        //             id: "starter",
        //             label: "Starter",
        //             link: "/pages-starter",
        //             parentId: "pages",
        //         },
        //         {
        //             id: "profile",
        //             label: "Profile",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsProfile(!isProfile);
        //             },
        //             parentId: "pages",
        //             stateVariables: isProfile,
        //             childItems: [
        //                 { id: 1, label: "Simple Page", link: "/pages-profile", parentId: "pages" },
        //                 { id: 2, label: "Settings", link: "/pages-profile-settings", parentId: "pages" },
        //             ]
        //         },
        //         { id: "team", label: "Team", link: "/pages-team", parentId: "pages" },
        //         { id: "timeline", label: "Timeline", link: "/pages-timeline", parentId: "pages" },
        //         { id: "faqs", label: "FAQs", link: "/pages-faqs", parentId: "pages" },
        //         { id: "pricing", label: "Pricing", link: "/pages-pricing", parentId: "pages" },
        //         { id: "gallery", label: "Gallery", link: "/pages-gallery", parentId: "pages" },
        //         { id: "maintenance", label: "Maintenance", link: "/pages-maintenance", parentId: "pages" },
        //         { id: "comingSoon", label: "Coming Soon", link: "/pages-coming-soon", parentId: "pages" },
        //         { id: "sitemap", label: "Sitemap", link: "/pages-sitemap", parentId: "pages" },
        //         { id: "searchResults", label: "Search Results", link: "/pages-search-results", parentId: "pages" },
        //     ],
        // },
        // {
        //     label: "Components",
        //     isHeader: true,
        // },
        // {
        //     id: "baseUi",
        //     label: "Base UI",
        //     icon: "ri-pencil-ruler-2-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsBaseUi(!isBaseUi);
        //         setIscurrentState('BaseUi');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isBaseUi,
        //     subItems: [
        //         { id: "alerts", label: "Alerts", link: "/ui-alerts", parentId: "baseUi" },
        //         { id: "badges", label: "Badges", link: "/ui-badges", parentId: "baseUi" },
        //         { id: "buttons", label: "Buttons", link: "/ui-buttons", parentId: "baseUi" },
        //         { id: "colors", label: "Colors", link: "/ui-colors", parentId: "baseUi" },
        //         { id: "cards", label: "Cards", link: "/ui-cards", parentId: "baseUi" },
        //         { id: "carousel", label: "Carousel", link: "/ui-carousel", parentId: "baseUi" },
        //         { id: "dropdowns", label: "Dropdowns", link: "/ui-dropdowns", parentId: "baseUi" },
        //         { id: "grid", label: "Grid", link: "/ui-grid", parentId: "baseUi" },
        //         { id: "images", label: "Images", link: "/ui-images", parentId: "baseUi" },
        //         { id: "tabs", label: "Tabs", link: "/ui-tabs", parentId: "baseUi" },
        //         { id: "accordions", label: "Accordion & Collapse", link: "/ui-accordions", parentId: "baseUi" },
        //         { id: "modals", label: "Modals", link: "/ui-modals", parentId: "baseUi" },
        //         { id: "offcanvas", label: "Offcanvas", link: "/ui-offcanvas", parentId: "baseUi" },
        //         { id: "placeholders", label: "Placeholders", link: "/ui-placeholders", parentId: "baseUi" },
        //         { id: "progress", label: "Progress", link: "/ui-progress", parentId: "baseUi" },
        //         { id: "notifications", label: "Notifications", link: "/ui-notifications", parentId: "baseUi" },
        //         { id: "media", label: "Media object", link: "/ui-media", parentId: "baseUi" },
        //         { id: "embedvideo", label: "Embed Video", link: "/ui-embed-video", parentId: "baseUi" },
        //         { id: "typography", label: "Typography", link: "/ui-typography", parentId: "baseUi" },
        //         { id: "lists", label: "Lists", link: "/ui-lists", parentId: "baseUi" },
        //         { id: "general", label: "General", link: "/ui-general", parentId: "baseUi" },
        //         { id: "ribbons", label: "Ribbons", link: "/ui-ribbons", parentId: "baseUi" },
        //         { id: "utilities", label: "Utilities", link: "/ui-utilities", parentId: "baseUi" },
        //     ],
        // },
        // {
        //     id: "advanceUi",
        //     label: "Advance UI",
        //     icon: "ri-stack-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsAdvanceUi(!isAdvanceUi);
        //         setIscurrentState('AdvanceUi');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isAdvanceUi,
        //     subItems: [
        //         { id: "nestablelist", label: "Nestable List", link: "/advance-ui-nestable", parentId: "advanceUi" },
        //         { id: "scrollbar", label: "Scrollbar", link: "/advance-ui-scrollbar", parentId: "advanceUi" },
        //         { id: "animation", label: "Animation", link: "/advance-ui-animation", parentId: "advanceUi" },
        //         { id: "tour", label: "Tour", link: "/advance-ui-tour", parentId: "advanceUi" },
        //         { id: "swiperslider", label: "Swiper Slider", link: "/advance-ui-swiper", parentId: "advanceUi" },
        //         { id: "ratings", label: "Ratings", link: "/advance-ui-ratings", parentId: "advanceUi" },
        //         { id: "highlight", label: "Highlight", link: "/advance-ui-highlight", parentId: "advanceUi" },
        //     ],
        // },
        // {
        //     id: "widgets",
        //     label: "Widgets",
        //     icon: "ri-honour-line",
        //     link: "/widgets",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIscurrentState('Widgets');
        //     }
        // },
        // {
        //     id: "forms",
        //     label: "Forms",
        //     icon: "ri-file-list-3-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsForms(!isForms);
        //         setIscurrentState('Forms');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isForms,
        //     subItems: [
        //         { id: "basicelements", label: "Basic Elements", link: "/forms-elements", parentId: "forms" },
        //         { id: "formselect", label: "Form Select", link: "/forms-select", parentId: "forms" },
        //         { id: "checkboxsradios", label: "Checkboxs & Radios", link: "/forms-checkboxes-radios", parentId: "forms" },
        //         { id: "pickers", label: "Pickers", link: "/forms-pickers", parentId: "forms" },
        //         { id: "inputmasks", label: "Input Masks", link: "/forms-masks", parentId: "forms" },
        //         { id: "advanced", label: "Advanced", link: "/forms-advanced", parentId: "forms" },
        //         { id: "rangeslider", label: "Range Slider", link: "/forms-range-sliders", parentId: "forms" },
        //         { id: "validation", label: "Validation", link: "/forms-validation", parentId: "forms" },
        //         { id: "wizard", label: "Wizard", link: "/forms-wizard", parentId: "forms" },
        //         { id: "editors", label: "Editors", link: "/forms-editors", parentId: "forms" },
        //         { id: "fileuploads", label: "File Uploads", link: "/forms-file-uploads", parentId: "forms" },
        //         { id: "formlayouts", label: "Form Layouts", link: "/forms-layouts", parentId: "forms" },
        //     ],
        // },
        // {
        //     id: "tables",
        //     label: "Tables",
        //     icon: "ri-layout-grid-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsTables(!isTables);
        //         setIscurrentState('Tables');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isTables,
        //     subItems: [
        //         { id: "basictables", label: "Basic Tables", link: "/tables-basic", parentId: "tables" },
        //         { id: "gridjs", label: "Grid Js", link: "/tables-gridjs", parentId: "tables" },
        //         { id: "listjs", label: "List Js", link: "/tables-listjs", parentId: "tables" },
        //     ],
        // },
        // {
        //     id: "charts",
        //     label: "Charts",
        //     icon: "ri-pie-chart-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsCharts(!isCharts);
        //         setIscurrentState('Charts');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isCharts,
        //     subItems: [
        //         {
        //             id: "apexcharts",
        //             label: "Apexcharts",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsApex(!isApex);
        //             },
        //             stateVariables: isApex,
        //             childItems: [
        //                 { id: 1, label: "Line", link: "/charts-apex-line" },
        //                 { id: 2, label: "Area", link: "/charts-apex-area" },
        //                 { id: 3, label: "Column", link: "/charts-apex-column" },
        //                 { id: 4, label: "Bar", link: "/charts-apex-bar" },
        //                 { id: 5, label: "Mixed", link: "/charts-apex-mixed" },
        //                 { id: 6, label: "Timeline", link: "/charts-apex-timeline" },
        //                 { id: 7, label: "Candlstick", link: "/charts-apex-candlestick" },
        //                 { id: 8, label: "Boxplot", link: "/charts-apex-boxplot" },
        //                 { id: 9, label: "Bubble", link: "/charts-apex-bubble" },
        //                 { id: 10, label: "Scatter", link: "/charts-apex-scatter" },
        //                 { id: 11, label: "Heatmap", link: "/charts-apex-heatmap" },
        //                 { id: 12, label: "Treemap", link: "/charts-apex-treemap" },
        //                 { id: 13, label: "Pie", link: "/charts-apex-pie" },
        //                 { id: 14, label: "Radialbar", link: "/charts-apex-radialbar" },
        //                 { id: 15, label: "Radar", link: "/charts-apex-radar" },
        //                 { id: 16, label: "Polar Area", link: "/charts-apex-polar" },
        //             ]
        //         },
        //         { id: "chartjs", label: "Chartjs", link: "/charts-chartjs", parentId: "charts" },
        //         { id: "echarts", label: "Echarts", link: "/charts-echarts", parentId: "charts" },

        //     ],
        // },
        // {
        //     id: "icons",
        //     label: "Icons",
        //     icon: "ri-compasses-2-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsIcons(!isIcons);
        //         setIscurrentState('Icons');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isIcons,
        //     subItems: [
        //         { id: "remix", label: "Remix", link: "/icons-remix", parentId: "icons" },
        //         { id: "boxicons", label: "Boxicons", link: "/icons-boxicons", parentId: "icons" },
        //         { id: "materialdesign", label: "Material Design", link: "/icons-materialdesign", parentId: "icons" },
        //         { id: "lineawesome", label: "Line Awesome", link: "/icons-lineawesome", parentId: "icons" },
        //         { id: "feather", label: "Feather", link: "/icons-feather", parentId: "icons" },
        //     ],
        // },
        // {
        //     id: "maps",
        //     label: "Maps",
        //     icon: "ri-map-pin-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsMaps(!isMaps);
        //         setIscurrentState('Maps');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isMaps,
        //     subItems: [
        //         { id: "google", label: "Google", link: "/maps-google", parentId: "maps" },
        //         { id: "vector", label: "Vector", link: "/maps-vector", parentId: "maps" },
        //         { id: "leaflet", label: "Leaflet", link: "/maps-leaflet", parentId: "maps" },
        //     ],
        // },
        // {
        //     id: "multilevel",
        //     label: "Multi Level",
        //     icon: "ri-share-line",
        //     link: "/#",
        //     click: function (e) {
        //         e.preventDefault();
        //         setIsMultiLevel(!isMultiLevel);
        //         setIscurrentState('MuliLevel');
        //         updateIconSidebar(e);
        //     },
        //     stateVariables: isMultiLevel,
        //     subItems: [
        //         { id: "level1.1", label: "Level 1.1", link: "/#", parentId: "multilevel" },
        //         {
        //             id: "level1.2",
        //             label: "Level 1.2",
        //             link: "/#",
        //             isChildItem: true,
        //             click: function (e) {
        //                 e.preventDefault();
        //                 setIsLevel1(!isLevel1);
        //             },
        //             stateVariables: isLevel1,
        //             childItems: [
        //                 { id: 1, label: "Level 2.1", link: "/#" },
        //                 {
        //                     id: "level2.2",
        //                     label: "Level 2.2",
        //                     link: "/#",
        //                     isChildItem: true,
        //                     click: function (e) {
        //                         e.preventDefault();
        //                         setIsLevel2(!isLevel2);
        //                     },
        //                     stateVariables: isLevel2,
        //                     childItems: [
        //                         { id: 1, label: "Level 3.1", link: "/#" },
        //                         { id: 2, label: "Level 3.2", link: "/#" },
        //                     ]
        //                 },
        //             ]
        //         },
        //     ],
        // },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;