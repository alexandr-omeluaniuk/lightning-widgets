/**
 * Created by ss on 31/07/18.
 */
({
    init: function(component, event, helper) {
        helper.loadPage(component);
    },
    nextPage: function(component, event, helper) {
        var pageNumber = component.get('v.pageNumber');
        component.set('v.pageNumber', pageNumber + 1);
        helper.loadPage(component);
    },
    previousPage: function(component, event, helper) {
        var pageNumber = component.get('v.pageNumber');
        component.set('v.pageNumber', pageNumber === 1 ? 1 : (pageNumber - 1));
        helper.loadPage(component);
    },
    jumpToFirstPage: function(component, event, helper) {
        component.set('v.pageNumber', 1);
        helper.loadPage(component);
    },
    jumpToLastPage: function(component, event, helper) {
        component.set('v.pageNumber', component.get('v.totalPages'));
        helper.loadPage(component);
    }
})