import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    HAS_PERMISSION
  } from "./actionType";


  const INIT_STATE = {

    customerCreatePermission: [],
    supplierCreatePermission: [],
    userCreatePermission: [],
    updateUserOfficialPermission: [],
    updateCustomerPermission: [],
    supplierUpdatePermission: [],
    roleCreatePermission: [],
    assignRolePermission: [],
    permissionsUpdatePermission: [],

    productIndexPermission: [],
    brandCreatePermission: [],
    modelCreatePermission: [],
    phoneCreatePermission: [],
    chargerCreatePermission: [],

    expenseCategoryCreatePermission: [],
    expenseReferenceCreatePermission:[],
    addExpensePermission: [],
    expenseVerifyPermission: [],

    addVariationPermission: [],
    createPurchasePermission: [],
    purchaseIndexPermission: [],
    viewVariationPermission: [],
    purchaseLockPermission: [],
    purchaseVerifyPermission: [],

    purchaseReturnIndexPermission: [],
    purchaseReturnVerifyPermission: [],
    viewPurchaseReturnVariationPermission: [],

    addPaymentMethodPermission: [],

    saleVerifyPermission: [],
    saleReturnVerifyPermission: [],
    saleReturnPermission: [],

    purchaseReturnPermission: [],


    paymentVerifyPermission: [],
    salePaymentPermission: false,
    customerCreditPermission: false,
    purchasePaymentPermission: false,
    expensePaymentPermission: false,
  };


  const General = (state = INIT_STATE, action) => {
    //console.log('general reducer', state);
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case HAS_PERMISSION:
                    switch(action.payload.data.permission_name){
                        case "user.register-official":
                            return{
                                ...state,
                                userCreatePermission: action.payload.data.value,
                            }
                        case "user.register-customer":
                            return{
                                ...state,
                                customerCreatePermission: action.payload.data.value,
                            }
                        case "user.register-supplier":
                            return{
                                ...state,
                                supplierCreatePermission: action.payload.data.value,
                            }    
                        case "role.store":
                            return{
                                ...state,
                                roleCreatePermission: action.payload.data.value,
                            }
                        case "user.assign-role":
                            return{
                                ...state,
                                assignRolePermission: action.payload.data.value,
                            }
                        case "role.assign-permission":
                            return{
                                ...state,
                                permissionsUpdatePermission: action.payload.data.value,
                            }
                        case "brand.store":
                            return{
                                ...state,
                                brandCreatePermission: action.payload.data.value,
                            }
                        case "product.index":
                            return {
                                ...state,
                                productIndexPermission: action.payload.data.value,
                            }
                        case "product-model.store":
                            return{
                                ...state,
                                modelCreatePermission: action.payload.data.value,
                            }
                        case "product.store-phone":
                            return{
                                ...state,
                                phoneCreatePermission: action.payload.data.value,
                            }
                        case "product.store-charger":
                            return{
                                ...state,
                                chargerCreatePermission: action.payload.data.value,
                            }
                        case "expense-category.store":
                            return{
                                ...state,
                                expenseCategoryCreatePermission: action.payload.data.value,
                            }
                        case "expense-reference.store":
                                return{
                                    ...state,
                                    expenseReferenceCreatePermission: action.payload.data.value,
                                }

                        case "purchase-variation.store":
                            return{
                                ...state,
                                addVariationPermission: action.payload.data.value,
                            }

                        case "purchase.store":
                            return{
                                ...state,
                                createPurchasePermission: action.payload.data.value,
                            }
                        
                        case "user.update-official":
                            return{
                                ...state,
                                updateUserOfficialPermission: action.payload.data.value,
                            }

                        case "user.update-customer":
                            return{
                                ...state,
                                updateCustomerPermission: action.payload.data.value,
                            }

                        case "user.update-supplier":
                            return{
                                ...state,
                                supplierUpdatePermission: action.payload.data.value,
                            }

                        case "purchase.index":
                            return {
                                ...state,
                                purchaseIndexPermission: action.payload.data.value,
                            }

                        case "purchase-variation.index":
                            return{
                                ...state,
                                viewVariationPermission: action.payload.data.value,
                            }

                        case "purchase-return.index":
                            return {
                                ...state,
                                purchaseReturnIndexPermission: action.payload.data.value,
                            }

                        case "purchase-return-variation.index":
                            return{
                                ...state,
                                purchaseReturnVariationPermission: action.payload.data.value,
                            }

                        case "purchase-return.verification":
                            return{
                                ...state,
                                purchaseReturnVerifyPermission: action.payload.data.value,
                            }

                        case "expense.store":
                            return{
                                ...state,
                                addExpensePermission: action.payload.data.value,
                            }

                        case "payment-method.store":
                            return{
                                ...state,
                                addPaymentMethodPermission: action.payload.data.value,
                            }

                        case "purchase.lock":
                            return{
                                ...state,
                                purchaseLockPermission: action.payload.data.value,
                            }

                        case "purchase.verification":
                            return{
                                ...state,
                                purchaseVerifyPermission: action.payload.data.value,
                            }
                        case "purchase-return.store":
                            return{
                                ...state,
                                purchaseReturnPermission: action.payload.data.value,
                            }

                        case "sale.verification":
                            return{
                                ...state,
                                saleVerifyPermission: action.payload.data.value,
                            }

                        case "sale-return.verification":
                            return{
                                ...state,
                                saleReturnVerifyPermission: action.payload.data.value,
                            }

                        case "sale-return.store":
                            return{
                                ...state,
                                saleReturnPermission: action.payload.data.value,
                            }

                        case "expense.verification":
                            return{
                                ...state,
                                expenseVerifyPermission: action.payload.data.value,
                            }

                        case "payment.verification":
                            return{
                                ...state,
                                paymentVerifyPermission: action.payload.data.value,
                            }

                        case "money-transaction.sale-payment":
                            return{
                                ...state,
                                salePaymentPermission: action.payload.data.value,
                            }

                        case "money-transaction.customer-credit":
                            return{
                                ...state,
                                customerCreditPermission: action.payload.data.value,
                            }

                        case "money-transaction.purchase-payment":
                            return{
                                ...state,
                                purchasePaymentPermission: action.payload.data.value,
                            }

                        case "money-transaction.expense-payment":
                            return{
                                ...state,
                                expensePaymentPermission: action.payload.data.value,
                            }

                        default:
                            return { ...state };
                    }
                    
                default:
                    return { ...state };
                }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case HAS_PERMISSION:
                    switch(action.payload.data.permission_name){
                        case "user.register-official":
                            return{
                                ...state,
                            }
                        case "user.register-customer":
                            return{
                                ...state,
                            }
                        case "user.register-supplier":
                            return{
                                ...state,
                            }
                        case "role.store":
                            return{
                                ...state,
                            }
                        case "user.assign-role":
                            return{
                                ...state,
                            }
                        case "role.assign-permission":
                            return{
                                ...state,
                            }
                        case "brand.store":
                            return{
                                ...state,
                            }
                        case "product-model.store":
                            return{
                                ...state,
                            }
                        case "product.store-phone":
                            return{
                                ...state,
                            }
                        case "product.store-charger":
                            return{
                                ...state,
                            }
                        case "expense-category.store":
                            return{
                                ...state,  
                            }
                        case "expense-reference.store":
                            return{
                                ...state,  
                            }
                        case "purchase-variation.store":
                            return{
                                ...state,
                            }

                        case "purchase.store":
                            return{
                                ...state,
                            }
                        
                        case "user.update-official":
                            return{
                                ...state,
                            }
                        case "user.update-customer":
                            return{
                                ...state,
                            }
                        case "user.update-supplier":
                            return{
                                ...state,
                            }

                        case "purchase-variation.index":
                            return{
                                ...state,
                            }

                        case "purchase-return.index":
                            return {
                                ...state,
                            }

                        case "purchase-return-variation.index":
                            return{
                                ...state,
                            }

                        case "purchase-return.verification":
                            return{
                                ...state,
                            }

                        case "expense.store":
                            return{
                                ...state,
                            }
                        
                        case "payment-method.store":
                            return{
                                ...state,
                            }

                        case "purchase.verification":
                            return{
                                ...state,
                            }
                        case "purchase-return.store":
                            return{
                                ...state,
                            }

                        case "sale.verification":
                            return{
                                ...state,
                            }

                        case "sale-return.verfication":
                            return{
                                ...state,
                            }

                        case "expense.verification":
                            return{
                                ...state,
                            }

                        case "payment.verification":
                            return{
                                ...state,
                            }

                        case "sale-return.store":
                            return{
                                ...state,
                            }

                        case "money-transaction.sale-payment":
                            return{
                                ...state,
                            }

                        case "money-transaction.customer-credit":
                            return{
                                ...state,
                            }

                        case "money-transaction.purchase-payment":
                            return{
                                ...state,
                            }

                        case "money-transaction.expense-payment":
                            return{
                                ...state,
                            }
    
                        default:
                            return { ...state };
                    }
                    
                default:
                    return { ...state };
                }
        default:
            return { ...state };
        }
        
       
      
    
  };
  
  export default General;