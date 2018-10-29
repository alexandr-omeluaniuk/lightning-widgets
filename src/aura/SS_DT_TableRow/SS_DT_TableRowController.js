/**
 * Created by ss on 31/07/18.
 */
({
    openLink: function (component, event, helper) {
        var row = component.get('v.row');
        var navEvt = $A.get("e.force:navigateToSObject");
        if (navEvt) {
            navEvt.setParams({
                "recordId": row.id
            });
            navEvt.fire();
        } else {
            window.open('/' + recordId, '_blank');
        }
    }
})