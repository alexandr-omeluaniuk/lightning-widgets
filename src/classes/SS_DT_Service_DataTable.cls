/**
 * Created by ss on 31/07/18.
 */

public interface SS_DT_Service_DataTable {
    /**
     * Search objects for data table.
     * @param searchParams search params.
     * @return list view response.
     */
    SS_DT_WR_SearchResponse searchObjects(Map<String, Object> searchParams);
}