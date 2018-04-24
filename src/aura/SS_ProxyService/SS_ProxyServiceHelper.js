/**
 * Created by ss on 24/04/18.
 */
({
    doRequest: function(component, action, params, successCallback, showLoading) {
        var helper = this;
        if (params) {
            action.setParams(params);
        }
        if (showLoading) {
            component.set('v.isLoading', true);
        }
        action.setCallback(this, function(response) {
            component.set('v.isLoading', false);
            var state = response.getState();
            if (state === "SUCCESS") {
                successCallback(response);
            }
            if (state !== 'SUCCESS'){
                helper.handleError(response);
            }
        });
        $A.enqueueAction(action);
    },
    handleError : function(response) {
        var helper = this;
        if (response.getError() && response.getError().length > 0) {
            var msg = response.getError()[0].message;
            console.log(msg);
        }
        helper.showErrorToast();
    },
    showErrorToast: function () {
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent) {
            toastEvent.setParams({
                "title": "Error!",
                "message": " Something has gone wrong.",
                "type": "error"
            });
            toastEvent.fire();
        } else {
            alert('Something has gone wrong.');
        }
    }
})