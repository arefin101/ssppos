import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    HAS_PERMISSION
  } from "./actionType";


  const INIT_STATE = {

    customerCreatePermission: [],
    supplierCreatePermission: [],
    userCreatePermission: [],
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
    addVariationPermission: [],
    createPurchasePermission: [],
    updateUserOfficialPermission: [],
    updateCustomerPermission: [],
    supplierUpdatePermission: [],
    purchaseIndexPermission: [],
    viewVariationPermission: [],
    addExpensePermission: [],

  };


  const General = (state = INIT_STATE, action) => {
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

                        case "expense.store":
                            return{
                                ...state,
                                addExpensePermission: action.payload.data.value,
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

                        case "expense.store":
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