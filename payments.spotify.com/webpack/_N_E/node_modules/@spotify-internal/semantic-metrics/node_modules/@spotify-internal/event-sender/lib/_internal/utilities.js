/*
 * * * GENERAL UTILITIES * * *
 */
/*
 * Array utilities
 */
export default class Utilities {
    /**
     * Get numerical index for a given entry in an array
     *
     * @param array - The array to look for the entry inside.
     *
     * @param entry - The entry to look for in the array.
     *
     */
    static pushToArrIfMissing(array, entry) {
        const index = array.indexOf(entry);
        if (index === -1) {
            array.push(entry);
        }
    }
    /**
     * Checks if entry exists in array
     *
     * @param array - The array to look for the entry inside.
     *
     * @param entry - The entry to look for in the array.
     *
     * @return true if is missing, otherwise false.
     */
    static isMissingFromArray(array, entry) {
        const index = array.indexOf(entry);
        return index === -1 ? true : false;
    }
}
//# sourceMappingURL=utilities.js.map