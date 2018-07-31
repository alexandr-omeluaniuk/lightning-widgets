/**
 * Created by ss on 31/07/18.
 */

public without sharing class SS_DT_ServiceImpl_DataTable implements SS_DT_Service_DataTable {
    // ========================================== CONSTANTS =======================================
    /** Page size for pagination. */
    public static final String P_PAGE_SIZE = 'pageSize';
    /** Current page number. */
    public static final String P_PAGE_NUMBER = 'pageNumber';
    /** SObject type. */
    public static final String P_OBJECT_TYPE = 'sObjectType';
    /** SObject fields. */
    public static final String P_FIELDS = 'fields';
    /** List view customization name. */
    public static final String P_CUSTOMIZATION_NAME = 'customization';
    /** Query params for customization. */
    public static final String P_QUERY_PARAMS = 'queryParams';
    /** Sort by field. */
    public static final String P_SORT_BY_FIELD = 'sortByField';
    /** Sort direction. */
    public static final String P_SORT_BY_DIRECTION = 'sortByDirection';
    // ========================================= PUBLIC ===========================================
    public SS_DT_WR_SearchResponse searchObjects(Map<String, Object> searchParams) {
        Integer pageSize = Integer.valueOf(searchParams.get(P_PAGE_SIZE));
        Integer pageNumber = Integer.valueOf(searchParams.get(P_PAGE_NUMBER));
        Integer offset = (pageNumber - 1) * pageSize;
        String type = (String) searchParams.get(P_OBJECT_TYPE);
        List<Object> fields = (List<Object>) searchParams.get(P_FIELDS);
        String fieldsString = String.join(fields, ',');
        String customizationName = (String) searchParams.get(P_CUSTOMIZATION_NAME);
        Map<String, String> queryParams = (Map<String, String>) searchParams.get(P_QUERY_PARAMS);
        String whereCondition = null;
        String orderByCondition = null;
        if (customizationName != null) {
            Type t = System.Type.forName(customizationName);
            SS_DT_API_SearchCustomization customization =
                    (SS_DT_API_SearchCustomization) t.newInstance();
            whereCondition = customization.whereCondition(queryParams);
            orderByCondition = customization.orderBy();
        }
        String sortByField = (String) searchParams.get(P_SORT_BY_FIELD);
        String sortByDirection = (String) searchParams.get(P_SORT_BY_DIRECTION);
        if (sortByField != null && sortByDirection != null
                && isSupportedOrderBy(type, sortByField)) {
            orderByCondition = 'ORDER BY ' + sortByField + ' ' + sortByDirection;
        }
        String query = 'SELECT ' + (fieldsString.length() > 0 ? fieldsString : 'Id') + ' '
                + 'FROM ' + type + ' '
                + (whereCondition == null ? '' : whereCondition) + ' '
                + (orderByCondition == null ? 'ORDER BY CreatedDate DESC' : orderByCondition) + ' '
                + 'LIMIT ' + pageSize + ' '
                + 'OFFSET ' + offset;
        //System.debug(query);
        SS_DT_WR_SearchResponse response = new SS_DT_WR_SearchResponse();
        response.records = Database.query(query);
        response.total = Database.countQuery('SELECT COUNT() FROM ' + type + ' '
                + (whereCondition == null ? '' : whereCondition));
        return response;
    }
    // ======================================== PRIVATE ===========================================
    /**
     * Check if field is support ORDER BY clause.
     * @param objectType SObject type.
     * @param fieldName field name.
     * @return true if support.
     */
    private Boolean isSupportedOrderBy(String objectType, String fieldName) {
        Map <String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(
                objectType).getDescribe().fields.getMap();
        SObjectField f = fieldMap.get(fieldName);
        DisplayType fieldType = f.getDescribe().getType();
        return fieldType != DisplayType.MULTIPICKLIST
                && fieldType != DisplayType.ENCRYPTEDSTRING
                && fieldType != DisplayType.DATACATEGORYGROUPREFERENCE
                && fieldType != DisplayType.TEXTAREA;
    }
}