/**
 * Created by ss on 31/07/18.
 */
({
    doRequest: function(component, actionName, params, successCallback, showLoading) {
        var helper = this;
        var action = component.get('c.' + actionName);
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
            } else {
                helper.handleError(response);
            }
        });
        $A.enqueueAction(action);
    },
    // =================================== PRIVATE ================================================
    handleError : function(response) {
        var toastEvent = $A.get("e.force:showToast");
        if (toastEvent) {
            toastEvent.setParams({
                "title": "Error!",
                "message": "Something has gone wrong.",
                "type": "error"
            });
            toastEvent.fire();
        } else {
            alert('Something has gone wrong.');
        }
    }
})