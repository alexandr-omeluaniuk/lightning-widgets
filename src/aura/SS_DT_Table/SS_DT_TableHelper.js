/**
 * Created by ss on 31/07/18.
 */
({
    loadPage: function(component) {
        var helper = this;
        var columns = component.get('v.columns');
        var fields = [];
        var sortByField = null;
        var sortByDirection = null;
        columns.forEach(function(col) {
            fields.push(col.field);
            if (col.sort) {
                sortByField = col.field;
                sortByDirection = col.sort;
            }
        });
        var request = {
            pageNumber: component.get('v.pageNumber'),
            pageSize: component.get('v.pageSize'),
            sObjectType: component.get('v.sObjectType'),
            customization: component.get('v.customizationClassName'),
            sortByField: sortByField,
            sortByDirection: sortByDirection,
            fields: fields
        }
        helper.doRequest(component, "loadData", {
            request: request
        }, function(response) {
            var searchResponse = response.getReturnValue();
            component.set('v.data',
                helper.transformSObjectsToTableData(columns, searchResponse.records));
            component.set('v.totalRecords', searchResponse.total);
            component.set('v.totalPages',
                Math.ceil(searchResponse.total / component.get('v.pageSize')));
        }, true);
    },
    transformSObjectsToTableData: function(columns, rawData) {
        //console.log(rawData);
        var tableData = [];
        for (var i = 0; i < rawData.length; i++) {
            var record = rawData[i];
            var row = {
                content: [],
                id: record.Id
            };
            for (var j = 0; j < columns.length; j++) {
                var col = columns[j];
                var columnFieldName = col.field;
                var fields = columnFieldName.split('.');
                var val = null;
                if (fields.length === 1) {
                    val = record[columnFieldName];
                } else {
                    var innerObj = record;
                    for (var k = 0; k < fields.length; k++) {
                        innerObj = innerObj[fields[k]];
                        if (!innerObj) {
                            break;
                        }
                    }
                    val = innerObj;
                }

                var columnLabel = col.label;
                row.content.push({
                    fieldName: columnFieldName,
                    label: columnLabel,
                    value: val,
                    settings: col
                });
            }
            tableData.push(row);
        }
        //console.log(tableData);
        return tableData;
    }
})