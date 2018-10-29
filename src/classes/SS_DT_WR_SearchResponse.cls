/**
 * Created by ss on 31/07/18.
 */

public without sharing class SS_DT_WR_SearchResponse {
    @AuraEnabled
    public List<sObject> records;
    @AuraEnabled
    public Integer total;
}