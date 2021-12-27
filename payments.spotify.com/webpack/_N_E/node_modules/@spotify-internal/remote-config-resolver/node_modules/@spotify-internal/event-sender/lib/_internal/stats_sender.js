import { createEventSenderStats2NonAuth, } from '@spotify-internal/event-definitions/es5/events/createEventSenderStats2NonAuth';
import Utilities from './utilities';
export default class StatsSender {
    /**
     * Collect data for EventSenderStats
  
     * @param essData - The input intermediary object for stats collection
     *
     * @param events - The input EventGroup to collect data from
     */
    _addEventsToEventSenderStatsData(essData, events) {
        Object.keys(events).map((type) => {
            for (let i = 0; i < events[type].length; i++) {
                const event = events[type][i];
                if (event.sequence_number <
                    essData[event.sequence_id][event.event_name].sequence_number_min) {
                    essData[event.sequence_id][event.event_name].sequence_number_min =
                        event.sequence_number;
                }
                essData[event.sequence_id][event.event_name].storage_size++;
            }
        });
    }
    /**
     * Initialises the data for EventSenderStats
     *
     * @param essData - The input intermediary object for stats collection
     *
     * @param sequenceNumberCounters - Object containing counters for all
     * event_name-sequence_id pairs already entered into stats
     *
     * @param sequenceId - The current sequenceId
     */
    _initializeESSEventData(essData, sequenceNumberCounters, sequenceId) {
        if (!Object.keys(essData).includes(sequenceId)) {
            essData[sequenceId] = {};
        }
        for (const [key, value] of Object.entries(sequenceNumberCounters)) {
            essData[sequenceId][key] = {
                sequence_number_min: value + 1,
                sequence_number_next: value + 1,
                storage_size: 0,
            };
        }
    }
    /**
     * Formats the collected data into EventSenderStats2UnauthEventData
  
     * @param essData - The input intermediary object for stats collection to be formatted
     *
     * @return EventSenderStats2NonAuthEventData - the final format of the statistics data for consumption in backend
     */
    _formatESS2UnauthEventData(essData) {
        const formattedData = {
            sequence_ids: [],
            event_names: [],
            loss_stats_num_entries_per_sequence_id: [],
            loss_stats_event_name_index: [],
            loss_stats_storage_sizes: [],
            loss_stats_sequence_number_mins: [],
            loss_stats_sequence_number_nexts: [],
        };
        Object.entries(essData).map(([sequenceId, eventBlock]) => {
            if (Utilities.isMissingFromArray(formattedData.sequence_ids, sequenceId)) {
                formattedData.sequence_ids.push(sequenceId);
                formattedData.loss_stats_num_entries_per_sequence_id.push(Object.keys(eventBlock).length);
            }
            else {
                const sequenceIdIndex = formattedData.sequence_ids.indexOf(sequenceId);
                formattedData.loss_stats_num_entries_per_sequence_id[sequenceIdIndex] += Object.keys(eventBlock).length;
            }
            Object.entries(eventBlock).map(([eventName, eventData]) => {
                Utilities.pushToArrIfMissing(formattedData.event_names, eventName);
                const eventNameIndex = formattedData.event_names.indexOf(eventName);
                formattedData.loss_stats_event_name_index.push(eventNameIndex);
                const eventDataKeys = Object.keys(eventData);
                for (let i = 0; i < eventDataKeys.length; i++) {
                    const statsEntryKey = `loss_stats_${eventDataKeys[i]}s`;
                    const statsEntry = formattedData[statsEntryKey];
                    statsEntry.push(eventData[eventDataKeys[i]]);
                }
            });
        });
        return formattedData;
    }
    /**
     * Creates an ESS2NonAuth event from the unsent events in this._events.
  
     * @param events - The unsent events from persistance / memory storage
     *
     * @param sequenceNumberCounters - The sequence number counters from getAllSequenceNumberCounters() in sequenceIdGenerator
     *
     * @param sequenceId - The current sequenceId from the sequenceIdGenerator
     *
     * @return EventSenderStats2NonAuthEvent, the 'message' content, to be wrapped and batched
     */
    createESSEvent(events, sequenceNumberCounters, sequenceId) {
        const essData = {};
        this._initializeESSEventData(essData, sequenceNumberCounters, sequenceId);
        this._addEventsToEventSenderStatsData(essData, events);
        const essEvent = createEventSenderStats2NonAuth(this._formatESS2UnauthEventData(essData));
        return essEvent;
    }
}
//# sourceMappingURL=stats_sender.js.map