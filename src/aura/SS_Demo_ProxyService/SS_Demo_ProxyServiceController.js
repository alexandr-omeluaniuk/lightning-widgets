/**
 * Created by ss on 24/04/18.
 */
({
    showToastSuccess: function(component, event, helper) {
        component.find('proxy-service').showSuccessToast(component.get('v.message'));
    },
    showToastWarning: function(component, event, helper) {
        component.find('proxy-service').showWarningToast(component.get('v.message'));
    },
    showToastError: function(component, event, helper) {
        component.find('proxy-service').showErrorToast(component.get('v.message'));
    }
})