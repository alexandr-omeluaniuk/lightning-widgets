/**
 * Created by ss on 31/07/18.
 */
({
    handleSelect: function (component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        var columns = component.get('v.columns');
        columns.forEach(function (col) {
            col.sort = null;
        });
        component.set('v.columns', columns);
        var column = component.get('v.column');
        column.sort = selectedMenuItemValue;
        component.set('v.column', column);
        component.getEvent('sortData').fire();
    }
})