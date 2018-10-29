/**
 * Created by ss on 25/04/18.
 */
({
    init: function(component, event, helper) {
        var columns = [{
            field: 'Name',
            label: 'Name'
        }, {
            field: 'StageName',
            label: 'Stage'
        }, {
            field: 'CloseDate',
            label: 'Close Date'
        }];
        component.set('v.columnsConfig', columns);
    }
})