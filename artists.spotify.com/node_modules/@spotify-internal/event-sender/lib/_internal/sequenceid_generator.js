import { randomString } from './random_string';
/**
 * Create a generator instance.
 */
export class SequenceIdGenerator {
    constructor() {
        this._sequenceId = randomString.generateBase64(16);
        this._sequenceNumbers = {};
    }
    /**
     * Create a generator instance.
     *
     * @return A sequence_id and sequence_number generator
     * instance.
     */
    static create() {
        return new SequenceIdGenerator();
    }
    /**
     * Reset the state and generate a new sequence_id.
     */
    reset() {
        this._sequenceId = randomString.generateBase64(16);
        this._sequenceNumbers = {};
    }
    /**
     * Get the latest sequence_id.
     *
     * @return The sequence_id used to identify events.
     */
    getSequenceId() {
        return this._sequenceId;
    }
    /**
     * Generate the next sequence_number to identify events.
     *
     * @param eventName - The name of the event to generate a sequence_number
     * for.
     * @return Incremental number starting from 1.
     */
    nextSequenceNumber(eventName) {
        if (!this._sequenceNumbers[eventName]) {
            this._sequenceNumbers[eventName] = 0;
        }
        return ++this._sequenceNumbers[eventName];
    }
    nextSequenceNumberNoIncrement(eventName) {
        if (!this._sequenceNumbers[eventName]) {
            this._sequenceNumbers[eventName] = 0;
        }
        return this._sequenceNumbers[eventName] + 1;
    }
    /**
     * Get all sequence_numbers.
     *
     * @return All sequence numbers.
     */
    getAllSequenceNumberCounters() {
        return this._sequenceNumbers;
    }
}
//# sourceMappingURL=sequenceid_generator.js.map