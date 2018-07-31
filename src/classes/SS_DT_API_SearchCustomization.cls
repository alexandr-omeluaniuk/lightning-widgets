/**
 * Created by ss on 31/07/18.
 */

/**
 * Data table customization API.
 */
public interface SS_DT_API_SearchCustomization {
    /**
     * Where condition for SQOL request.
     * @param whereConditionParams additional params, provided from client-side.
     * @return null if not set or string like 'WHERE ....'.
     */
    String whereCondition(Map<String, String> whereConditionParams);
    /**
     * Order by condition.
     * @return null if not set or string like 'ORDER BY ...'.
     */
    String orderBy();
}