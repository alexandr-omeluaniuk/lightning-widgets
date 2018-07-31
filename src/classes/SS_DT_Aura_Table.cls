/**
 * Created by ss on 31/07/18.
 */

/**
 * Aura controller
 * @see SS_DT_Table ligtning component.
 */
public without sharing class SS_DT_Aura_Table {
    @AuraEnabled
    public static SS_DT_WR_SearchResponse loadData(Map<String, Object> request) {
        SS_DT_Service_DataTable service = new SS_DT_ServiceImpl_DataTable();
        return service.searchObjects(request);
    }
}